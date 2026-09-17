import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://useautocare.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "AutoCare",
  title: {
    default: "AutoCare | Auto Repair & Car Care",
    template: "%s | AutoCare",
  },
  description:
    "Book trusted auto repair, diagnostics, maintenance, brake service, suspension repair, and car care appointments with AutoCare.",
  keywords: [
    "auto repair",
    "car care",
    "vehicle diagnostics",
    "engine repair",
    "brake repair",
    "suspension repair",
    "AutoCare",
  ],
  authors: [{ name: "AutoCare" }],
  creator: "AutoCare",
  publisher: "AutoCare",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "AutoCare | Auto Repair & Car Care",
    description:
      "Schedule trusted vehicle repair and maintenance services with AutoCare.",
    url: "/",
    siteName: "AutoCare",
    images: [
      {
        url: "/images/opengragh-image.png",
        width: 1200,
        height: 630,
        alt: "AutoCare hero section preview with a red performance car",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoCare | Auto Repair & Car Care",
    description:
      "Reliable auto repair, diagnostics, maintenance, and car care appointment booking.",
    images: ["/images/opengragh-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "automotive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
