import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import defaultEvents from "@/data/analytics-events.json";

const DATA_FILE = path.join(process.cwd(), "src", "data", "analytics-events.json");
const TMP_FILE = path.join("/tmp", "analytics-events.json");

// In-memory cache for the serverless runtime lifetime
let memoryEvents: AnalyticsEvent[] = [];

export interface AnalyticsEvent {
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

export async function readEvents(): Promise<AnalyticsEvent[]> {
  if (memoryEvents.length > 0) {
    return memoryEvents;
  }

  // 1. Try reading from project directory (local dev)
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryEvents = parsed;
      return memoryEvents;
    }
  } catch {
    // Continue
  }

  // 2. Try reading from /tmp (writable in serverless)
  try {
    const tmpData = await fs.readFile(TMP_FILE, "utf-8");
    const parsed = JSON.parse(tmpData);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryEvents = parsed;
      return memoryEvents;
    }
  } catch {
    // Continue
  }

  // 3. Fallback to bundled events
  if (Array.isArray(defaultEvents)) {
    memoryEvents = [...defaultEvents] as AnalyticsEvent[];
    return memoryEvents;
  }

  return [];
}

async function saveEvents(events: AnalyticsEvent[]): Promise<void> {
  const trimmed = events.slice(-10000);
  memoryEvents = trimmed;

  // 1. Try writing to local project file (works in local dev)
  try {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
    return;
  } catch {
    // Read-only filesystem in Vercel serverless
  }

  // 2. Try writing to /tmp (works in Vercel serverless lambda)
  try {
    await fs.writeFile(TMP_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  } catch {
    // Memory cache persists for runtime lifetime
  }
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
