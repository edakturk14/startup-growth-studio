import type { Metadata } from "next";
import localFont from "next/font/local";
import { description, site } from "@/lib/content";
import "./globals.css";
import "./formwork.css";

const inter = localFont({
  src: "./fonts/Inter.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${site.fullBrandName} — A growth studio for startups`,
  description,
  ...(site.canonicalUrl
    ? {
        metadataBase: new URL(site.canonicalUrl),
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
