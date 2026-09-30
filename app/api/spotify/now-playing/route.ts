import { NextResponse } from "next/server";
import { getNowPlaying, spotifyConfigured } from "@/lib/spotify";
import { listening } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!spotifyConfigured()) {
    return NextResponse.json({
      configured: false,
      isPlaying: false,
      title: listening.title,
      artist: listening.artist,
      album: listening.album,
      href: listening.href,
      embed: listening.embed,
      image: null,
      progressMs: null,
      durationMs: null,
      source: "fallback",
    });
  }

  try {
    const track = await getNowPlaying();
    if (!track) {
      return NextResponse.json({
        configured: true,
        isPlaying: false,
        title: listening.title,
        artist: listening.artist,
        album: listening.album,
        href: listening.href,
        embed: listening.embed,
        image: null,
        progressMs: null,
        durationMs: null,
        source: "fallback",
      });
    }

    return NextResponse.json({
      configured: true,
      ...track,
      source: track.isPlaying ? "live" : "recent",
    });
  } catch {
    return NextResponse.json(
      {
        configured: true,
        isPlaying: false,
        title: listening.title,
        artist: listening.artist,
        album: listening.album,
        href: listening.href,
        embed: listening.embed,
        image: null,
        progressMs: null,
        durationMs: null,
        source: "fallback",
        error: true,
      },
      { status: 200 },
    );
  }
}
