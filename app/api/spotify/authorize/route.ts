import { NextResponse } from "next/server";
import { SPOTIFY_SCOPES, spotifyRedirectUri } from "@/lib/spotify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function setupAllowed() {
  return process.env.SPOTIFY_ALLOW_SETUP === "1" || process.env.NODE_ENV !== "production";
}

export async function GET(request: Request) {
  if (!setupAllowed()) {
    return NextResponse.json(
      { error: "Spotify setup is disabled. Set SPOTIFY_ALLOW_SETUP=1 temporarily." },
      { status: 403 },
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim();
  if (!clientId) {
    return NextResponse.json({ error: "SPOTIFY_CLIENT_ID is missing" }, { status: 400 });
  }

  const redirectUri = spotifyRedirectUri(request.url);
  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", SPOTIFY_SCOPES);
  url.searchParams.set("show_dialog", "true");

  return NextResponse.redirect(url.toString());
}
