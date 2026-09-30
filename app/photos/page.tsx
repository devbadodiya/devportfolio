import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { Frames } from "@/components/frames";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = socialMeta({
  title: "Photos",
  kicker: "Frames",
  description: "Composed frames from the work.",
});

export default function PhotosPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Frames"
        title="Photos"
        lede="Composed frames for the work, not a camera roll. Open one. Arrow keys move through the set."
      />
      <Frames />
    </article>
  );
}
