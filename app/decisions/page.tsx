import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { antiRoadmap, decisions } from "@/lib/content";

export const metadata: Metadata = socialMeta({
  title: "Decisions",
  kicker: "Practice",
  description: "What I will not build, and five calls I would still make — with the redo notes attached.",
});

export default function DecisionsPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Practice"
        title="Decisions"
        meta={`Updated ${antiRoadmap.updated}`}
        lede="Two lists. What I refuse, and what I already chose. Both are editable when the work teaches something new."
      />

      <section className="craft-block">
        <h2>Anti-roadmap</h2>
        <p className="quiet">{antiRoadmap.note}</p>
        <ul className="decision-list">
          {antiRoadmap.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="craft-block">
        <h2>Decision log</h2>
        <p className="quiet">Five calls. What I did, and what I would redo.</p>
        <ol className="decision-list decision-log">
          {decisions.map((item) => (
            <li key={item.title}>
              <div className="when">{item.when}</div>
              <div>
                <h3>{item.title}</h3>
                <p>
                  <span className="decision-label">Call</span> {item.call}
                </p>
                <p>
                  <span className="decision-label">Redo</span> {item.redo}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
