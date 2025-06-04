import { Metadata } from "next";
import { BrokersPageClient } from "@/components/brokers/BrokersPageClient";

export const metadata: Metadata = {
  title: "All Trading Brokers 2025 | Compare 110+ Top Brokers | BrokerAnalysis",
  description: "Compare 110+ top-rated trading brokers for Forex, Stocks, Crypto, Options, CFDs, and ETFs in 2025. Search and filter by regulation, spreads, platforms, and asset types. Find the perfect broker with our comprehensive comparison tools and expert reviews.",
  openGraph: {
    title: "All Trading Brokers 2025 | Compare 110+ Top Brokers | BrokerAnalysis",
    description: "Compare 110+ top-rated trading brokers for Forex, Stocks, Crypto, Options, CFDs, and ETFs in 2025. Search and filter by regulation, spreads, platforms, and asset types.",
    type: "website",
    url: "/brokers",
    images: [
      {
        url: "/images/og-brokers-listing.png",
        width: 1200,
        height: 630,
        alt: "Compare 110+ Trading Brokers - BrokerAnalysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Trading Brokers 2025 | Compare 110+ Top Brokers",
    description: "Compare 110+ top-rated trading brokers for Forex, Stocks, Crypto, Options, CFDs, and ETFs in 2025.",
  },
  keywords: [
    "forex brokers 2025",
    "broker comparison",
    "regulated brokers",
    "FCA brokers",
    "ASIC brokers",
    "CySEC brokers",
    "trading platforms",
    "MetaTrader brokers",
    "low spread brokers",
    "crypto brokers",
    "stock brokers",
    "CFD brokers",
    "broker reviews",
    "best forex brokers",
    "trading fees comparison",
    "minimum deposit brokers"
  ],
  alternates: {
    canonical: "/brokers",
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
};

// Structured data for broker listings
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "All Trading Brokers 2025 - Compare 110+ Top Brokers",
  "description": "Comprehensive listing of 110+ top-rated trading brokers for Forex, Stocks, Crypto, Options, CFDs, and ETFs with detailed comparisons, reviews, and filtering options.",
  "url": "https://brokeranalysis.com/brokers",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Trading Brokers Directory",
    "description": "Complete directory of top-rated trading brokers for all asset classes",
    "numberOfItems": "110+",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Regulated Forex Brokers",
        "description": "FCA, ASIC, CySEC regulated brokers"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Low Spread Brokers",
        "description": "Brokers offering competitive spreads"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Multi-Asset Brokers",
        "description": "Brokers offering forex, stocks, crypto, and more"
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://brokeranalysis.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "All Brokers",
        "item": "https://brokeranalysis.com/brokers"
      }
    ]
  }
};

export default function BrokersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BrokersPageClient />
    </>
  );
}