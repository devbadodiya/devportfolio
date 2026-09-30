import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { TextLink, TransitionLink } from "@/components/links";
import { essays, getEssay, readingTime } from "@/lib/content";
import { socialMeta } from "@/lib/og";

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  return socialMeta({
    title: essay?.title ?? "Writing",
    kicker: "Notes",
    description: essay?.dek,
  });
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();
  const index = essays.findIndex((item) => item.slug === essay.slug);
  const next = essays[(index + 1) % essays.length];

  return (
    <>
      <ReadingProgress />
      <article className="page essay">
        <p className="kicker" style={{ paddingTop: "2.8rem" }}>
          Notes · {essay.date} · {readingTime(essay.paragraphs)} min
        </p>
        <h1>{essay.title}</h1>
        <p className="dek">{essay.dek}</p>
        <div className="body">
          {essay.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="quiet" style={{ marginTop: "2rem" }}>
          More platform writing lives on <TextLink href="https://devbadodiya.medium.com/">Medium</TextLink>.
        </p>
        <div className="pager">
          <TransitionLink href="/writing">
            <small>All notes</small>
            Index
          </TransitionLink>
          <TransitionLink href={`/writing/${next.slug}`}>
            <small>Next</small>
            {next.title}
          </TransitionLink>
        </div>
      </article>
    </>
  );
}
