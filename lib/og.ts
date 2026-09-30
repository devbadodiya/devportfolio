import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devvv.online";

export function ogPath(title: string, kicker = "Dev Badodiya") {
  const params = new URLSearchParams({
    title,
    kicker,
  });
  return `/og?${params.toString()}`;
}

export function socialMeta({
  title,
  description,
  kicker = "Dev Badodiya",
}: {
  title: string;
  description?: string;
  kicker?: string;
}): Metadata {
  const image = ogPath(title, kicker);
  const fullTitle = title === "Dev Badodiya" ? title : `${title} — Dev Badodiya`;
  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: siteUrl,
      siteName: "Dev Badodiya",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
