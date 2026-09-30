"use client";

import { essays, profile } from "@/lib/content";
import { WorkPreview } from "./work-preview";
import { NowPlayingBlock } from "./now-playing";
import { TextLink, TransitionLink } from "./links";

export function HomeView() {
  return (
    <div className="page">
      <div className="bio">
        <p>
          Most days I live in my own head. I like being alone. I am kinder than I look online, and quieter than the title{" "}
          <TextLink href={profile.companyUrl}>Cosverse AI</TextLink> suggests. I am not sure I am a good founder. I am sure I keep
          showing up and building anyway.
        </p>
        <p>
          When I am not building, I disappear into the sky and into nature. I like travel — the quiet kind, where the road is
          longer than the plan. There is something about an open sky and nowhere I have to be that makes the phone stop mattering
          for a while.
        </p>
        <p>
          I write things down when they feel worth keeping, here and on{" "}
          <TextLink href="https://devbadodiya.medium.com/">Medium</TextLink>. What I am doing this month is on the{" "}
          <TextLink href="/now">now</TextLink> page.
        </p>
        <p>
          I am based in Madhya Pradesh. If you want to talk, <TextLink href={`mailto:${profile.email}`}>say hello</TextLink>. Or
          find me on <TextLink href="https://github.com/devbadodiya">GitHub</TextLink>,{" "}
          <TextLink href="https://www.linkedin.com/in/devbadodiya">LinkedIn</TextLink>, and{" "}
          <TextLink href="https://peerlist.io/devbadodiya">Peerlist</TextLink>.
        </p>
      </div>

      <p className="label">Work</p>
      <WorkPreview />

      <p className="label">Listening</p>
      <NowPlayingBlock showHeading={false} />

      <p className="label">Writing</p>
      {essays.map((essay) => (
        <TransitionLink key={essay.slug} href={`/writing/${essay.slug}`} className="witem">
          <span>{essay.title}</span>
        </TransitionLink>
      ))}
      <TransitionLink href="/writing" className="more-link">
        View all →
      </TransitionLink>
    </div>
  );
}
