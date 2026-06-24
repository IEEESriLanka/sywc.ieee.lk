// app/api/register/route.js
import { NextResponse } from "next/server";
import { google } from "googleapis";

// Initialize Google Sheets API with better error handling
const initializeGoogleSheets = async () => {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      throw new Error(
        "GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set"
      );
    }
    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      throw new Error("GOOGLE_SPREADSHEET_ID environment variable is not set");
    }

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error("Error initializing Google Sheets:", error);
    throw error;
  }
};

// Validate form data
const validateFormData = (data) => {
  const errors = {};
  const requiredFields = [
    "nameWithInitials",
    "firstName",
    "lastName",
    "email",
    "contactNumber",
    "gender",
    "tshirtSize",
    "privacy",
    "consent",
  ];
  if (data.isSriLankanCitizen === "Yes") {
    requiredFields.push("nic", "branch");
  } else {
    requiredFields.push("region", "organizationalUnit");
  }
  requiredFields.forEach((field) => {
    if (
      !data[field] ||
      (typeof data[field] === "string" && data[field].trim() === "")
    ) {
      errors[field] = `${field} is required`;
    }
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export async function POST(request) {
  // Handle CORS for App Router
  const headers = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  };

  // Handle preflight OPTIONS request
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers });
  }

  try {
    console.log("API route called with method:", request.method);
    const formData = await request.json();
    console.log("Request body:", formData);

    if (!formData) {
      return NextResponse.json(
        { message: "Request body is required", success: false },
        { status: 400, headers }
      );
    }

    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      console.log("Validation failed:", validation.errors);
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.errors,
          success: false,
        },
        { status: 400, headers }
      );
    }

    console.log("Validation passed, initializing Google Sheets...");

    // Initialize Google Sheets
    const sheets = await initializeGoogleSheets();
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    console.log("Google Sheets initialized, preparing data...");

    // Prepare data for Google Sheets
    const rowData = [
      new Date().toISOString(),
      formData.isSriLankanCitizen || "",
      formData.region || "",
      formData.organizationalUnit || "",
      formData.nameWithInitials || "",
      formData.firstName || "",
      formData.lastName || "",
      formData.email || "",
      formData.contactNumber || "",
      formData.nic || "",
      formData.gender || "",
      formData.branch || "",
      formData.otherAffiliation || "",
      formData.partOfExCo || "",
      formData.membershipNo || "",
      formData.membershipCategory || "",
      Array.isArray(formData.excoEntities)
        ? formData.excoEntities.join(", ")
        : "",
      formData.tshirtSize || "",
      formData.privacy || "",
      formData.consent || "",
    ];

    console.log("Attempting to append data to Google Sheets...");

    // Append data to Google Sheets
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:T",
      valueInputOption: "RAW",
      resource: { values: [rowData] },
    });

    console.log("Data successfully appended to Google Sheets:", result.data);

    // Log successful submission
    console.log("Form submitted successfully:", {
      email: formData.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Registration successful", success: true },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("API error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    if (error.message.includes("GOOGLE_SERVICE_ACCOUNT_KEY")) {
      return NextResponse.json(
        {
          message: "Server configuration error: Missing service account key",
          success: false,
        },
        { status: 500, headers }
      );
    }
    if (error.message.includes("GOOGLE_SPREADSHEET_ID")) {
      return NextResponse.json(
        {
          message: "Server configuration error: Missing spreadsheet ID",
          success: false,
        },
        { status: 500, headers }
      );
    }
    if (error.message.includes("Permission denied")) {
      return NextResponse.json(
        {
          message:
            "Server configuration error: Google Sheets permission denied",
          success: false,
        },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error. Please try again.",
        success: false,
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500, headers }
    );
  }
}
