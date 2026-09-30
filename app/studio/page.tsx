import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { Studio } from "@/components/studio";

export const metadata: Metadata = socialMeta({
  title: "Desk",
  kicker: "Guide",
  description: "Ask this site. Answers come from the pages.",
});

export default function StudioPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Guide"
        title="Desk"
        lede="A tiny guide for this website. It searches the pages you are already on. It does not pretend to be the open web."
      />
      <Suspense>
        <Studio />
      </Suspense>
    </article>
  );
}
