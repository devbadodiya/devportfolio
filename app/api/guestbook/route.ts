import { NextResponse } from "next/server";
import { addGuestbookEntry, listGuestbook } from "@/lib/guestbook";

export const runtime = "nodejs";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "";
  return request.headers.get("x-real-ip")?.trim() || "local";
}

export async function GET() {
  return NextResponse.json(await listGuestbook());
}

export async function POST(request: Request) {
  let body: { name?: unknown; message?: unknown } = {};
  try {
    body = (await request.json()) as { name?: unknown; message?: unknown };
  } catch {
    body = {};
  }

  const result = await addGuestbookEntry({
    name: body.name,
    message: body.message,
    ip: clientIp(request),
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result.snapshot);
}
