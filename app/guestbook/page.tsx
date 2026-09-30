import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { GuestbookBoard } from "@/components/guestbook-board";

export const metadata: Metadata = socialMeta({
  title: "Guestbook",
  kicker: "Visitors",
  description: "A short public note. No account needed.",
});

export default function GuestbookPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Visitors"
        title="Guestbook"
        lede="A short public note. No account. Keep it kind — this is a desk, not a comment section."
      />
      <GuestbookBoard />
    </article>
  );
}
