import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { TextLink, TransitionLink } from "@/components/links";
import { getProject, projects } from "@/lib/content";
import { socialMeta } from "@/lib/og";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return socialMeta({
    title: project?.title ?? "Work",
    kicker: project ? `${project.kind} · ${project.year}` : "Projects",
    description: project?.summary,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="page">
      <PageHeader kicker={`${project.kind} · ${project.year}`} title={project.title} lede={project.lede} meta={project.role} />
      <div className="case-links">
        {project.links.map((link) => (
          <TextLink key={link.href} href={link.href}>
            {link.label}
          </TextLink>
        ))}
      </div>
      <div className="chips" aria-label="Stack">
        {project.stack.map((item) => (
          <span className="chip" key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="prose">
        <h2>What I did</h2>
        <ul className="points">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="pager">
        <TransitionLink href="/work">
          <small>All work</small>
          Index
        </TransitionLink>
        <TransitionLink href={`/work/${next.slug}`}>
          <small>Next</small>
          {next.title}
        </TransitionLink>
      </div>
    </article>
  );
}
