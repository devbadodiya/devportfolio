"use client";

import { useEffect, useState } from "react";
import { pinnedGuestbook } from "@/lib/content";
import type { GuestbookEntry, GuestbookSnapshot } from "@/lib/guestbook";
import { TransitionLink } from "./links";

export function PinnedGuest() {
  const [note, setNote] = useState({ name: pinnedGuestbook.name, message: pinnedGuestbook.message });

  useEffect(() => {
    fetch("/api/guestbook")
      .then((response) => response.json())
      .then((data: GuestbookSnapshot) => {
        const entries = data.entries ?? [];
        const pinned = pinnedGuestbook.id
          ? entries.find((entry: GuestbookEntry) => entry.id === pinnedGuestbook.id)
          : null;
        const latest = entries.find((entry: GuestbookEntry) => entry.id !== "seed-dev") ?? entries[0];
        const pick = pinned ?? latest;
        if (pick?.name && pick?.message) {
          setNote({ name: pick.name, message: pick.message });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <figure className="pinned-guest">
      <blockquote>“{note.message}”</blockquote>
      <figcaption>
        <span>— {note.name}</span>
        <TransitionLink href="/guestbook">Guestbook</TransitionLink>
      </figcaption>
    </figure>
  );
}
