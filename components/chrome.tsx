"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { VisitSnapshot } from "@/lib/visits";
import { profile } from "@/lib/content";
import { CommandPalette } from "./command-palette";
import { TextLink, TransitionLink } from "./links";
import { LocalTime, SkyLine } from "./presence";

type SiteContextValue = {
  openPalette: () => void;
  visits: VisitSnapshot | null;
  browserVisits: number;
};

const SiteContext = createContext<SiteContextValue>({
  openPalette: () => {},
  visits: null,
  browserVisits: 0,
});

export function useSite() {
  return useContext(SiteContext);
}

const nav = [
  { href: "/", title: "Home" },
  { href: "/work", title: "Work" },
  { href: "/favorites", title: "Favorites" },
  { href: "/photos", title: "Photos" },
];

const more = [
  { href: "/about", title: "About" },
  { href: "/now", title: "Now" },
  { href: "/someday", title: "Someday" },
  { href: "/writing", title: "Writing" },
  { href: "/skills", title: "Skills" },
  { href: "/decisions", title: "Decisions" },
  { href: "/guestbook", title: "Guestbook" },
  { href: "/visits", title: "Visits" },
  { href: "/studio", title: "Desk" },
  { href: "/colophon", title: "Colophon" },
];

export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);
  const [visits, setVisits] = useState<VisitSnapshot | null>(null);
  const [browserVisits, setBrowserVisits] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const counted = sessionStorage.getItem("browser-counted");
    const current = Number(localStorage.getItem("browser-visits") || "0");
    if (!counted) {
      const next = current + 1;
      localStorage.setItem("browser-visits", String(next));
      sessionStorage.setItem("browser-counted", "1");
      setBrowserVisits(next);
    } else {
      setBrowserVisits(current);
    }
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }
    function onOpen() {
      setPaletteOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    type Geo = { city: string; country: string; lat: number | null; lng: number | null };

    async function locate(): Promise<Geo> {
      const cached = sessionStorage.getItem("geo");
      if (cached) {
        const parsed = JSON.parse(cached) as Geo;
        if (parsed.city || parsed.country) return parsed;
      }

      const empty: Geo = { city: "", country: "", lat: null, lng: null };
      const sources = [
        async (): Promise<Geo | null> => {
          const response = await fetch("https://get.geojs.io/v1/ip/geo.json", {
            signal: AbortSignal.timeout(4000),
          });
          if (!response.ok) return null;
          const data = (await response.json()) as {
            city?: string;
            country?: string;
            latitude?: string;
            longitude?: string;
          };
          const lat = data.latitude != null ? Number(data.latitude) : null;
          const lng = data.longitude != null ? Number(data.longitude) : null;
          return {
            city: data.city ?? "",
            country: data.country ?? "",
            lat: Number.isFinite(lat) ? lat : null,
            lng: Number.isFinite(lng) ? lng : null,
          };
        },
        async (): Promise<Geo | null> => {
          const response = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(4000) });
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
            city: data.city ?? "",
            country: data.country ?? "",
            lat: data.latitude ?? null,
            lng: data.longitude ?? null,
          };
        },
      ];

      for (const source of sources) {
        try {
          const geo = await source();
          if (geo && (geo.city || geo.country)) {
            sessionStorage.setItem("geo", JSON.stringify(geo));
            return geo;
          }
        } catch {
          /* try next */
        }
      }
      return empty;
    }

    async function record() {
      const key = `seen:${pathname}`;
      if (sessionStorage.getItem(key)) {
        const response = await fetch("/api/visits");
        if (!cancelled && response.ok) setVisits((await response.json()) as VisitSnapshot);
        return;
      }
      sessionStorage.setItem(key, "1");
      const geo = await locate();
      const response = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, ...geo }),
      });
      if (!cancelled && response.ok) setVisits((await response.json()) as VisitSnapshot);
    }

    record().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    const id = window.setInterval(() => {
      fetch("/api/visits")
        .then((response) => response.json())
        .then((data: VisitSnapshot) => setVisits(data))
        .catch(() => {});
    }, 10000);
    return () => window.clearInterval(id);
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  function active(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const place = visits?.lastPlace ?? (visits?.last?.city || visits?.last?.country ? visits.last : null);
  const placeLabel = [place?.city?.trim(), place?.country?.trim()].filter(Boolean).join(" · ");
  const visitLabel = `${(visits?.total ?? 0).toLocaleString("en-US")} visit${
    (visits?.total ?? 0) === 1 ? "" : "s"
  }${placeLabel ? ` · last from ${placeLabel}` : " · online"}`;

  return (
    <SiteContext.Provider value={{ openPalette, visits, browserVisits }}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="column">
        <header>
          <TransitionLink href="/" className="avatar" aria-label="Home">
            <img src="/dev.jpg" alt="" width={52} height={52} />
          </TransitionLink>
          {pathname === "/" ? (
            <h1 className="site-name">
              <TransitionLink href="/">{profile.name}</TransitionLink>
            </h1>
          ) : (
            <p className="site-name">
              <TransitionLink href="/">{profile.name}</TransitionLink>
            </p>
          )}
          {pathname === "/" ? (
            <div className="identity">
              <p className="role-line">
                <span>{profile.role}</span>
                <span className="slash">/</span>
                <span>{profile.location}</span>
              </p>
              <LocalTime />
              <SkyLine />
              <p className="tagline">
                Building <TextLink href={profile.companyUrl}>Cosverse AI</TextLink>, an Agentic Multimodel AI
              </p>
            </div>
          ) : null}
          <nav className="nav-row" aria-label="Main">
            {nav.map((item) => (
              <TransitionLink key={item.href} href={item.href} data-active={active(item.href) ? "true" : "false"}>
                {item.title}
              </TransitionLink>
            ))}
            <button className="palette-btn" type="button" onClick={openPalette} aria-label="Open command palette">
              <kbd>⌘K</kbd>
            </button>
            <button className="theme-btn" type="button" onClick={toggleTheme}>
              {dark ? "Go light" : "Go dark"}
            </button>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="foot">
          <nav className="foot-links" aria-label="More">
            {more.map((item) => (
              <TransitionLink key={item.href} href={item.href}>
                {item.title}
              </TransitionLink>
            ))}
          </nav>
          <div className="foot-meta">
            <p className="foot-copy">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <TransitionLink href="/visits" className="foot-visits">
              {visitLabel}
            </TransitionLink>
          </div>
        </footer>
      </div>
      <CommandPalette open={paletteOpen} onClose={closePalette} onToggleTheme={toggleTheme} />
    </SiteContext.Provider>
  );
}
