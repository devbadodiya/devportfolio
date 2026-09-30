import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { now } from "@/lib/content";

export const metadata: Metadata = socialMeta({
  title: "Now",
  kicker: "Personal",
  description: "What the calendar actually contains this month.",
});

export default function NowPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Personal"
        title="Now"
        meta={`Updated ${now.updated}`}
        lede="What the calendar actually contains. A short page, on purpose."
      />
      <div className="prose">
        {now.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
