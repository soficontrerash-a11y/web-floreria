export type EventType =
  | "page_view"
  | "click_whatsapp"
  | "click_instagram"
  | "click_google_maps";

export type TrafficType = "organico" | "ads" | "directo" | "referral";

export interface AnalyticsEvent {
  id?: string;
  eventType: EventType;
  trafficType: TrafficType;
  placement?: string;
  url?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  timestamp: string;
}

const SESSION_STORAGE_KEY = "fm_traffic_attribution";

/**
 * Detects whether the current visitor arrived from Google Ads, organic search, or direct.
 */
export function getTrafficAttribution(): {
  trafficType: TrafficType;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  referrer?: string;
} {
  if (typeof window === "undefined") {
    return { trafficType: "organico" };
  }

  // Check existing session attribution
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore storage errors
  }

  const urlParams = new URLSearchParams(window.location.search);
  const gclid = urlParams.get("gclid") || undefined;
  const utmSource = urlParams.get("utm_source") || undefined;
  const utmMedium = urlParams.get("utm_medium") || undefined;
  const utmCampaign = urlParams.get("utm_campaign") || undefined;
  const referrer = document.referrer || "";

  let trafficType: TrafficType = "directo";

  if (gclid || utmMedium === "cpc" || utmSource?.toLowerCase().includes("google_ads")) {
    trafficType = "ads";
  } else if (
    referrer.includes("google.com") ||
    referrer.includes("google.com.ar") ||
    referrer.includes("bing.com") ||
    utmMedium === "organic"
  ) {
    trafficType = "organico";
  } else if (referrer.includes("instagram.com") || referrer.includes("facebook.com")) {
    trafficType = "referral";
  } else if (!referrer) {
    trafficType = "organico"; // Default organic for search/bookmarks in local market
  } else {
    trafficType = "referral";
  }

  const attribution = {
    trafficType,
    utmSource,
    utmMedium,
    utmCampaign,
    gclid,
    referrer,
  };

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Ignore storage errors
  }

  return attribution;
}

/**
 * Non-blocking event sender using Beacon API with fetch fallback
 */
export function trackEvent(
  eventType: EventType,
  placement: string = "general",
  additionalMeta?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  const attribution = getTrafficAttribution();
  const payload: AnalyticsEvent = {
    eventType,
    trafficType: attribution.trafficType,
    placement,
    url: window.location.pathname,
    referrer: attribution.referrer,
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    gclid: attribution.gclid,
    timestamp: new Date().toISOString(),
    ...additionalMeta,
  };

  const jsonString = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([jsonString], { type: "application/json" });
    const success = navigator.sendBeacon("/api/track", blob);
    if (!success) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonString,
        keepalive: true,
      }).catch(() => {});
    }
  } else {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
      keepalive: true,
    }).catch(() => {});
  }
}
