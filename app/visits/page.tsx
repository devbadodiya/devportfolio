import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { VisitsBoard } from "@/components/visits-board";

export const metadata: Metadata = socialMeta({
  title: "Visits",
  kicker: "Signal",
  description: "A live map of who has been here.",
});

export default function VisitsPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Signal"
        title="Visits"
        lede="A live map of where this running server has actually been opened. It forgets everything when the process stops, and it never keeps an IP address."
      />
      <VisitsBoard />
    </article>
  );
}
