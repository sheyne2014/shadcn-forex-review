import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import NextTopLoader from "nextjs-toploader";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/SkipToContent";

import { Toaster } from "@/components/ui/sonner";
import { RokuAIWrapper } from "@/components/RokuAIWrapper";

import "./globals.css";
import { siteConfig } from "@/config/site";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

// Get environment variables or use fallback values
const googleVerificationToken = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'G-VERIFICATION123';
const yandexVerificationToken = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'YANDEX-VERIFICATION123';
const bingVerificationToken = process.env.NEXT_PUBLIC_BING_VERIFICATION || 'BING-VERIFICATION123';

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
    "forex education",
    "crypto brokers",
    "stock trading",
    "CFD trading",
    "day trading",
    "trading accounts"
  ],
  authors: [
    {
      name: "BrokerAnalysis",
      url: siteConfig.url,
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
        url: '/images/og-image.jpg',
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
    images: ['/images/og-image.jpg'],
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
    google: googleVerificationToken,
    yandex: yandexVerificationToken,
  },
  other: {
    'google-site-verification': googleVerificationToken,
    'msvalidate.01': bingVerificationToken,
    'yandex-verification': yandexVerificationToken,
    'author': 'BrokerAnalysis Team',
    'format-detection': 'telephone=no',
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
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={`${figtree.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="theme-preference"
        >
          <AuthProvider>
            <SkipToContent />
            <NextTopLoader showSpinner={false} />
            <Header />
            <main id="main-content" className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
            <RokuAIWrapper />
            <SpeedInsights />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
