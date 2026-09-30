export type SpotifyTrack = {
  title: string;
  artist: string;
  album: string;
  href: string;
  embed: string;
  image: string | null;
  isPlaying: boolean;
  progressMs: number | null;
  durationMs: number | null;
};

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || null;
}

export function spotifyConfigured() {
  return Boolean(
    requiredEnv("SPOTIFY_CLIENT_ID") &&
      requiredEnv("SPOTIFY_CLIENT_SECRET") &&
      requiredEnv("SPOTIFY_REFRESH_TOKEN"),
  );
}

export function spotifyRedirectUri(requestUrl: string) {
  const configured = requiredEnv("SPOTIFY_REDIRECT_URI");
  if (configured) return configured;
  const origin = new URL(requestUrl).origin;
  return `${origin}/api/spotify/callback`;
}

export const SPOTIFY_SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
].join(" ");

async function refreshAccessToken() {
  const clientId = requiredEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requiredEnv("SPOTIFY_CLIENT_SECRET");
  const refreshToken = requiredEnv("SPOTIFY_REFRESH_TOKEN");
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify is not configured");
  }

  if (tokenCache && Date.now() < tokenCache.expiresAt - 30_000) {
    return tokenCache.accessToken;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spotify token refresh failed (${response.status})`);
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return tokenCache.accessToken;
}

type SpotifyApiTrack = {
  id?: string;
  name?: string;
  duration_ms?: number;
  external_urls?: { spotify?: string };
  artists?: Array<{ name?: string }>;
  album?: {
    name?: string;
    images?: Array<{ url?: string }>;
  };
};

function toTrack(
  item: SpotifyApiTrack,
  opts: { isPlaying: boolean; progressMs?: number | null },
): SpotifyTrack | null {
  const id = item.id;
  const title = item.name?.trim();
  if (!id || !title) return null;

  const artist =
    item.artists
      ?.map((entry) => entry.name?.trim())
      .filter(Boolean)
      .join(", ") || "Unknown artist";

  return {
    title,
    artist,
    album: item.album?.name?.trim() || "",
    href: item.external_urls?.spotify || `https://open.spotify.com/track/${id}`,
    embed: `https://open.spotify.com/embed/track/${id}`,
    image: item.album?.images?.[0]?.url ?? null,
    isPlaying: opts.isPlaying,
    progressMs: opts.progressMs ?? null,
    durationMs: typeof item.duration_ms === "number" ? item.duration_ms : null,
  };
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  if (!spotifyConfigured()) return null;

  const accessToken = await refreshAccessToken();

  const current = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (current.status === 200) {
    const data = (await current.json()) as {
      is_playing?: boolean;
      progress_ms?: number;
      item?: SpotifyApiTrack | null;
      currently_playing_type?: string;
    };

    if (data.item && data.currently_playing_type !== "episode") {
      return toTrack(data.item, {
        isPlaying: Boolean(data.is_playing),
        progressMs: typeof data.progress_ms === "number" ? data.progress_ms : null,
      });
    }
  }

  if (current.status !== 204 && current.status !== 200 && current.status !== 404) {
    // Fall through to recently played when nothing is active.
    if (current.status !== 401 && current.status !== 403) {
      /* keep going */
    }
  }

  const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!recent.ok) return null;

  const recentData = (await recent.json()) as {
    items?: Array<{ track?: SpotifyApiTrack }>;
  };
  const last = recentData.items?.[0]?.track;
  if (!last) return null;

  return toTrack(last, { isPlaying: false, progressMs: null });
}

export async function exchangeCodeForTokens(code: string, redirectUri: string) {
  const clientId = requiredEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requiredEnv("SPOTIFY_CLIENT_SECRET");
  if (!clientId || !clientSecret) {
    throw new Error("Spotify client credentials are missing");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Spotify code exchange failed (${response.status}): ${detail}`);
  }

  return (await response.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope?: string;
  };
}
