import { NextRequest, NextResponse } from "next/server";
import { sendWeeklyReport } from "@/lib/mailer";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const recipient = url.searchParams.get("recipient") || "floresdelparquemontoya@gmail.com";
    const semana = url.searchParams.get("semana") || "anterior";

    const result = await sendWeeklyReport(recipient, semana);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in send report route:", error);
    return NextResponse.json(
      { success: false, error: "Internal Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let recipient = "floresdelparquemontoya@gmail.com";
    let semana = "anterior";
    try {
      const body = await req.json();
      if (body.recipient) recipient = body.recipient;
      if (body.semana) semana = body.semana;
    } catch {
      // Use default
    }

    const result = await sendWeeklyReport(recipient, semana);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in send report route:", error);
    return NextResponse.json(
      { success: false, error: "Internal Error" },
      { status: 500 }
    );
  }
}
