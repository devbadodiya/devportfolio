import { NextResponse } from "next/server";
import { exchangeCodeForTokens, spotifyRedirectUri } from "@/lib/spotify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function setupAllowed() {
  return process.env.SPOTIFY_ALLOW_SETUP === "1" || process.env.NODE_ENV !== "production";
}

export async function GET(request: Request) {
  if (!setupAllowed()) {
    return new NextResponse("Spotify setup is disabled.", { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(`Spotify authorization failed: ${error}`, { status: 400 });
  }
  if (!code) {
    return new NextResponse("Missing authorization code.", { status: 400 });
  }

  try {
    const redirectUri = spotifyRedirectUri(request.url);
    const tokens = await exchangeCodeForTokens(code, redirectUri);
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Spotify connected</title>
  <style>
    body { font-family: ui-sans-serif, system-ui, sans-serif; max-width: 42rem; margin: 3rem auto; padding: 0 1.25rem; line-height: 1.5; color: #111; }
    code, pre { background: #f4f4f1; border-radius: 8px; }
    code { padding: 0.15rem 0.35rem; }
    pre { padding: 1rem; overflow: auto; white-space: pre-wrap; word-break: break-all; }
    .warn { color: #7a3b00; }
  </style>
</head>
<body>
  <h1>Spotify connected</h1>
  <p>Copy this refresh token into <code>.env.local</code> (and your host env), then remove <code>SPOTIFY_ALLOW_SETUP</code>.</p>
  <pre>${tokens.refresh_token}</pre>
  <p>Add:</p>
  <pre>SPOTIFY_CLIENT_ID=…
SPOTIFY_CLIENT_SECRET=…
SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}
SPOTIFY_REDIRECT_URI=${redirectUri}</pre>
  <p class="warn">Do not commit this page output or the token. Close the tab when you are done.</p>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(message, { status: 500 });
  }
}
