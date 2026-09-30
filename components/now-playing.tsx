"use client";

import { useEffect, useState } from "react";
import { listening } from "@/lib/content";

type NowPlayingPayload = {
  configured: boolean;
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  href: string;
  embed: string;
  image: string | null;
  source: "live" | "recent" | "fallback";
};

const fallback: NowPlayingPayload = {
  configured: false,
  isPlaying: false,
  title: listening.title,
  artist: listening.artist,
  album: listening.album,
  href: listening.href,
  embed: listening.embed,
  image: null,
  source: "fallback",
};

function statusLine(data: NowPlayingPayload) {
  if (data.source === "live" && data.isPlaying) return "Live on Spotify";
  if (data.source === "recent") return "Recently on Spotify";
  if (data.configured) return "Spotify connected · quiet right now";
  return "Spotify not connected yet — finish authorize to show live tracks.";
}

export function NowPlayingBlock({ showHeading = true }: { showHeading?: boolean }) {
  const [data, setData] = useState<NowPlayingPayload>(fallback);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
          signal: AbortSignal.timeout(6000),
        });
        if (!response.ok) return;
        const next = (await response.json()) as NowPlayingPayload;
        if (!cancelled) setData(next);
      } catch {
        /* keep last known */
      }
    }

    load();
    const id = window.setInterval(load, 20_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <section className={showHeading ? "craft-block listening-block" : "listening-block home-listening"}>
      {showHeading ? <h2>Listening</h2> : null}
      <p className="quiet">{statusLine(data)}</p>
      <a className="listening-card" href={data.href} target="_blank" rel="noopener noreferrer">
        <div className="listening-main">
          {data.image ? (
            <img className="listening-art" src={data.image} alt="" width={56} height={56} />
          ) : null}
          <div>
            <strong>
              {data.isPlaying ? <span className="listening-pulse" aria-hidden="true" /> : null}
              {data.title}
            </strong>
            <span className="listening-meta">
              {data.artist}
              {data.album ? ` · ${data.album}` : ""}
            </span>
            <span className="listening-note">
              {data.source === "live" && data.isPlaying
                ? "Playing right now."
                : data.source === "recent"
                  ? "Last track from Spotify."
                  : listening.note}
            </span>
          </div>
        </div>
        <span className="listening-open">Spotify ↗</span>
      </a>
    </section>
  );
}
