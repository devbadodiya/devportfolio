"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { GuestbookEntry, GuestbookSnapshot } from "@/lib/guestbook";

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function GuestbookBoard() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((response) => response.json())
      .then((data: GuestbookSnapshot) => {
        setEntries(data.entries ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = (await response.json()) as GuestbookSnapshot & { error?: string };
      if (!response.ok) {
        setError(data.error || "Could not post. Try again.");
        return;
      }
      setEntries(data.entries ?? []);
      setMessage("");
    } catch {
      setError("Could not post. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="guestbook">
      <form className="guest-form" onSubmit={submit}>
        <label className="guest-field">
          <span>Name</span>
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            autoComplete="nickname"
            required
            placeholder="Your name"
          />
        </label>
        <label className="guest-field">
          <span>Note</span>
          <textarea
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={280}
            rows={3}
            required
            placeholder="Something short. A hello is enough."
          />
        </label>
        <div className="guest-actions">
          <button type="submit" disabled={pending}>
            {pending ? "Signing…" : "Sign guestbook"}
          </button>
          <span className="quiet">{message.length}/280</span>
        </div>
        {error ? <p className="guest-error">{error}</p> : null}
      </form>

      <div className="guest-list">
        {!loaded ? <p className="quiet">Loading notes…</p> : null}
        {loaded && entries.length === 0 ? <p className="quiet">No notes yet. Be the first.</p> : null}
        {entries.map((entry) => (
          <article key={entry.id} className="guest-entry">
            <header>
              <strong>{entry.name}</strong>
              <time dateTime={entry.at}>{formatWhen(entry.at)}</time>
            </header>
            <p>{entry.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
