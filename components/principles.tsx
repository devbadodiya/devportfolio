"use client";

import { useState } from "react";
import { principles } from "@/lib/content";

export function Principles() {
  const [copied, setCopied] = useState("");

  async function copy(slug: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(slug);
      window.setTimeout(() => setCopied(""), 1400);
    } catch {
      setCopied("failed");
    }
  }

  return (
    <div>
      {principles.map((principle) => (
        <article key={principle.slug} className="principle">
          <div>
            <h3>{principle.title}</h3>
            <p>{principle.summary}</p>
          </div>
          <button className="copy" type="button" onClick={() => copy(principle.slug, principle.brief)}>
            {copied === principle.slug ? "Copied" : copied === "failed" ? "Copy blocked" : "Copy brief"}
          </button>
        </article>
      ))}
    </div>
  );
}
