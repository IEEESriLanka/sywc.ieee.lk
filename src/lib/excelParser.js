import * as XLSX from "xlsx";

/**
 * Normalizes header keys to find name and email fields flexibly.
 */
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

/**
 * Parses an Excel or CSV file buffer and returns a list of normalized recipient objects:
 * [{ name: string, email: string, ...extraData }]
 */
export function parseExcelBuffer(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
    throw new Error("The uploaded Excel file contains no worksheets.");
  }

  // Use the first sheet
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert sheet to JSON array
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  if (!rawRows || rawRows.length === 0) {
    throw new Error("The Excel worksheet is empty.");
  }

  const nameCandidates = [
    "name",
    "fullname",
    "full_name",
    "namewithinitials",
    "firstname",
    "first_name",
    "recipient",
    "recipientname",
    "attendee",
    "user",
  ];

  const emailCandidates = [
    "email",
    "emailaddress",
    "email_address",
    "mail",
    "e_mail",
    "e-mail",
    "primaryemail",
    "contactemail",
  ];

  const recipients = [];

  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i];
    const name = findKey(row, nameCandidates);
    const email = findKey(row, emailCandidates);

    if (name || email) {
      recipients.push({
        name: name || "",
        email: email || "",
        rowNumber: i + 2, // 1-based index including header
        ...row,
      });
    }
  }

  return recipients;
}
