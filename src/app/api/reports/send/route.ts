import { NextRequest, NextResponse } from "next/server";
import { sendWeeklyReport } from "@/lib/mailer";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const recipient = url.searchParams.get("recipient") || "floresdelparquemontoya@gmail.com";

    const result = await sendWeeklyReport(recipient);

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
    try {
      const body = await req.json();
      if (body.recipient) recipient = body.recipient;
    } catch {
      // Use default
    }

    const result = await sendWeeklyReport(recipient);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in send report route:", error);
    return NextResponse.json(
      { success: false, error: "Internal Error" },
      { status: 500 }
    );
  }
}
