import { NextResponse } from "next/server";
import type { VisitHit } from "@/lib/visits";
import { addVisit, listVisits } from "@/lib/visits-store";

export const runtime = "nodejs";

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "";
  return request.headers.get("x-real-ip")?.trim() || "";
}

async function locateFromIp(ip: string) {
  if (!ip || ip === "127.0.0.1" || ip === "::1") return null;
  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(3500),
      next: { revalidate: 0 },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      success?: boolean;
      city?: string;
      country?: string;
      latitude?: number;
      longitude?: number;
    };
    if (!data.success) return null;
    return {
      city: clean(data.city, 60),
      country: clean(data.country, 60),
      lat: typeof data.latitude === "number" ? data.latitude : null,
      lng: typeof data.longitude === "number" ? data.longitude : null,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  return NextResponse.json(await listVisits());
}

export async function POST(request: Request) {
  let body: Partial<VisitHit> = {};
  try {
    body = (await request.json()) as Partial<VisitHit>;
  } catch {
    body = {};
  }
  const rawPath = typeof body.path === "string" ? body.path : "/";
  const path =
    rawPath.startsWith("/") && !rawPath.startsWith("//") && !rawPath.includes("://") && rawPath.length < 80
      ? rawPath.split("?")[0]
      : "/";
  let city = clean(body.city, 60);
  let country = clean(body.country, 60);
  let lat = typeof body.lat === "number" && Math.abs(body.lat) <= 90 ? body.lat : null;
  let lng = typeof body.lng === "number" && Math.abs(body.lng) <= 180 ? body.lng : null;

  if (!city && !country) {
    const resolved = await locateFromIp(clientIp(request));
    if (resolved) {
      city = resolved.city;
      country = resolved.country;
      lat = resolved.lat;
      lng = resolved.lng;
    }
  }

  const hit: VisitHit = {
    path,
    city,
    country,
    lat,
    lng,
    at: new Date().toISOString(),
  };

  return NextResponse.json(await addVisit(hit));
}
