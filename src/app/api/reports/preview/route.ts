import { NextResponse } from "next/server";
import { calculateMetrics, generateReportHtml } from "@/lib/report-generator";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const semana = url.searchParams.get("semana") || "anterior";
    const metrics = await calculateMetrics(semana);
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
