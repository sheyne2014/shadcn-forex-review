"use client";

import { siteConfig } from "@/config/site";

interface StructuredDataProps {
  type: 'website' | 'article' | 'product' | 'faq' | 'organization' | 'brokerReview' | 'breadcrumb' | 'aggregateRating';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {};

  switch (type) {
    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };
      break;

    case 'article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        author: {
          '@type': 'Person',
          name: data.author
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        }
      };
      break;

    case 'brokerReview':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
          '@type': 'FinancialService',
          name: data.brokerName,
          description: data.description,
          url: data.brokerUrl,
          logo: data.logo,
          address: data.address ? {
            '@type': 'PostalAddress',
            addressCountry: data.address.country
          } : undefined,
          aggregateRating: data.aggregateRating ? {
            '@type': 'AggregateRating',
            ratingValue: data.aggregateRating.ratingValue,
            bestRating: '5',
            worstRating: '1',
            ratingCount: data.aggregateRating.ratingCount
          } : undefined,
          offers: data.offers ? {
            '@type': 'Offer',
            name: 'Trading Account',
            price: data.offers.minDeposit,
            priceCurrency: 'USD',
            description: `Minimum deposit: $${data.offers.minDeposit}`
          } : undefined
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: data.rating,
          bestRating: '5',
          worstRating: '1'
        },
        author: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url
        },
        datePublished: data.datePublished || new Date().toISOString().split('T')[0],
        dateModified: data.dateModified || new Date().toISOString().split('T')[0],
        reviewBody: data.reviewBody || `Comprehensive review of ${data.brokerName} covering trading conditions, regulation, platforms, and user experience.`
      };
      break;

    case 'faq':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      };
      break;

    case 'organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: data.socialLinks
      };
      break;

    case 'breadcrumb':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };
      break;

    case 'aggregateRating':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'AggregateRating',
        itemReviewed: {
          '@type': 'FinancialService',
          name: data.itemName,
          description: data.itemDescription
        },
        ratingValue: data.ratingValue,
        bestRating: data.bestRating || '5',
        worstRating: data.worstRating || '1',
        ratingCount: data.ratingCount
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
