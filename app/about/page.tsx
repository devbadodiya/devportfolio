import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { TextLink } from "@/components/links";
import { about, listening, profile, timeline, uses } from "@/lib/content";

export const metadata: Metadata = socialMeta({
  title: "About",
  kicker: "Personal",
  description: "Who Dev is, what he uses, and the rooms that made the work.",
});

export default function AboutPage() {
  return (
    <article className="page">
      <PageHeader kicker="Personal" title="About" lede="Who, what, and the rooms that made the work." />
      <div className="prose">
        <h2>Who I am</h2>
        <p>{about.who}</p>
        <h2>What I care about</h2>
        <p>{about.care}</p>
        <p>{about.outside}</p>
        <h2>Where to find me</h2>
        <p>
          I am most reachable by <TextLink href={`mailto:${profile.email}`}>email</TextLink>. The public trail is on{" "}
          <TextLink href="https://github.com/devbadodiya">GitHub</TextLink>,{" "}
          <TextLink href="https://www.linkedin.com/in/devbadodiya">LinkedIn</TextLink>, and{" "}
          <TextLink href="https://peerlist.io/devbadodiya">Peerlist</TextLink>. The product is{" "}
          <TextLink href={profile.companyUrl}>{profile.company}</TextLink>.
        </p>
      </div>
      <div className="section-head">
        <h2>Uses</h2>
      </div>
      <p className="quiet">What is on the desk most days. Not a sponsored list — just the tools that stayed.</p>
      {uses.map((group) => (
        <section key={group.group} className="craft-block">
          <h2>{group.group}</h2>
          {group.items.map((item) => (
            <a
              key={item.name}
              className="like-row"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{item.name}</strong>
              <span>{item.note}</span>
              <span>↗</span>
            </a>
          ))}
        </section>
      ))}
      <section className="craft-block listening-block">
        <h2>Song of the week</h2>
        <p className="quiet">Updated {listening.updated}. Playing on Apple Music.</p>
        <a className="listening-card" href={listening.href} target="_blank" rel="noopener noreferrer">
          <div>
            <strong>{listening.title}</strong>
            <span className="listening-meta">
              {listening.artist}
              {listening.album ? ` · ${listening.album}` : ""}
            </span>
            <span className="listening-note">{listening.note}</span>
          </div>
          <span className="listening-open">Apple Music ↗</span>
        </a>
        {listening.embed ? (
          <iframe
            className="listening-embed"
            title={`${listening.title} on Apple Music`}
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={listening.embed}
          />
        ) : null}
      </section>
      <div className="section-head">
        <h2>Timeline</h2>
      </div>
      <ol className="timeline">
        {timeline.map((item) => (
          <li key={item.when + item.title}>
            <div className="when">{item.when}</div>
            <div>
              <h3>{item.title}</h3>
              <p className="place">{item.place}</p>
              <p>{item.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
