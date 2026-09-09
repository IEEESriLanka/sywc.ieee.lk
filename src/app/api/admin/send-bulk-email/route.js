import { NextResponse } from "next/server";
import { getEmailTransporter } from "@/lib/emailConfig";
import { parseExcelBuffer } from "@/lib/excelParser";
import { sendBulkEmails, validateRecipient } from "@/lib/bulkSender";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // Allow up to 5 minutes for bulk batches of 250+ emails

/**
 * Hidden server-side endpoint for bulk personalized email sending.
 * Supports:
 * 1. multipart/form-data (Excel .xlsx, .xls, .csv upload with optional fields)
 * 2. application/json (JSON payload with recipients array and template options)
 */
export async function POST(request) {
  // CORS Headers
  const headers = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };

  try {
    const contentType = request.headers.get("content-type") || "";
    let recipients = [];
    let subject = "You’re Invited – Welcome to IEEE SL SYW Congress 2026!";
    let templateHtml = null;
    let content = "";
    let ctaUrl = "";
    let ctaText = "";
    let from = "";

    // 2. Parse payload based on Content-Type
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");

      if (formData.has("subject")) subject = formData.get("subject");
      if (formData.has("template")) templateHtml = formData.get("template");
      if (formData.has("content")) content = formData.get("content");
      if (formData.has("message")) content = formData.get("message");
      if (formData.has("ctaUrl")) ctaUrl = formData.get("ctaUrl");
      if (formData.has("ctaText")) ctaText = formData.get("ctaText");
      if (formData.has("from")) from = formData.get("from");

      if (!file || typeof file === "string") {
        return NextResponse.json(
          {
            success: false,
            message: "Missing Excel/CSV file in multipart/form-data request. Provide 'file' field.",
          },
          { status: 400, headers }
        );
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        recipients = parseExcelBuffer(buffer);
      } catch (parseErr) {
        return NextResponse.json(
          {
            success: false,
            message: `Failed to parse Excel/CSV file: ${parseErr.message}`,
          },
          { status: 400, headers }
        );
      }
    } else {
      // JSON Payload
      let body;
      try {
        body = await request.json();
      } catch {
        return NextResponse.json(
          {
            success: false,
            message: "Malformed JSON body.",
          },
          { status: 400, headers }
        );
      }

      if (body.subject) subject = body.subject;
      if (body.template) templateHtml = body.template;
      if (body.content) content = body.content;
      if (body.message) content = body.message;
      if (body.ctaUrl) ctaUrl = body.ctaUrl;
      if (body.ctaText) ctaText = body.ctaText;
      if (body.from) from = body.from;

      if (!body.recipients || !Array.isArray(body.recipients)) {
        return NextResponse.json(
          {
            success: false,
            message: "Request body must contain a 'recipients' array with [{ name, email }].",
          },
          { status: 400, headers }
        );
      }

      recipients = body.recipients;
    }

    // 3. Validate Recipient Count
    if (recipients.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid recipient entries found in the request.",
        },
        { status: 400, headers }
      );
    }

    // 4. Validate all recipients
    const validationErrors = [];
    const validRecipients = [];

    recipients.forEach((rec, idx) => {
      const validation = validateRecipient(rec);
      if (!validation.isValid) {
        validationErrors.push({
          index: idx,
          name: rec.name || "Missing",
          email: rec.email || "Missing",
          errors: validation.errors,
        });
      } else {
        validRecipients.push(validation.sanitized);
      }
    });

    if (validRecipients.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "All recipients failed initial validation.",
          validationErrors,
        },
        { status: 400, headers }
      );
    }

    // 5. Initialize Server-Side Transporter
    let transporter;
    try {
      transporter = getEmailTransporter();
    } catch (transporterErr) {
      return NextResponse.json(
        {
          success: false,
          message: `Server email configuration error: ${transporterErr.message}`,
        },
        { status: 500, headers }
      );
    }

    // 6. Bulk Send Individually
    const sendResult = await sendBulkEmails({
      transporter,
      recipients: validRecipients,
      subject,
      templateHtml,
      content,
      ctaUrl,
      ctaText,
      from,
    });

    // Merge any initially invalid recipients into results
    if (validationErrors.length > 0) {
      validationErrors.forEach((invalid) => {
        sendResult.results.push({
          name: invalid.name,
          email: invalid.email,
          status: "failed",
          error: `Pre-send validation error: ${invalid.errors.join(", ")}`,
        });
        sendResult.failed++;
        sendResult.total++;
      });
      sendResult.success = false;
    }

    return NextResponse.json(
      {
        message: `Processed ${sendResult.total} recipients (${sendResult.sent} sent, ${sendResult.failed} failed).`,
        ...sendResult,
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Bulk email error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error occurred while processing bulk email.",
        error: error.message,
      },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });
}
