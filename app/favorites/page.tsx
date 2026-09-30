import type { Metadata } from "next";
import { socialMeta } from "@/lib/og";
import { PageHeader } from "@/components/page-header";
import { FavoritesPreview } from "@/components/favorites-preview";

export const metadata: Metadata = socialMeta({
  title: "Favorites",
  kicker: "Collection",
  description: "Products, shows, films, and tools that stuck.",
});

export default function FavoritesPage() {
  return (
    <article className="page">
      <PageHeader
        kicker="Collection"
        title="Favorites"
        lede="Things that stuck with me — products, shows, films. A short list for now. More later."
      />
      <FavoritesPreview />
    </article>
  );
}
