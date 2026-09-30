"use client";

import { useEffect, useRef, useState } from "react";
import { frames, type Frame } from "@/lib/content";

function Motif({ kind }: { kind: Frame["motif"] }) {
  if (kind === "chat") {
    return (
      <svg className="motif" viewBox="0 0 320 140" aria-hidden="true">
        <rect x="16" y="28" width="180" height="36" rx="8" fill="rgba(255,255,255,0.14)" />
        <rect x="90" y="76" width="210" height="36" rx="8" fill="rgba(255,255,255,0.28)" />
      </svg>
    );
  }
  if (kind === "leaf") {
    return (
      <svg className="motif" viewBox="0 0 320 140" aria-hidden="true">
        <path d="M160 120 C160 60 110 30 70 28 C120 50 140 80 160 120 Z" fill="rgba(255,255,255,0.2)" />
        <path d="M160 120 C160 60 210 30 250 28 C200 50 180 80 160 120 Z" fill="rgba(255,255,255,0.34)" />
      </svg>
    );
  }
  if (kind === "road") {
    return (
      <svg className="motif" viewBox="0 0 320 140" aria-hidden="true">
        <path d="M40 120 L130 20 H190 L280 120 Z" fill="rgba(255,255,255,0.12)" />
        <circle cx="150" cy="62" r="16" fill="none" stroke="rgba(255,255,255,0.7)" />
        <rect x="138" y="92" width="44" height="16" fill="rgba(255,255,255,0.3)" />
      </svg>
    );
  }
  if (kind === "ledger") {
    return (
      <svg className="motif" viewBox="0 0 320 140" aria-hidden="true">
        {[0, 1, 2, 3].map((row) => (
          <rect key={row} x="30" y={24 + row * 26} width={180 - row * 24} height="10" fill="rgba(255,255,255,0.28)" />
        ))}
      </svg>
    );
  }
  if (kind === "sky") {
    return (
      <svg className="motif" viewBox="0 0 320 140" aria-hidden="true">
        <path d="M40 90 H280 L250 70 H70 Z" fill="rgba(255,255,255,0.16)" />
        <circle cx="230" cy="42" r="14" fill="rgba(255,255,255,0.4)" />
      </svg>
    );
  }
  return (
    <svg className="motif" viewBox="0 0 320 140" aria-hidden="true">
      <text x="24" y="88" fill="rgba(255,255,255,0.85)" fontSize="42" fontFamily="Georgia, serif">
        Aa
      </text>
    </svg>
  );
}

export function Frames() {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frame = open == null ? null : frames[open];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open == null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (open == null) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setOpen((index) => (index == null ? index : (index + 1) % frames.length));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setOpen((index) => (index == null ? index : (index - 1 + frames.length) % frames.length));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="frame-grid">
        {frames.map((item, index) => (
          <button key={item.id} className="frame-card" data-tall={item.tall ? "true" : "false"} type="button" onClick={() => setOpen(index)}>
            <div className="frame-visual" style={{ background: `linear-gradient(160deg, ${item.from}, ${item.to})` }}>
              <Motif kind={item.motif} />
              <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "0.68rem" }}>
                0{index + 1}
              </span>
            </div>
            <span className="cap">
              <strong>{item.title}</strong>
              {item.caption}
            </span>
          </button>
        ))}
      </div>
      <dialog ref={dialogRef} className="lightbox" onClose={() => setOpen(null)}>
        {frame ? (
          <>
            <header>
              <strong>
                {frame.title} · {String((open ?? 0) + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
              </strong>
              <button className="icon-btn" type="button" onClick={() => dialogRef.current?.close()}>
                Close
              </button>
            </header>
            <figure>
              <div className="lb-visual" style={{ background: `linear-gradient(160deg, ${frame.from}, ${frame.to})` }}>
                <Motif kind={frame.motif} />
                <span>{frame.caption}</span>
              </div>
            </figure>
            <footer>
              <button className="icon-btn" type="button" onClick={() => setOpen((index) => (index == null ? 0 : (index - 1 + frames.length) % frames.length))}>
                Previous
              </button>
              <button className="icon-btn" type="button" onClick={() => setOpen((index) => (index == null ? 0 : (index + 1) % frames.length))}>
                Next
              </button>
            </footer>
          </>
        ) : null}
      </dialog>
    </>
  );
}
