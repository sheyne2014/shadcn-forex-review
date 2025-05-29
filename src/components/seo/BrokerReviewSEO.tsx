"use client";

import { useEffect } from 'react';
import { SEOAudit } from '../SEOAudit';
import { StructuredData } from '../StructuredData';
import { siteConfig } from '@/config/site';

interface BrokerReviewSEOProps {
  broker: {
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
  };
}

export function BrokerReviewSEO({ broker }: BrokerReviewSEOProps) {
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

      {/* SEO Audit Component */}
      <div className="mt-8">
        <SEOAudit 
          pageUrl={canonicalUrl}
          pageTitle={`${broker.name} Review ${new Date().getFullYear()} - Full Broker Analysis`}
          pageDescription={broker.description}
          showFullAudit={true}
        />
      </div>
    </>
  );
}
