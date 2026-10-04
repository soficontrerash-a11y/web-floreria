import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "analytics-events.json");

interface AnalyticsEvent {
  id: string;
  eventType: string;
  trafficType: string;
  placement?: string;
  url?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  timestamp: string;
}

async function readEvents(): Promise<AnalyticsEvent[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveEvents(events: AnalyticsEvent[]): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  // Keep last 10,000 events
  const trimmed = events.slice(-10000);
  await fs.writeFile(DATA_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    let body: Partial<AnalyticsEvent>;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json") || contentType.includes("text/plain")) {
      const text = await req.text();
      body = JSON.parse(text);
    } else {
      body = await req.json();
    }

    if (!body.eventType) {
      return NextResponse.json({ error: "Missing eventType" }, { status: 400 });
    }

    const event: AnalyticsEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      eventType: String(body.eventType),
      trafficType: String(body.trafficType || "organico"),
      placement: body.placement ? String(body.placement) : undefined,
      url: body.url ? String(body.url) : undefined,
      referrer: body.referrer ? String(body.referrer) : undefined,
      utmSource: body.utmSource ? String(body.utmSource) : undefined,
      utmMedium: body.utmMedium ? String(body.utmMedium) : undefined,
      utmCampaign: body.utmCampaign ? String(body.utmCampaign) : undefined,
      gclid: body.gclid ? String(body.gclid) : undefined,
      timestamp: body.timestamp || new Date().toISOString(),
    };

    const events = await readEvents();
    events.push(event);
    await saveEvents(events);

    return NextResponse.json({ success: true, id: event.id });
  } catch (error) {
    console.error("Error logging analytics event:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function GET() {
  const events = await readEvents();
  return NextResponse.json({
    totalEvents: events.length,
    recentEvents: events.slice(-50),
  });
}
