"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

function formatLocalTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: profile.timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function hourInZone(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: profile.timezone,
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);
  return Number(parts.find((part) => part.type === "hour")?.value ?? "12");
}

function dayPart(hour: number, isDay: boolean | null) {
  if (isDay === false || hour >= 20 || hour < 5) return "night";
  if (hour < 11) return "morning";
  if (hour < 16) return "afternoon";
  if (hour < 20) return "evening";
  return "night";
}

function weatherWord(code: number) {
  if (code === 0) return "clear";
  if (code <= 3) return "soft cloud";
  if (code <= 48) return "misty";
  if (code <= 67) return "rainy";
  if (code <= 77) return "wintry";
  if (code <= 82) return "showery";
  if (code <= 99) return "stormy";
  return "quiet";
}

function skySentence(opts: {
  code: number | null;
  temp: number | null;
  isDay: boolean | null;
  hour: number;
}) {
  const part = dayPart(opts.hour, opts.isDay);
  const weather = opts.code == null ? "open" : weatherWord(opts.code);
  const place = profile.base.label;
  const temp =
    opts.temp == null ? "" : ` · ${Math.round(opts.temp)}°`;

  if (part === "morning") {
    return `${weather.charAt(0).toUpperCase() + weather.slice(1)} morning sky over ${place}${temp}`;
  }
  if (part === "afternoon") {
    return `${weather.charAt(0).toUpperCase() + weather.slice(1)} afternoon above ${place}${temp}`;
  }
  if (part === "evening") {
    return `${weather.charAt(0).toUpperCase() + weather.slice(1)} evening sky over ${place}${temp}`;
  }
  return `${weather.charAt(0).toUpperCase() + weather.slice(1)} night over ${place}${temp}`;
}

export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(formatLocalTime(new Date()));
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="local-time" aria-live="off">
      <span>{profile.base.label}</span>
      <span className="slash">·</span>
      <span className="local-clock">{time || "—"}</span>
    </p>
  );
}

export function SkyLine() {
  const [line, setLine] = useState("");

  useEffect(() => {
    let cancelled = false;
    const hour = hourInZone(new Date());
    const fallback = skySentence({ code: null, temp: null, isDay: null, hour });

    async function load() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${profile.base.lat}&longitude=${profile.base.lng}` +
          `&current=temperature_2m,weather_code,is_day&timezone=${encodeURIComponent(profile.timezone)}`;
        const response = await fetch(url, { signal: AbortSignal.timeout(4500) });
        if (!response.ok) throw new Error("weather");
        const data = (await response.json()) as {
          current?: { temperature_2m?: number; weather_code?: number; is_day?: number };
        };
        if (cancelled) return;
        setLine(
          skySentence({
            code: data.current?.weather_code ?? null,
            temp: data.current?.temperature_2m ?? null,
            isDay: data.current?.is_day == null ? null : data.current.is_day === 1,
            hour,
          }),
        );
      } catch {
        if (!cancelled) setLine(fallback);
      }
    }

    setLine(fallback);
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!line) return null;
  return <p className="sky-line">{line}</p>;
}
