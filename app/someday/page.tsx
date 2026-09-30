import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { someday } from "@/lib/content";

export const metadata: Metadata = socialMeta({
  title: "Someday",
  kicker: "Personal",
  description: "Long-term direction, not a promise.",
});

export default function SomedayPage() {
  return (
    <article className="page">
      <PageHeader kicker="Personal" title="Someday" meta={`Updated ${someday.updated}`} lede={someday.note} />
      <div className="prose">
        {someday.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
