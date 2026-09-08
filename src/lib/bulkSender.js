import { renderEmailTemplate, DEFAULT_EMAIL_TEMPLATE } from "./emailTemplate.js";

/**
 * Validates a single recipient.
 */
export function validateRecipient(recipient) {
  const errors = [];
  const name = recipient.name ? String(recipient.name).trim() : "";
  const email = recipient.email ? String(recipient.email).trim() : "";

  if (!name) {
    errors.push("Name is required");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email address format");
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      ...recipient,
      name,
      email,
    },
  };
}

/**
 * Strips HTML tags to generate a clean plain-text fallback.
 */
function htmlToPlainText(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Dispatches bulk emails individually in controlled concurrent batches.
 *
 * @param {Object} options
 * @param {import("nodemailer").Transporter} options.transporter - Nodemailer transporter
 * @param {Array<Object>} options.recipients - List of recipient objects
 * @param {string} options.subject - Email subject line
 * @param {string} [options.templateHtml] - Optional custom HTML template
 * @param {string} [options.content] - Custom content/message to inject
 * @param {string} [options.ctaUrl] - Optional CTA Link
 * @param {string} [options.ctaText] - Optional CTA Button text
 * @param {string} [options.from] - Sender address
 * @param {number} [options.concurrency=5] - Number of parallel sends
 * @param {number} [options.delayBetweenBatchesMs=250] - Delay between chunk dispatches
 */
export async function sendBulkEmails({
  transporter,
  recipients,
  subject,
  templateHtml,
  content,
  ctaUrl,
  ctaText,
  from,
  concurrency = 8,
  delayBetweenBatchesMs = 100,
}) {
  const senderAddress =
    from ||
    process.env.EMAIL_FROM ||
    `"IEEE SLSYWC 2026" <${process.env.SMTP_USER}>`;

  const results = [];
  let sentCount = 0;
  let failedCount = 0;

  // If content or templateHtml is a full standalone HTML document, use it directly
  let effectiveTemplate = templateHtml || DEFAULT_EMAIL_TEMPLATE;
  if (content && (content.trim().startsWith("<!DOCTYPE") || content.trim().startsWith("<html"))) {
    effectiveTemplate = content;
  }

  // Process recipients in chunks to respect concurrency and rate limits
  for (let i = 0; i < recipients.length; i += concurrency) {
    const chunk = recipients.slice(i, i + concurrency);

    const chunkPromises = chunk.map(async (recipient) => {
      const { isValid, errors, sanitized } = validateRecipient(recipient);

      if (!isValid) {
        return {
          name: recipient.name || "Unknown",
          email: recipient.email || "Unknown",
          status: "failed",
          error: `Validation error: ${errors.join(", ")}`,
        };
      }

      // Render personalized email HTML
      const templateData = {
        ...sanitized,
        subject: subject || "Update from IEEE SLSYWC 2026",
        content: content || sanitized.content || sanitized.message || "<p>Thank you for being a part of IEEE SLSYWC 2026.</p>",
        ctaUrl: ctaUrl || sanitized.ctaUrl || "",
        ctaText: ctaText || sanitized.ctaText || "Learn More",
        previewText: (content || sanitized.content || "").replace(/<[^>]+>/g, " ").substring(0, 120),
      };

      const personalizedHtml = renderEmailTemplate(effectiveTemplate, templateData);
      const textFallback = htmlToPlainText(personalizedHtml);

      try {
        const info = await transporter.sendMail({
          from: senderAddress,
          to: `"${sanitized.name.replace(/"/g, "")}" <${sanitized.email}>`,
          subject: renderEmailTemplate(subject || "Update from IEEE SLSYWC 2026", sanitized),
          text: textFallback,
          html: personalizedHtml,
        });

        return {
          name: sanitized.name,
          email: sanitized.email,
          status: "sent",
          messageId: info.messageId,
        };
      } catch (error) {
        console.error(`Failed to send email to ${sanitized.email}:`, error);
        return {
          name: sanitized.name,
          email: sanitized.email,
          status: "failed",
          error: error.message || "Failed to deliver email",
        };
      }
    });

    const chunkResults = await Promise.all(chunkPromises);

    for (const res of chunkResults) {
      if (res.status === "sent") {
        sentCount++;
      } else {
        failedCount++;
      }
      results.push(res);
    }

    // Delay briefly between chunks if more chunks remain
    if (i + concurrency < recipients.length && delayBetweenBatchesMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayBetweenBatchesMs));
    }
  }

  return {
    total: recipients.length,
    sent: sentCount,
    failed: failedCount,
    success: failedCount === 0 && sentCount > 0,
    results,
  };
}
