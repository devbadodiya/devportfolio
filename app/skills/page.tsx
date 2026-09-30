import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { Principles } from "@/components/principles";
import { craft } from "@/lib/content";

export const metadata: Metadata = socialMeta({
  title: "Skills",
  kicker: "Craft",
  description: "What Dev uses and the briefs behind the practice.",
});

export default function SkillsPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Craft"
        title="Skills"
        lede="What I actually use, and five briefs you can hand to an agent. These are working rules, not a costume of someone else's taste."
      />
      {craft.map((group) => (
        <section key={group.group} className="craft-block">
          <h2>{group.group}</h2>
          {group.items.map((item) => (
            <div key={item.name} className="skill-row">
              <strong>{item.name}</strong>
              <p>{item.detail}</p>
              <span>{item.where}</span>
            </div>
          ))}
        </section>
      ))}
      <section className="craft-block">
        <h2>Briefs</h2>
        <p className="quiet">Copy one into an agent when you want the decision to sound like this practice.</p>
        <Principles />
      </section>
    </article>
  );
}
