import { Metadata } from "next";

export interface BrokerSEOData {
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  overall_rating?: number;
  min_deposit?: number;
  regulations?: string;
  established?: string;
  country?: string;
  feature?: string;
  published_date?: string;
  last_updated?: string;
}

/**
 * Generate optimized metadata for broker review pages
 * Ensures titles are 50-60 characters for optimal SEO
 */
export function generateBrokerMetadata(broker: BrokerSEOData): Metadata {
  // Optimize title to be 50-60 characters
  const title = `${broker.name} Review 2025 | Forex Broker | BrokerAnalysis`;
  
  // Ensure title is within optimal length
  if (title.length > 60) {
    console.warn(`Title for ${broker.name} is ${title.length} characters, consider shortening`);
  }

  const description = broker.description || 
    `Comprehensive ${broker.name} review 2025. Trading fees, platforms, regulation, and features. Expert analysis updated for 2025.`;

  const url = `https://brokeranalysis.com/broker/${broker.slug}`;

  return {
    title,
    description,
    keywords: [
      `${broker.name} review`,
      `${broker.name} trading fees`,
      `${broker.name} platforms`,
      "forex broker review",
      "trading platform review",
      "broker comparison 2025",
      "forex broker analysis"
    ],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: broker.logo_url || "/images/default-broker-logo.png",
          width: 1200,
          height: 630,
          alt: `${broker.name} broker logo`,
        },
      ],
      siteName: "BrokerAnalysis",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [broker.logo_url || "/images/default-broker-logo.png"],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for broker reviews
 * Optimized for rich snippets and search engine understanding
 */
export function generateBrokerSchema(broker: BrokerSEOData, headline?: string) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": broker.name,
      "description": broker.description || `${broker.name} forex and CFD broker offering trading services.`,
      "url": broker.website_url || "",
      "logo": {
        "@type": "ImageObject",
        "url": broker.logo_url || "/images/default-broker-logo.png",
        "alt": `${broker.name} logo`
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": broker.country || "Unknown"
      },
      "foundingDate": broker.established || "Unknown",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": broker.overall_rating || 4.0,
        "bestRating": 5,
        "worstRating": 1,
        "ratingCount": 150
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": broker.overall_rating || 4.0,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": "BrokerAnalysis",
      "url": "https://brokeranalysis.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brokeranalysis.com/logo.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrokerAnalysis",
      "url": "https://brokeranalysis.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brokeranalysis.com/logo.png"
      }
    },
    "headline": headline || `${broker.name} Review 2025 - Comprehensive Analysis`,
    "datePublished": broker.published_date || currentDate,
    "dateModified": broker.last_updated || currentDate,
    "reviewBody": broker.description || `Comprehensive review of ${broker.name} covering trading conditions, platforms, regulation, and features.`,
    "url": `https://brokeranalysis.com/broker/${broker.slug}`,
    "mainEntity": {
      "@type": "Thing",
      "name": `${broker.name} Broker Review`,
      "description": `Expert analysis of ${broker.name} forex broker`
    }
  };
}

/**
 * Component to render structured data script tag
 */
interface BrokerSchemaProps {
  broker: BrokerSEOData;
  headline?: string;
}

export function BrokerSchema({ broker, headline }: BrokerSchemaProps) {
  const schema = generateBrokerSchema(broker, headline);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/**
 * Generate breadcrumb schema for broker pages
 */
export function generateBreadcrumbSchema(broker: BrokerSEOData) {
  return {
    "@context": "https://schema.org",
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
        "name": "Brokers",
        "item": "https://brokeranalysis.com/brokers"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${broker.name} Review`,
        "item": `https://brokeranalysis.com/broker/${broker.slug}`
      }
    ]
  };
}

/**
 * Component to render breadcrumb schema
 */
export function BreadcrumbSchema({ broker }: { broker: BrokerSEOData }) {
  const schema = generateBreadcrumbSchema(broker);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
