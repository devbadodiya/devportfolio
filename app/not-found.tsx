"use client";

import { TransitionLink } from "@/components/links";

function openPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export default function NotFound() {
  return (
    <article className="page missing">
      <p className="kicker">404</p>
      <h1>This page wandered off.</h1>
      <p className="lede">
        Nothing lives at this address. The rest of the site is still here — home, work, notes, the desk.
      </p>
      <p className="missing-hint">
        Press{" "}
        <button type="button" className="missing-kbd" onClick={openPalette} aria-label="Open command palette">
          ⌘K
        </button>{" "}
        to jump somewhere, or pick a door below.
      </p>
      <p className="missing-links">
        <TransitionLink href="/" className="text-link">
          Home
        </TransitionLink>
        <span className="slash">/</span>
        <TransitionLink href="/work" className="text-link">
          Work
        </TransitionLink>
        <span className="slash">/</span>
        <TransitionLink href="/guestbook" className="text-link">
          Guestbook
        </TransitionLink>
        <span className="slash">/</span>
        <TransitionLink href="/studio" className="text-link">
          Desk
        </TransitionLink>
      </p>
    </article>
  );
}
