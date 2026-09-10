import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const pdfPath = path.join(
      process.cwd(),
      "public",
      "Delegate handbook",
      "Delegate Handbook.pdf"
    );

    if (!fs.existsSync(pdfPath)) {
      return new NextResponse("Delegate Handbook not found on server.", {
        status: 404,
      });
    }

    const fileBuffer = fs.readFileSync(pdfPath);
    const { searchParams } = new URL(request.url);
    const isDownload =
      searchParams.get("download") === "true" ||
      searchParams.get("dl") === "1";

    const disposition = isDownload
      ? 'attachment; filename="IEEE_SLSYWC_2026_Delegate_Handbook.pdf"'
      : 'inline; filename="IEEE_SLSYWC_2026_Delegate_Handbook.pdf"';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": disposition,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error serving Delegate Handbook:", error);
    return new NextResponse("Internal Server Error while reading handbook.", {
      status: 500,
    });
  }
}
