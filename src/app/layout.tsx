import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import NextTopLoader from "nextjs-toploader";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { Toaster } from "@/components/ui/sonner";
import { RokuAIWrapper } from "@/components/RokuAIWrapper";

import "./globals.css";
import { siteConfig } from "@/config/site";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "forex",
    "forex brokers",
    "trading",
    "cryptocurrency",
    "stocks",
    "review",
    "broker comparison",
    "forex trading",
    "best brokers",
    "trading platform",
    "forex broker comparison",
    "forex market analysis",
    "forex trading tools",
    "forex education"
  ],
  authors: [
    {
      name: "BrokerAnalysis",
      url: "https://broker-analysis.com",
    },
  ],
  creator: "BrokerAnalysis",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@brokeranalysis",
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': `${siteConfig.url}/en-US`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        {/* Font preloading handled by Next.js */}
        <link
          rel="preconnect"
          href="https://logo.clearbit.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://ui-avatars.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${figtree.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme-preference"
        >
          <AuthProvider>
            <NextTopLoader showSpinner={false} />
            <Header />
            <main className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
            <RokuAIWrapper />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
