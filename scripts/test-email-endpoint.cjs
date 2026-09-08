const XLSX = require("xlsx");

// Test functions inline mimicking the modules to verify parsing and templating
const LOGO_URL = "https://res.cloudinary.com/q1juijf8/image/upload/v1788852242/main-logo_weonid.svg";

function renderEmailTemplate(templateStr, data = {}) {
  let rendered = templateStr || `<!DOCTYPE html>
<html>
<head><title>{{subject}}</title></head>
<body>
  <img src="${LOGO_URL}" alt="IEEE Logo"/>
  <h1>Dear {{name}},</h1>
  <div>{{content}}</div>
  {{#if ctaUrl}}
  <a href="{{ctaUrl}}">{{ctaText}}</a>
  {{/if}}
</body>
</html>`;

  rendered = rendered.replace(
    /\{\{#if\s+([a-zA-Z0-9_]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (match, key, blockContent) => (data[key] ? blockContent : "")
  );

  rendered = rendered.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(data, key) && data[key] !== undefined && data[key] !== null
      ? String(data[key])
      : "";
  });

  return rendered;
}

function findKey(row, potentialKeys) {
  const keys = Object.keys(row);
  for (const pKey of potentialKeys) {
    const found = keys.find(
      (k) =>
        k.trim().toLowerCase().replace(/[^a-z0-9]/g, "") ===
        pKey.toLowerCase().replace(/[^a-z0-9]/g, "")
    );
    if (found && row[found] !== undefined && row[found] !== null && String(row[found]).trim() !== "") {
      return String(row[found]).trim();
    }
  }
  return null;
}

function parseExcelBuffer(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
    throw new Error("No sheets");
  }
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  const nameCandidates = ["name", "fullname", "full_name", "namewithinitials", "firstname"];
  const emailCandidates = ["email", "emailaddress", "email_address", "mail"];

  const recipients = [];
  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i];
    const name = findKey(row, nameCandidates);
    const email = findKey(row, emailCandidates);
    if (name || email) {
      recipients.push({ name: name || "", email: email || "", rowNumber: i + 2, ...row });
    }
  }
  return recipients;
}

function validateRecipient(recipient) {
  const errors = [];
  const name = recipient.name ? String(recipient.name).trim() : "";
  const email = recipient.email ? String(recipient.email).trim() : "";
  if (!name) errors.push("Name is required");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) errors.push("Email is required");
  else if (!emailRegex.test(email)) errors.push("Invalid email format");
  return { isValid: errors.length === 0, errors, sanitized: { ...recipient, name, email } };
}

async function run() {
  console.log("=== RUNNING TEST SUITE (CJS) ===\n");

  // 1. Template
  const html = renderEmailTemplate(null, {
    name: "Kasun Perera",
    content: "Welcome to IEEE SLSYWC 2026",
    ctaUrl: "https://slsywc.ieee.lk",
    ctaText: "Register Now"
  });
  console.log("HTML Render check:");
  if (!html.includes("Kasun Perera")) throw new Error("Missing name");
  if (!html.includes(LOGO_URL)) throw new Error("Missing logo URL");
  if (!html.includes("Register Now")) throw new Error("Missing CTA");
  console.log("✓ HTML template rendered correctly with Logo URL and dynamic name.\n");

  // 2. Excel Parsing
  const data = [
    { "Full Name": "Kasun Perera", "Email Address": "kasun@example.com", "Tier": "Student" },
    { "Full Name": "Amali Silva", "Email Address": "amali@example.com", "Tier": "Professional" },
    { "Full Name": "", "Email Address": "unknown@example.com" },
    { "Full Name": "Kamal", "Email Address": "not-valid" }
  ];
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const parsed = parseExcelBuffer(buf);
  console.log(`Parsed ${parsed.length} rows.`);
  if (parsed.length !== 4) throw new Error("Failed row count");
  if (parsed[0].name !== "Kasun Perera" || parsed[0].email !== "kasun@example.com") throw new Error("Field match error");
  console.log("✓ Excel file parsed successfully.\n");

  // 3. Validation
  const val1 = validateRecipient(parsed[0]);
  const val2 = validateRecipient(parsed[2]);
  const val3 = validateRecipient(parsed[3]);

  if (!val1.isValid) throw new Error("Row 1 should be valid");
  if (val2.isValid) throw new Error("Row 3 should be invalid (missing name)");
  if (val3.isValid) throw new Error("Row 4 should be invalid (bad email)");

  console.log("✓ Recipient validation behaves correctly.\n");
  console.log("=== ALL TEST SUITE CHECKS PASSED ===");
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
