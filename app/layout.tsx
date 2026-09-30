import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import { Chrome } from "@/components/chrome";
import { siteUrl, socialMeta } from "@/lib/og";
import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-sans",
});

const description =
  "Dev Badodiya is a founding member at Cosverse AI. Work, notes, a live visit signal, and a guide that answers from the site.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...socialMeta({
    title: "Dev Badodiya",
    kicker: "Cosverse AI",
    description,
  }),
  title: {
    default: "Dev Badodiya",
    template: "%s — Dev Badodiya",
  },
  description,
  applicationName: "Dev Badodiya",
  authors: [{ name: "Dev Badodiya" }],
};

const themeBoot = `try{var t=localStorage.getItem("theme");var dark=t!=="light";var root=document.documentElement;root.classList.toggle("dark",dark);root.dataset.theme=dark?"dark":"light";}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={sans.variable}>
        <Script id="theme-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
