import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { likes, stack } from "@/lib/content";

export const metadata: Metadata = socialMeta({
  title: "Colophon",
  kicker: "Meta",
  description: "Stack, type, and how this site is put together.",
});

const swatches = [
  { name: "Ground", background: "var(--bg)", color: "var(--ink)" },
  { name: "Ink", background: "var(--ink)", color: "var(--bg)" },
  { name: "Accent", background: "var(--accent)", color: "var(--accent-ink)" },
  { name: "Paper", background: "var(--bg-elev)", color: "var(--ink)" },
  { name: "Signal", background: "var(--good)", color: "#102016" },
];

export default function ColophonPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Meta"
        title="Colophon"
        lede="What this site is built on, how it is set, and a few things I actually use."
      />
      <div className="prose">
        <h2>Built with</h2>
        <p>Next.js, React, and TypeScript. There is no CMS and no utility framework. The words live in one file, lib/content.ts, and the design lives in one stylesheet, so a sentence or a color can change without a hunt.</p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {stack.map((item) => (
          <a key={item.name} className="stack-row" href={item.href} target="_blank" rel="noreferrer">
            <strong>{item.name}</strong>
            <span>{item.note}</span>
            <span>↗</span>
          </a>
        ))}
      </div>
      <div className="prose">
        <h2>Design</h2>
        <p>
          One column. One typeface, Schibsted Grotesk. Dark by default, with a light switch in the nav. Links are underlined. Nothing else asks for attention.
        </p>
        <h2>Colors</h2>
      </div>
      <div className="swatches">
        {swatches.map((swatch) => (
          <div key={swatch.name} className="swatch" style={{ background: swatch.background, color: swatch.color }}>
            {swatch.name}
          </div>
        ))}
      </div>
      <div className="prose">
        <h2>This site, specifically</h2>
        <p>
          The front page is a bio, the work, and the notes. The rest — now, someday, skills, guestbook, visits, a small on-site guide — sits in the footer so the top stays quiet. Visits and guestbook notes live in a SQLite database (libSQL). Locally that is a file under data/; in production you can point it at a free Turso database. No IP address is stored with the public records.
        </p>
        <h2>Likes</h2>
      </div>
      <div>
        {likes.map((item) => (
          <a key={item.name} className="like-row" href={item.href} target="_blank" rel="noreferrer">
            <strong>{item.name}</strong>
            <span>{item.note}</span>
            <span>↗</span>
          </a>
        ))}
      </div>
      <div className="prose">
        <h2>Thanks</h2>
        <p>
          Schibsted Grotesk via Google Fonts. Next.js for the router. The personal-site habit of a narrow page that gets out of the way.
        </p>
      </div>
    </article>
  );
}
