import { Metadata } from "next";
import { getBrokerSeo } from "./seo-utils";

export interface BrokerMetadataData {
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo_url: string;
  overall_rating: number;
  published_date?: string;
  last_updated?: string;
  faqs?: Array<{ question: string; answer: string }>;
  address?: {
    country: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
  offers?: {
    minDeposit: number;
  };
  // Additional fields that might be needed
  regulations?: string;
  min_deposit?: number;
  max_leverage?: string | number;
  trading_platforms?: string;
  spreads_from?: string | number;
  country?: string;
}

/**
 * Generate metadata for broker pages
 * This is a server-side function that should be used in server components
 */
export function generateBrokerMetadata(broker: BrokerMetadataData): Metadata {
  const seoData = getBrokerSeo(broker);
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: seoData.openGraph,
    alternates: {
      canonical: seoData.canonical,
    },
  };
}