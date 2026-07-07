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
  const registrationType = data.registrationType || "event";
  const isEventFlow = registrationType !== "merch";
  const isMerchFlow = registrationType !== "event";

  const requiredFields = [
    "nameWithInitials",
    "firstName",
    "lastName",
    "email",
    "contactNumber",
    "privacy",
    "consent",
  ];

  requiredFields.forEach((field) => {
    if (
      !data[field] ||
      (typeof data[field] === "string" && data[field].trim() === "")
    ) {
      errors[field] = `${field} is required`;
    }
  });

  if (isEventFlow) {
    if (!data.isSriLankanCitizen) {
      errors.isSriLankanCitizen = "isSriLankanCitizen is required";
    }

    if (data.isSriLankanCitizen === "Yes") {
      if (!data.nic || data.nic.trim() === "") {
        errors.nic = "nic is required";
      }
      if (!data.gender || data.gender.trim() === "") {
        errors.gender = "gender is required";
      }
      if (data.selectedEntity === "Student Branch Representatives") {
        if (!data.branch || data.branch.trim() === "") {
          errors.branch = "branch is required";
        }
        if (data.branch === "23. Other" && (!data.otherAffiliation || data.otherAffiliation.trim() === "")) {
          errors.otherAffiliation = "otherAffiliation is required";
        }
      }
      if (!data.selectedEntity || data.selectedEntity.trim() === "") {
        errors.selectedEntity = "selectedEntity is required";
      }
      if (!data.tshirtSize || data.tshirtSize.trim() === "") {
        errors.tshirtSize = "tshirtSize is required";
      }
    }

    if (data.isSriLankanCitizen === "No") {
      if (!data.region || data.region.trim() === "") {
        errors.region = "region is required";
      }
      if (!data.organizationalUnit || data.organizationalUnit.trim() === "") {
        errors.organizationalUnit = "organizationalUnit is required";
      }
      if (!data.gender || data.gender.trim() === "") {
        errors.gender = "gender is required";
      }
      if (!data.tshirtSize || data.tshirtSize.trim() === "") {
        errors.tshirtSize = "tshirtSize is required";
      }
    }
  }

  const merchItems = data.merchItems && typeof data.merchItems === "object" ? data.merchItems : {};
  const merchQuantities = Object.values(merchItems).map((quantity) => Number(quantity || 0));
  const hasMerchSelection = merchQuantities.some((quantity) => quantity > 0);

  if (registrationType === "merch" && !hasMerchSelection) {
    errors.merchItems = "At least one merch item must be selected";
  }

  if (
    (Number(merchItems.tshirt || 0) > 0 || Number(merchItems.merchPackOversized || 0) > 0) &&
    (!data.merchPackSize || data.merchPackSize.trim() === "")
  ) {
    errors.merchPackSize = "merchPackSize is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.paymentSlipUrl || data.paymentSlipUrl.trim() === "") {
    errors.paymentSlipUrl = "paymentSlipUrl is required";
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
    const merchItems =
      formData.merchItems && typeof formData.merchItems === "object"
        ? formData.merchItems
        : {};
    const merchSummary = Object.entries(merchItems)
      .filter(([, quantity]) => Number(quantity || 0) > 0)
      .map(([key, quantity]) => `${key}:${quantity}`)
      .join(" | ");
    const merchTotalQuantity = Object.values(merchItems).reduce(
      (sum, quantity) => sum + Number(quantity || 0),
      0
    );
    const currency = formData.currency || "LKR";
    const merchPriceMap = currency === "USD"
      ? {
          merchPackOversized: 15,
          tshirt: 10,
          wristband: 2,
          bucketHat: 5,
        }
      : {
          merchPackOversized: 3500,
          tshirt: 2000,
          wristband: 250,
          bucketHat: 1200,
        };
    const merchTotalAmountVal = Object.entries(merchItems).reduce(
      (sum, [key, quantity]) =>
        sum + Number(quantity || 0) * Number(merchPriceMap[key] || 0),
      0
    );
    const merchTotalAmountFormatted = `${merchTotalAmountVal} ${currency}`;

    // Build different row structures based on registration type to separate sheets data logically
    const rowData = formData.registrationType === "merch" 
      ? [
          new Date().toISOString(),
          formData.registrationType || "merch",
          formData.nameWithInitials || "",
          formData.firstName || "",
          formData.lastName || "",
          formData.email || "",
          formData.contactNumber || "",
          formData.merchPackSize || "",
          Number(merchItems.merchPackOversized || 0),
          Number(merchItems.tshirt || 0),
          Number(merchItems.wristband || 0),
          Number(merchItems.bucketHat || 0),
          merchTotalQuantity,
          merchTotalAmountFormatted,
          merchSummary,
          formData.paymentSlipUrl || "",
          formData.privacy || "",
          formData.consent || "",
        ]
      : [
          new Date().toISOString(),
          formData.registrationType || "event",
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
          formData.selectedEntity || "",
          formData.membershipNo || "",
          formData.membershipCategory || "",
          Array.isArray(formData.excoEntities)
            ? formData.excoEntities.join(", ")
            : "",
          formData.tshirtSize || "",
          formData.paymentSlipUrl || "",
          formData.privacy || "",
          formData.consent || "",
        ];

    console.log("Attempting to append data to Google Sheets...");

    // Determine target sheet tab dynamically
    const targetRange = formData.registrationType === "merch" ? "Merchandise!A1" : "Sheet1!A1";
    console.log(`Routing data to sheet range: ${targetRange}`);

    const sheetTabName = targetRange.split("!")[0];

    // Automatically verify that the sheet tab exists, and create it if missing
    try {
      const spreadsheetInfo = await sheets.spreadsheets.get({ spreadsheetId });
      const sheetExists = spreadsheetInfo.data.sheets.some(
        (s) => s.properties.title === sheetTabName
      );

      if (!sheetExists) {
        console.log(`Sheet tab "${sheetTabName}" does not exist. Creating it...`);
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          resource: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: sheetTabName,
                  },
                },
              },
            ],
          },
        });
        console.log(`Sheet tab "${sheetTabName}" successfully created.`);
      }
    } catch (sheetCheckError) {
      console.error("Error verifying/creating target sheet tab:", sheetCheckError);
      // Proceed anyway, let append attempt fail normally if there's a different issue
    }

    // Append data to Google Sheets
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: targetRange,
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      resource: { values: [rowData] },
    });

    console.log("Data successfully appended to Google Sheets:", result.data);

    // Log successful submission
    console.log("Form submitted successfully:", {
      email: formData.email,
      timestamp: new Date().toISOString(),
    });

    const isActuallyMerch = merchTotalQuantity > 0;
    return NextResponse.json(
      {
        message:
          formData.registrationType === "merch"
            ? "Merch order successful"
            : (formData.registrationType === "both" && isActuallyMerch)
            ? "Registration and merch order successful"
            : "Registration successful",
        success: true,
      },
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
