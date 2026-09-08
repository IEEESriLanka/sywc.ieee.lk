/**
 * Default IEEE SLSYWC 2026 Branded HTML Email Template
 * Adheres to the website's dark aesthetic, gold typography highlights,
 * and includes the official Cloudinary logo URL.
 */

export const LOGO_URL =
  "https://res.cloudinary.com/q1juijf8/image/upload/v1788852242/main-logo_weonid.svg";

export const DEFAULT_EMAIL_CONTENT = `<p style="margin-bottom: 16px; font-size: 15px; line-height: 1.7; color: #e3e3db;">
  We are pleased to inform you that you have been selected as an official delegate for the <strong style="color: #fcd34d;">15th IEEE Sri Lanka Section Students | Young Professionals | Women in Engineering Congress (SLSYWC &apos;26)</strong>.
</p>

<p style="margin-bottom: 20px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
  The Congress is scheduled to take place from <strong style="color: #fcd34d;">26th to 28th September 2026</strong> at <strong style="color: #fcd34d;">Club Palm Bay, Marawila, Sri Lanka</strong>. Gathering distinguished student leaders, young professionals, and industry experts across the nation, this event offers three days of technical enrichment, leadership development, and strategic networking.
</p>

<div style="background: #060b14; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin: 24px 0;">
  <h3 style="margin: 0 0 14px 0; font-size: 15px; color: #fef9c3; font-weight: 700; border-bottom: 1px solid #1e293b; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
    Congress Program Schedule
  </h3>
  
  <div style="margin-bottom: 14px;">
    <strong style="color: #fcd34d; font-size: 14px;">Day 1 (26th September &bull; 12:00 PM onwards):</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      Official Inauguration and the Handewa cultural exchange session. Please bring traditional attire for the evening cultural proceedings.
    </p>
  </div>

  <div style="margin-bottom: 14px;">
    <strong style="color: #fcd34d; font-size: 14px;">Day 2 (27th September):</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      IEEE Region 10 Career and Leadership Program (CLAP) followed by the IEEE Sri Lanka Section Annual Awards Ceremony. Please bring formal attire for this gala night.
    </p>
  </div>

  <div>
    <strong style="color: #fcd34d; font-size: 14px;">Day 3 (28th September):</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      Technical tracks, collaborative symposiums, and the Official Valedictory Ceremony.
    </p>
  </div>
</div>

<p style="margin-bottom: 16px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">
  For comprehensive logistics, accommodation details, and required documentation, please consult the Official Delegate Handbook linked below.
</p>

<p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin-bottom: 24px;">
  We look forward to welcoming you to Club Palm Bay, Marawila, for an exceptional Congress experience.
</p>`;

export const DEFAULT_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{subject}}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #030710; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .content-padding { padding: 24px 16px !important; }
      .header-padding { padding: 32px 16px 20px 16px !important; }
      .hero-title { font-size: 24px !important; line-height: 32px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030710; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Preview Text -->
  <div style="display: none; font-size: 1px; color: #030710; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    {{previewText}}
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #030710; min-height: 100%;">
    <tr>
      <td align="center" style="padding: 40px 15px;">
        <!-- Container Card -->
        <table role="presentation" class="email-container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background: linear-gradient(180deg, #101828 0%, #0a0f1d 100%); border-radius: 16px; border: 1px solid #1e293b; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); overflow: hidden;">
          
          <!-- Header / Logo -->
          <tr>
            <td align="center" class="header-padding" style="padding: 40px 30px 24px 30px; background: radial-gradient(circle at center top, rgba(251, 191, 36, 0.08) 0%, transparent 70%);">
              <a href="https://slsywc.ieee.lk" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="${LOGO_URL}" alt="IEEE SLSYWC 2026 Logo" width="180" style="width: 180px; max-width: 100%; display: block; height: auto;" />
              </a>
              <div style="height: 2px; width: 60px; background: linear-gradient(90deg, #fef9c3, #f59e0b); margin: 24px auto 0 auto; border-radius: 2px;"></div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content-padding" style="padding: 20px 40px 35px 40px;">
              
              <!-- Greeting with Personalized Name -->
              <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 26px; line-height: 34px; font-weight: 700; color: #fef9c3; text-align: left;">
                Dear <span style="color: #fcd34d;">{{name}}</span>,
              </h1>

              <!-- Message Body -->
              <div style="font-size: 15px; line-height: 26px; color: #e3e3db; text-align: left;">
                {{content}}
              </div>

              <!-- Action Button (Optional) -->
              {{#if ctaUrl}}
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px; margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="{{ctaUrl}}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #fcd34d 0%, #d97706 100%); color: #030710; font-weight: 700; font-size: 15px; text-decoration: none; padding: 14px 36px; border-radius: 30px; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);">
                      {{ctaText}}
                    </a>
                  </td>
                </tr>
              </table>
              {{/if}}

              <!-- Divider -->
              <div style="height: 1px; background-color: #1e293b; margin: 36px 0 24px 0;"></div>

              <!-- Sign-off -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-size: 14px; line-height: 22px; color: #94a3b8;">
                    <p style="margin: 0; color: #e3e3db; font-weight: 600;">Best regards,</p>
                    <p style="margin: 4px 0 0 0; color: #cbd5e1; font-weight: 500;">Organizing Committee</p>
                    <p style="margin: 2px 0 0 0; color: #f59e0b; font-size: 13px; font-weight: 600;">IEEE SLSYWC 2026</p>
                    <p style="margin: 2px 0 0 0; color: #64748b; font-size: 12px;">IEEE Sri Lanka Section</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #060b14; border-top: 1px solid #161f30; text-align: center;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #64748b;">
                You received this email because you are registered or affiliated with IEEE SLSYWC 2026.
              </p>
              <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 18px; color: #475569;">
                Copyright &copy; 2026 IEEE SLSYWC. All rights reserved. &bull; Club Palm Bay, Marawila, Sri Lanka
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/**
 * Replace placeholders like {{name}}, {{subject}}, {{key}} in template string.
 * Supports basic conditional block {{#if variable}}...{{/if}}.
 */
export function renderEmailTemplate(templateStr, data = {}) {
  let rendered = templateStr || DEFAULT_EMAIL_TEMPLATE;

  // Handle conditional blocks: {{#if key}}...{{/if}}
  rendered = rendered.replace(
    /\{\{#if\s+([a-zA-Z0-9_]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (match, key, blockContent) => {
      return data[key] ? blockContent : "";
    }
  );

  // Substitute variables: {{key}}
  rendered = rendered.replace(
    /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g,
    (match, key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        return data[key] !== undefined && data[key] !== null
          ? String(data[key])
          : "";
      }
      return match;
    }
  );

  return rendered;
}
