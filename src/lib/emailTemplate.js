/**
 * Default IEEE SLSYWC 2026 Branded HTML Email Template
 * Adheres to the website's dark aesthetic, gold typography highlights,
 * and includes the official Cloudinary logo URL.
 */

export const LOGO_URL =
  "https://res.cloudinary.com/q1juijf8/image/upload/v1788975345/Mail_cover_znbhyc.webp";

export const DEFAULT_EMAIL_CONTENT = `<p style="margin-bottom: 16px; font-size: 15px; line-height: 1.7; color: #e3e3db;">
  We are thrilled to inform you that you have been selected as a delegate for the <strong style="color: #fcd34d;">15th IEEE Sri Lanka Section Students | Young Professionals | Women in Engineering Congress (IEEE SLSYWC &apos;26)</strong>!
</p>

<p style="margin-bottom: 20px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
  This year’s Congress will be held from <strong style="color: #fcd34d;">18th to 20th September 2026</strong> at <strong style="color: #fcd34d;">Club Palm Bay Hotel, Marawila</strong>. With over 250 participants expected from across Sri Lanka and beyond, this is your opportunity to be part of one of IEEE Sri Lanka Section’s major gatherings with three days of learning, networking, innovation, collaboration, and unforgettable experiences.
</p>

<div style="background: #060b14; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin: 24px 0;">
  <h3 style="margin: 0 0 14px 0; font-size: 15px; color: #fef9c3; font-weight: 700; border-bottom: 1px solid #1e293b; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
    As Your Journey Begins…
  </h3>
  
  <div style="margin-bottom: 14px;">
    <strong style="color: #fcd34d; font-size: 14px;">Day 1 &ndash; 18th September:</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      Congress kick-off, engaging sessions, networking opportunities, and exciting activities to begin your Congress journey.
    </p>
  </div>

  <div style="margin-bottom: 14px;">
    <strong style="color: #fcd34d; font-size: 14px;">Day 2 &ndash; 19th September:</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      A day filled with technical sessions, leadership and professional development activities, networking, and the Congress experience.
    </p>
  </div>

  <div>
    <strong style="color: #fcd34d; font-size: 14px;">Day 3 &ndash; 20th September:</strong>
    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
      More insightful sessions, interactive activities, networking opportunities, and the closing ceremony to conclude an unforgettable Congress.
    </p>
  </div>
</div>

<p style="margin-bottom: 16px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">
  For the detailed schedule, list of items you should bring, important guidelines, and other information, please refer to the Delegate Handbook attached.
</p>

<p style="margin-bottom: 16px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">
  This year’s Congress, themed <strong style="color: #fcd34d;">&ldquo;Intelligence for Impact,&rdquo;</strong> is designed to bring together passionate individuals to explore ideas, exchange knowledge, build meaningful connections, and create impact through innovation and leadership.
</p>

<p style="margin-bottom: 16px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">
  This is your personal invitation to step into an inspiring space where ideas meet opportunities, connections become collaborations, and experiences become lifelong memories.
</p>

<p style="margin-bottom: 20px; font-size: 14px; line-height: 1.7; color: #cbd5e1;">
  We can’t wait to welcome you to Club Palm Bay Hotel, Marawila, and share this incredible experience with you.
</p>

<p style="font-size: 14px; line-height: 1.7; color: #fcd34d; font-weight: 600; margin-bottom: 24px;">
  See you at IEEE SLSYWC &apos;26!<br>
  <span style="color: #94a3b8; font-weight: normal; font-size: 13px;">Until then, get ready for an unforgettable journey.</span>
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
          
          <!-- Header / Cover Banner -->
          <tr>
            <td align="center" style="padding: 0; background-color: #101828; line-height: 0;">
              <a href="https://slsywc.ieee.lk" target="_blank" style="text-decoration: none; display: block;">
                <img src="${LOGO_URL}" alt="IEEE SLSYWC 2026 Header" width="600" style="width: 100%; max-width: 600px; display: block; height: auto; border: 0;" />
              </a>
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
                    <p style="margin: 0; color: #e3e3db; font-weight: 600;">Warm Regards,</p>
                    <p style="margin: 4px 0 0 0; color: #cbd5e1; font-weight: 600;">IEEE SLSYWC &apos;26 Organizing Committee</p>
                    <p style="margin: 2px 0 0 0; color: #f59e0b; font-size: 13px; font-weight: 600;">IEEE Sri Lanka Section</p>
                    <p style="margin: 2px 0 0 0; color: #64748b; font-size: 12px;">Students | Young Professionals | Women in Engineering</p>
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
                Copyright &copy; 2026 IEEE SLSYWC. All rights reserved. &bull;
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
