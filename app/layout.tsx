import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Hrishikesh Netke | Systems in Motion",
  description:
    "Hrishikesh Netke is a software developer in Mumbai, India, building full stack products end to end.",
  metadataBase: new URL("https://hrishikeshnetke.in"),
  openGraph: {
    title: "Hrishikesh Netke | Systems in Motion",
    description:
      "Full stack products, AI systems, automation platforms, and digital tools built for production.",
    type: "website"
  }
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
