import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { TransitionLink } from "@/components/links";
import { essays } from "@/lib/content";

export const metadata: Metadata = socialMeta({
  title: "Writing",
  kicker: "Notes",
  description: "Short notes on products, models, and finishing.",
});

export default function WritingPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Notes"
        title="Writing"
        lede="Short pieces that live with the work. Longer platform notes also sit on Medium."
      />
      <div>
        {essays.map((essay) => (
          <TransitionLink key={essay.slug} href={`/writing/${essay.slug}`} className="writing-row">
            <span>
              <h2>{essay.title}</h2>
              <p>{essay.dek}</p>
            </span>
          </TransitionLink>
        ))}
      </div>
    </article>
  );
}
