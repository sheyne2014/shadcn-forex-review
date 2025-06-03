"use client";

import { useEffect } from 'react';
import { StructuredData } from '../StructuredData';
import { siteConfig } from '@/config/site';
import { generateBrokerSchema, generateBreadcrumbSchema } from '@/lib/seo-utils';

export interface BrokerSEOData {
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo_url: string;
  overall_rating: number;
  published_date: string;
  last_updated: string;
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

export function BrokerReviewSEO({ broker }: { broker: BrokerSEOData }) {
  const canonicalUrl = `${siteConfig.url}/brokers/${broker.slug}`;

  useEffect(() => {
    // Verify canonical URL is set
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

    // Set meta robots tag
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'index, follow';
      document.head.appendChild(meta);
    }
  }, [canonicalUrl]);

  return (
    <>
      {/* Broker Review Schema */}
      <StructuredData 
        type="brokerReview"
        data={{
          brokerName: broker.name,
          description: broker.description,
          brokerUrl: broker.website_url,
          logo: broker.logo_url,
          rating: broker.overall_rating,
          datePublished: broker.published_date,
          dateModified: broker.last_updated,
          address: broker.address,
          aggregateRating: broker.aggregateRating,
          offers: broker.offers
        }}
      />

      {/* FAQ Schema if FAQs exist */}
      {broker.faqs && broker.faqs.length > 0 && (
        <StructuredData
          type="faq"
          data={{
            questions: broker.faqs
          }}
        />
      )}

      {/* Breadcrumb Schema */}
      <StructuredData
        type="breadcrumb"
        data={{
          items: [
            { name: 'Home', url: siteConfig.url },
            { name: 'Brokers', url: `${siteConfig.url}/brokers` },
            { name: broker.name, url: canonicalUrl }
          ]
        }}
      />
    </>
  );
}

// Additional components needed by EnhancedBrokerPageTemplate
export function BrokerSchema({ broker, headline }: { broker: BrokerSEOData; headline?: string }) {
  return (
    <StructuredData 
      type="brokerReview"
      data={{
        brokerName: broker.name,
        description: broker.description,
        brokerUrl: broker.website_url,
        logo: broker.logo_url,
        rating: broker.overall_rating,
        datePublished: broker.published_date,
        dateModified: broker.last_updated,
        address: broker.address,
        aggregateRating: broker.aggregateRating,
        offers: broker.offers,
        headline: headline
      }}
    />
  );
}

export function BreadcrumbSchema({ broker }: { broker: BrokerSEOData }) {
  const canonicalUrl = `${siteConfig.url}/brokers/${broker.slug}`;
  return (
    <StructuredData
      type="breadcrumb"
      data={{
        items: [
          { name: 'Home', url: siteConfig.url },
          { name: 'Brokers', url: `${siteConfig.url}/brokers` },
          { name: broker.name, url: canonicalUrl }
        ]
      }}
    />
  );
}

export function generateBrokerMetadata(broker: BrokerSEOData): Metadata {
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
