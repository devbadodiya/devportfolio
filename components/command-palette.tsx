"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/lib/content";
import { goTo } from "./links";

export type PaletteItem = {
  id: string;
  title: string;
  hint?: string;
  href?: string;
  keywords?: string;
  action?: () => void;
};

const pages: PaletteItem[] = [
  { id: "home", title: "Home", href: "/", hint: "Index", keywords: "index start" },
  { id: "about", title: "About", href: "/about", hint: "Who, uses, timeline", keywords: "bio uses tools" },
  { id: "work", title: "Work", href: "/work", hint: "Projects", keywords: "cosverse projects" },
  { id: "favorites", title: "Favorites", href: "/favorites", hint: "Things I keep", keywords: "likes" },
  { id: "photos", title: "Photos", href: "/photos", hint: "Frames", keywords: "images" },
  { id: "writing", title: "Writing", href: "/writing", hint: "Notes", keywords: "essays blog" },
  { id: "guestbook", title: "Guestbook", href: "/guestbook", hint: "Leave a note", keywords: "sign guest" },
  { id: "desk", title: "Desk", href: "/studio", hint: "Ask this site", keywords: "studio guide ask" },
  { id: "now", title: "Now", href: "/now", hint: "This month", keywords: "current" },
  { id: "someday", title: "Someday", href: "/someday", hint: "Longer goals", keywords: "future" },
  { id: "skills", title: "Skills", href: "/skills", hint: "Craft", keywords: "principles" },
  { id: "visits", title: "Visits", href: "/visits", hint: "Live map", keywords: "analytics traffic" },
  { id: "colophon", title: "Colophon", href: "/colophon", hint: "Stack and type", keywords: "credits fonts" },
];

function matchItem(item: PaletteItem, query: string) {
  if (!query) return true;
  const hay = `${item.title} ${item.hint ?? ""} ${item.keywords ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((part) => hay.includes(part));
}

export function CommandPalette({
  open,
  onClose,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo(() => {
    const extras: PaletteItem[] = [
      {
        id: "theme",
        title: "Toggle theme",
        hint: "Light / dark",
        keywords: "dark light mode appearance",
        action: onToggleTheme,
      },
      {
        id: "email",
        title: "Email Dev",
        hint: profile.email,
        keywords: "mail contact hello",
        action: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
    ];
    return [...pages, ...extras].filter((item) => matchItem(item, query));
  }, [query, onToggleTheme]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 10);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function run(item: PaletteItem) {
    onClose();
    if (item.action) {
      item.action();
      return;
    }
    if (item.href) goTo(router, item.href);
  }

  if (!open) return null;

  return (
    <div
      className="palette-root"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((index) => Math.min(index + 1, Math.max(items.length - 1, 0)));
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((index) => Math.max(index - 1, 0));
          }
          if (event.key === "Enter") {
            event.preventDefault();
            const item = items[active];
            if (item) run(item);
          }
        }}
      >
        <input
          ref={inputRef}
          className="palette-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Jump to a page…"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={items[active] ? `${listId}-${items[active].id}` : undefined}
        />
        <ul id={listId} className="palette-list" role="listbox">
          {items.length === 0 ? (
            <li className="palette-empty">Nothing matches.</li>
          ) : (
            items.map((item, index) => (
              <li key={item.id} role="option" aria-selected={index === active} id={`${listId}-${item.id}`}>
                <button
                  type="button"
                  className={`palette-item${index === active ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => run(item)}
                >
                  <span className="palette-title">{item.title}</span>
                  {item.hint ? <span className="palette-hint">{item.hint}</span> : null}
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="palette-foot">
          <span>↑↓</span> move <span>↵</span> open <span>esc</span> close
        </p>
      </div>
    </div>
  );
}
