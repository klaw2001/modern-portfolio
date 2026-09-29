import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap"
});

// Icons, the Open Graph image and the manifest come from the file
// conventions in app/ (favicon.ico, icon.svg, apple-icon.png,
// opengraph-image.png, manifest.ts).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Hrishikesh Netke",
    "full stack developer",
    "software developer Mumbai",
    "freelance web developer India",
    "Next.js developer",
    "React developer",
    "AI product developer",
    "automation",
    "SaaS development"
  ],
  category: "technology",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: site.title,
    description: site.description
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: site.twitter
  },
  robots: {
    index: true,
    follow: true
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
};

export const viewport: Viewport = {
  themeColor: "#171717",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
