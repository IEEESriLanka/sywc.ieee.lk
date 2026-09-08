import nodemailer from "nodemailer";

/**
 * Creates and returns a Nodemailer transporter configured via environment variables.
 * Keeps credentials entirely on the server-side.
 */
export function getEmailTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER?.trim();
  // Strip spaces and quotes commonly present in Google App Passwords
  const rawPass = process.env.SMTP_PASS?.trim() || "";
  const pass = (host?.includes("gmail") || user?.includes("gmail"))
    ? rawPass.replace(/\s+/g, "").replace(/['"]/g, "")
    : rawPass.replace(/^['"]|['"]$/g, "");

  const service = process.env.SMTP_SERVICE?.trim(); // e.g. 'gmail' if host is not provided

  if (!user || !pass) {
    throw new Error(
      "SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables."
    );
  }

  const isGmail = (service && service.toLowerCase() === "gmail") ||
    (host && host.includes("gmail")) ||
    (user && user.includes("gmail"));

  const transportConfig = isGmail
    ? {
        service: "gmail",
        auth: { user, pass },
        pool: true,
        maxConnections: 8,
        maxMessages: 500,
        rateDelta: 1000,
        rateLimit: 14,
      }
    : {
        host: host || "smtp.gmail.com",
        port,
        secure,
        auth: { user, pass },
        pool: true,
        maxConnections: 8,
        maxMessages: 500,
        rateDelta: 1000,
        rateLimit: 14,
        tls: {
          rejectUnauthorized: process.env.NODE_ENV === "production",
        },
      };

  return nodemailer.createTransport(transportConfig);
}

/**
 * Validates whether the incoming request has authorized access using the secret key.
 */
export function validateEmailAuth(request) {
  const secret = process.env.EMAIL_API_SECRET || process.env.ADMIN_API_KEY;
  if (!secret) {
    // If no secret configured in development, warn in server logs
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[WARN] EMAIL_API_SECRET is not set in environment. Access allowed only in non-production."
      );
      return true;
    }
    return false;
  }

  const authHeader = request.headers.get("authorization");
  const apiKeyHeader = request.headers.get("x-api-key");

  if (apiKeyHeader && apiKeyHeader === secret) {
    return true;
  }

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    return token === secret;
  }

  return false;
}
