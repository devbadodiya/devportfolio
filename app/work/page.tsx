import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = socialMeta({
  title: "Work",
  kicker: "Projects",
  description: "Products and archive from Dev Badodiya.",
});

export default function WorkPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Work"
        title="Projects"
        lede="Cosverse is the current build. The rest is the archive: vision, classical models, and pages that had to explain themselves."
      />
      <WorkIndex />
    </article>
  );
}
