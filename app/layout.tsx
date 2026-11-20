import type { Metadata } from "next";
import localFont from "next/font/local";
import { description, site } from "@/lib/content";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

// Preview origin resolves sharing assets without claiming a production canonical.
const metadataOrigin = site.canonicalUrl || process.env.SITE_PREVIEW_URL;

export const metadata: Metadata = {
  title: `${site.fullBrandName} — A growth studio for startups`,
  description,
  ...(metadataOrigin ? { metadataBase: new URL(metadataOrigin) } : {}),
  ...(site.canonicalUrl
    ? {
        alternates: { canonical: site.canonicalUrl },
      }
    : {}),
  openGraph: {
    title: site.fullBrandName,
    description,
    type: "website",
    locale: "en_US",
    siteName: site.fullBrandName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.fullBrandName,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
