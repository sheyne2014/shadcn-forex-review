"use client";

import React from 'react';
import Script from 'next/script';

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  description: string;
  min_deposit: number;
  max_leverage: string;
  regulations: string;
  trading_platforms: string;
  spreads_from: string;
  account_types: string[];
  country: string;
  established: string;
  overall_rating: number;
  website_url: string;
  pros: string[];
  cons: string[];
  feature: string;
}

interface SEOStructuredDataProps {
  broker: Broker;
}

export function SEOStructuredData({ broker }: SEOStructuredDataProps) {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": broker.name,
    "description": broker.description,
    "url": broker.website_url,
    "logo": broker.logo_url,
    "foundingDate": broker.established,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": broker.country
    },
    "serviceType": "Online Trading Platform",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Trading Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Trading",
            "description": "Copy trading and social investment features"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multi-Asset Trading",
            "description": "Stocks, Forex, Crypto, and CFD trading"
          }
        }
      ]
    }
  };

  // Review Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": broker.name,
      "description": broker.description,
      "url": broker.website_url,
      "logo": broker.logo_url
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": broker.overall_rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": "BrokerAnalysis",
      "url": "https://brokeranalysis.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrokerAnalysis",
      "url": "https://brokeranalysis.com"
    },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "reviewBody": `Comprehensive review of ${broker.name}, ${broker.description}`,
    "positiveNotes": broker.pros,
    "negativeNotes": broker.cons
  };

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${broker.name} Trading Platform`,
    "description": broker.description,
    "brand": {
      "@type": "Brand",
      "name": broker.name
    },
    "category": "Financial Trading Platform",
    "offers": {
      "@type": "Offer",
      "price": broker.min_deposit,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": broker.min_deposit,
        "priceCurrency": "USD",
        "name": "Minimum Deposit"
      },
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": broker.name
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": broker.overall_rating,
      "reviewCount": 1000,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": broker.overall_rating,
          "bestRating": 5
        },
        "author": {
          "@type": "Organization",
          "name": "BrokerAnalysis Expert Team"
        },
        "reviewBody": `Expert analysis of ${broker.name} trading platform and services.`
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What makes ${broker.name} different from other brokers?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${broker.name} is unique for its ${broker.feature.toLowerCase()} and ${broker.description}`
        }
      },
      {
        "@type": "Question",
        "name": `What is the minimum deposit for ${broker.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The minimum deposit for ${broker.name} is $${broker.min_deposit}.`
        }
      },
      {
        "@type": "Question",
        "name": `Is ${broker.name} regulated?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, ${broker.name} is regulated by ${broker.regulations}, ensuring client fund protection and regulatory compliance.`
        }
      },
      {
        "@type": "Question",
        "name": `What trading platforms does ${broker.name} offer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${broker.name} offers ${broker.trading_platforms} for trading across multiple devices.`
        }
      }
    ]
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${broker.name} Review 2025 | ${broker.feature} | BrokerAnalysis`,
    "description": `Comprehensive ${broker.name} review 2025. Expert analysis of ${broker.feature.toLowerCase()}, trading conditions, regulation, and platform features.`,
    "image": broker.logo_url,
    "author": {
      "@type": "Organization",
      "name": "BrokerAnalysis Expert Team",
      "url": "https://brokeranalysis.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrokerAnalysis",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brokeranalysis.com/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `/broker/${broker.slug}`
    },
    "articleSection": "Broker Reviews",
    "keywords": [
      `${broker.name} review`,
      `${broker.name} broker`,
      broker.feature.toLowerCase(),
      "trading platform review",
      "forex broker review",
      "social trading platform"
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
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
        "name": "Broker Reviews",
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

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Review Schema */}
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema)
        }}
      />

      {/* Product Schema */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* Article Schema */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}
