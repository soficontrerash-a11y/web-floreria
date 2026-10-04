import { NextResponse } from "next/server";
import { calculateMetrics, generateReportHtml } from "@/lib/report-generator";

export async function GET() {
  try {
    const metrics = await calculateMetrics(7);
    const html = generateReportHtml(metrics);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating report preview:", error);
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 });
  }
}
