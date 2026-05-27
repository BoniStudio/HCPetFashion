import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Header } from "@/components/layout/Header";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { Providers } from "./providers";
import "@/styles/globals.css";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const title = "HC Pet Fashion — Luxury Pet Rainwear & Boutique Companion Wear";
const description =
  "Curated pet rainwear, limited boutique pieces, and custom sizing inquiries for stylish companions.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — HC Pet Fashion",
  },
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "HC Pet Fashion",
    title,
    description,
    images: [
      {
        url: "/brand/logo.png",
        width: 512,
        height: 512,
        alt: "HC Pet Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/logo.png"],
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className="font-sans cyber-bg grain-overlay">
        <OrganizationJsonLd />
        <Providers>
          <IntroLoader />
          <GrainOverlay />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
