/**
 * Enhanced SEO utility functions for broker reviews and programmatic SEO
 * Optimized for 2025 search engine algorithms and Core Web Vitals
 */

import { siteConfig } from "@/config/site";

// Enhanced keyword database for better SEO targeting
const TRADING_KEYWORDS = {
  forex: ["forex", "fx", "currency trading", "foreign exchange", "forex market"],
  crypto: ["cryptocurrency", "crypto", "bitcoin", "ethereum", "digital assets"],
  stocks: ["stocks", "equities", "shares", "stock trading", "stock market"],
  cfd: ["CFD", "contracts for difference", "CFD trading"],
  options: ["options", "options trading", "derivatives"],
  etf: ["ETF", "exchange traded funds", "index funds"],
  commodities: ["commodities", "gold", "oil", "precious metals"]
};

const BROKER_FEATURES = {
  regulation: ["regulated", "licensed", "authorized", "compliant"],
  spreads: ["low spreads", "tight spreads", "competitive spreads", "zero spreads"],
  leverage: ["high leverage", "flexible leverage", "leverage up to"],
  platforms: ["MetaTrader", "MT4", "MT5", "proprietary platform", "web platform"],
  deposits: ["low minimum deposit", "no minimum deposit", "instant deposits"],
  withdrawals: ["fast withdrawals", "instant withdrawals", "no withdrawal fees"]
};

/**
 * Generate comprehensive SEO data for a broker review page
 * Enhanced for 2025 with semantic keywords and user intent optimization
 */
export function getBrokerSeo(broker: any) {
  if (!broker) {
    return {
      title: "Top Forex Broker Review 2025 | Expert Analysis & Ratings",
      description: "Comprehensive forex broker review with expert analysis, user ratings, and detailed comparison. Find the best trading platform for your needs.",
      keywords: "forex broker review, best forex broker, trading platform review, broker comparison",
      canonical: `${siteConfig.url}/brokers/`,
      openGraph: {
        title: "Top Forex Broker Review 2025",
        description: "Expert broker analysis and ratings",
        type: "article"
      }
    };
  }

  const brokerName = broker.name || "Forex Broker";
  const currentYear = new Date().getFullYear();
  const regulatedText = broker.regulations ? " Regulated" : "";
  const countryText = broker.country ? ` ${broker.country}` : "";

  // Enhanced title generation with semantic keywords
  const titleVariations = [
    `${brokerName} Review ${currentYear} | Expert Analysis${regulatedText}${countryText}`,
    `${brokerName}${regulatedText} Review | Pros, Cons & Ratings ${currentYear}`,
    `${brokerName} Broker Review${countryText} | Complete Analysis ${currentYear}`
  ];

  // Select title based on broker characteristics
  let title = titleVariations[0];
  if (broker.overall_rating && broker.overall_rating >= 4.5) {
    title = `${brokerName} Review ${currentYear} | Top-Rated${regulatedText} Broker${countryText}`;
  } else if (broker.min_deposit && broker.min_deposit <= 10) {
    title = `${brokerName} Review ${currentYear} | Low Deposit${regulatedText} Broker${countryText}`;
  }

  // Enhanced description with semantic richness
  let description = `Comprehensive ${brokerName} review ${currentYear}. `;

  // Add regulation credibility
  if (broker.regulations) {
    description += `Regulated by ${broker.regulations}. `;
  }

  // Add key trading features
  const features = [];
  if (broker.min_deposit !== undefined) {
    features.push(`$${broker.min_deposit} minimum deposit`);
  }
  if (broker.max_leverage) {
    features.push(`${broker.max_leverage} leverage`);
  }
  if (broker.spreads_from) {
    features.push(`spreads from ${broker.spreads_from}`);
  }

  if (features.length > 0) {
    description += `Features: ${features.join(", ")}. `;
  }

  // Add call to action
  description += `Read our expert analysis, user reviews, and detailed comparison.`;

  // Ensure description is within optimal length (150-160 characters)
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  // Add platforms if available
  if (broker.trading_platforms) {
    description += `. Offering ${broker.trading_platforms}`;
  }

  // Add leverage information if available
  if (broker.max_leverage) {
    description += `, with leverage up to ${broker.max_leverage}`;
  }

  // Add rating if available
  if (broker.overall_rating) {
    const ratingText = typeof broker.overall_rating === 'number'
      ? broker.overall_rating.toFixed(1)
      : broker.overall_rating;
    description += `. Our rating: ${ratingText}/5`;
  }

  // Finalize description
  description += ". Discover if this broker is right for your trading needs.";

  // Generate keywords based on broker properties
  const keywords = [
    `${brokerName} review`,
    `${brokerName} forex`,
    `${brokerName} trading`,
    "forex broker",
    "forex trading",
    "broker review"
  ];

  // Add regulation keywords
  if (broker.regulations) {
    keywords.push(
      `regulated forex broker`,
      `${broker.regulations} broker`,
      "safe forex broker"
    );
  }

  // Add platform keywords
  if (broker.trading_platforms) {
    if (broker.trading_platforms.toLowerCase().includes("mt4")) {
      keywords.push("MT4 broker", "MetaTrader 4 broker");
    }
    if (broker.trading_platforms.toLowerCase().includes("mt5")) {
      keywords.push("MT5 broker", "MetaTrader 5 broker");
    }
    if (broker.trading_platforms.toLowerCase().includes("ctrader")) {
      keywords.push("cTrader broker");
    }
  }

  // Add deposit keywords
  if (broker.min_deposit) {
    const depositAmount = parseInt(broker.min_deposit);
    if (depositAmount <= 100) {
      keywords.push("low minimum deposit broker", "low deposit forex");
    }
    if (depositAmount <= 10) {
      keywords.push("micro account forex", "$10 deposit broker");
    }
    if (depositAmount === 0) {
      keywords.push("no minimum deposit broker", "zero deposit forex");
    }
  }

  // Add leverage keywords
  if (broker.max_leverage) {
    let leverageValue = 0;
    if (typeof broker.max_leverage === 'string') {
      // Try to extract numbers from string format like "1:500"
      const match = broker.max_leverage.match(/\d+/);
      if (match) {
        leverageValue = parseInt(match[0]);
      }
    } else if (typeof broker.max_leverage === 'number') {
      leverageValue = broker.max_leverage;
    }

    if (leverageValue >= 500) {
      keywords.push("high leverage broker", "500:1 leverage forex");
    } else if (leverageValue >= 200) {
      keywords.push("good leverage forex", "200:1 leverage broker");
    }
  }

  // Add country keywords if available
  if (broker.country) {
    keywords.push(
      `${broker.country} forex broker`,
      `${broker.name} ${broker.country}`
    );
  }

  // Enhanced keyword generation using semantic analysis
  const enhancedKeywords = generateBrokerKeywords(broker);
  const allKeywords = [...keywords, ...enhancedKeywords];

  // Generate canonical URL
  const canonical = broker.slug
    ? `${siteConfig.url}/broker/${broker.slug}`
    : `${siteConfig.url}/brokers/`;

  // Generate Open Graph data
  const openGraph = {
    title: title.length > 60 ? `${brokerName} Review ${currentYear}` : title,
    description: description,
    type: "article" as const,
    url: canonical,
    images: broker.logo_url ? [{
      url: broker.logo_url,
      width: 400,
      height: 200,
      alt: `${brokerName} logo`
    }] : undefined,
    siteName: siteConfig.name
  };

  return {
    title,
    description,
    keywords: Array.from(new Set(allKeywords)).join(", "),
    canonical,
    openGraph,
    structuredData: generateBrokerSchema(broker)
  };
}

/**
 * Generate comprehensive keywords for broker SEO
 * Uses semantic analysis and trading-specific terminology
 */
function generateBrokerKeywords(broker: any): string[] {
  const brokerName = broker.name || "Forex Broker";
  const keywords = new Set<string>();

  // Asset class keywords
  const assetClasses = broker.asset_classes || ["forex"];
  assetClasses.forEach((asset: string) => {
    const assetKeywords = TRADING_KEYWORDS[asset as keyof typeof TRADING_KEYWORDS] || [asset];
    assetKeywords.forEach(keyword => {
      keywords.add(`${keyword} broker`);
      keywords.add(`${keyword} trading`);
      keywords.add(`${brokerName} ${keyword}`);
    });
  });

  // Feature-based keywords
  if (broker.regulations) {
    BROKER_FEATURES.regulation.forEach(term => {
      keywords.add(`${term} broker`);
    });
  }

  // Spread-based keywords
  if (broker.spreads_from) {
    const spreadValue = parseFloat(broker.spreads_from.toString().replace(/[^\d.]/g, ''));
    if (spreadValue <= 0.1) {
      BROKER_FEATURES.spreads.slice(0, 2).forEach(term => keywords.add(term));
    } else if (spreadValue <= 1.0) {
      BROKER_FEATURES.spreads.slice(2).forEach(term => keywords.add(term));
    }
  }

  // Year-specific keywords
  const currentYear = new Date().getFullYear();
  keywords.add(`best broker ${currentYear}`);
  keywords.add(`forex broker ${currentYear}`);
  keywords.add(`trading platform ${currentYear}`);

  return Array.from(keywords);
}

/**
 * Generate a headline for the broker review
 */
export function getHeadlineForBroker(broker: any): string {
  if (!broker) return "Comprehensive Forex Broker Review";

  const brokerName = broker.name || "Forex Broker";

  // Start with a default headline
  let headline = `${brokerName} Review: `;

  // Add regulation information if available
  if (broker.regulations) {
    headline += `Regulated by ${broker.regulations} | `;
  }

  // Add main feature highlights
  const features = [];

  if (broker.min_deposit) {
    features.push(`$${broker.min_deposit} Min Deposit`);
  }

  if (broker.max_leverage) {
    features.push(`${broker.max_leverage} Leverage`);
  }

  if (broker.trading_platforms) {
    // Extract main platforms
    const platforms = broker.trading_platforms.split(',').map((p: string) => p.trim());
    const platformText = platforms.length > 1
      ? `${platforms[0]} & More`
      : platforms[0];
    features.push(platformText);
  }

  if (broker.spreads_from) {
    features.push(`Spreads from ${broker.spreads_from}`);
  }

  // Add features to headline
  if (features.length > 0) {
    headline += features.join(" | ");
  } else {
    headline += "Complete Analysis & Trading Conditions";
  }

  // Add current year for freshness
  headline += ` (${new Date().getFullYear()})`;

  return headline;
}

/**
 * Generate comprehensive broker schema for structured data
 * Enhanced for 2025 with rich snippets and review aggregation
 */
export function generateBrokerSchema(broker: any) {
  if (!broker) return null;

  const currentYear = new Date().getFullYear();
  const brokerName = broker.name || "Forex Broker";

  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": brokerName,
    "description": broker.description || `${brokerName} is a comprehensive trading platform offering forex, stocks, and other financial instruments.`,
    "url": broker.website_url || `${siteConfig.url}/broker/${broker.slug}`,
    "logo": broker.logo_url || `${siteConfig.url}/images/brokers/${broker.slug}.png`,
    "image": broker.logo_url || `${siteConfig.url}/images/brokers/${broker.slug}.png`,
    "foundingDate": broker.established || "2000",
    "address": broker.headquarters ? {
      "@type": "PostalAddress",
      "addressCountry": broker.country || "Unknown"
    } : undefined,
    "serviceType": "Financial Trading Platform",
    "areaServed": broker.countries_available || "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Trading Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Forex Trading",
            "description": "Foreign exchange trading services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stock Trading",
            "description": "Equity trading services"
          }
        }
      ]
    },
    "aggregateRating": broker.overall_rating ? {
      "@type": "AggregateRating",
      "ratingValue": broker.overall_rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": broker.review_count || "100"
    } : undefined,
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": broker.overall_rating || "4.0",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": siteConfig.name
      },
      "datePublished": `${currentYear}-01-01`,
      "reviewBody": `Comprehensive review of ${brokerName} covering trading conditions, regulation, platforms, and user experience.`
    },
    "offers": broker.min_deposit !== undefined ? {
      "@type": "Offer",
      "name": "Trading Account",
      "price": broker.min_deposit.toString(),
      "priceCurrency": "USD",
      "description": `Minimum deposit required: $${broker.min_deposit}`
    } : undefined
  };
}

/**
 * Generate FAQ schema for structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate breadcrumb schema for structured data
 * Enhanced with proper site URLs and navigation structure
 */
export function generateBreadcrumbSchema(broker: any) {
  if (!broker || !broker.name) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Brokers",
        "item": `${siteConfig.url}/brokers/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": broker.name,
        "item": `${siteConfig.url}/broker/${broker.slug || broker.id}`
      }
    ]
  };
}

/**
 * Generate category page SEO data
 * For broker category pages like "Best Forex Brokers"
 */
export function getCategorySeo(category: string, _brokers: any[] = []) {
  const currentYear = new Date().getFullYear();
  const categoryTitle = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const title = `${categoryTitle} ${currentYear} | Expert Reviews & Comparisons`;
  const description = `Discover the ${categoryTitle.toLowerCase()} with our expert reviews and detailed comparisons. Updated ${currentYear} with latest broker information and ratings.`;

  const keywords = [
    categoryTitle.toLowerCase(),
    `${categoryTitle.toLowerCase()} ${currentYear}`,
    `best ${category.replace(/-/g, ' ')} brokers`,
    `${category.replace(/-/g, ' ')} broker comparison`,
    `top ${category.replace(/-/g, ' ')} platforms`,
    "broker review",
    "trading platform comparison"
  ];

  return {
    title,
    description,
    keywords: keywords.join(", "),
    canonical: `${siteConfig.url}/best-brokers/${category}`,
    openGraph: {
      title,
      description,
      type: "website" as const,
      url: `${siteConfig.url}/best-brokers/${category}`,
      siteName: siteConfig.name
    }
  };
}

/**
 * Generate blog post SEO data
 * Enhanced for content marketing and organic traffic
 */
export function getBlogSeo(post: any) {
  if (!post) {
    return {
      title: "Trading Guides & Market Analysis | BrokerAnalysis Blog",
      description: "Expert trading guides, market analysis, and broker insights. Stay updated with the latest forex, crypto, and stock trading strategies.",
      keywords: "trading guides, forex analysis, broker news, market insights"
    };
  }

  const currentYear = new Date().getFullYear();
  const title = post.title || "Trading Guide";
  const description = post.description || post.excerpt || `Comprehensive trading guide covering ${title.toLowerCase()}. Expert insights and practical strategies for traders.`;

  const keywords = [
    ...(post.keywords || []),
    "trading guide",
    "forex trading",
    "broker analysis",
    `trading ${currentYear}`,
    "market analysis",
    "trading strategies"
  ];

  return {
    title: title.includes(currentYear.toString()) ? title : `${title} | ${currentYear} Guide`,
    description,
    keywords: keywords.join(", "),
    canonical: `${siteConfig.url}/blog/${post.slug}`,
    openGraph: {
      title,
      description,
      type: "article" as const,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt || new Date().toISOString(),
      modifiedTime: post.updatedAt || new Date().toISOString(),
      authors: [post.author || "BrokerAnalysis Team"],
      siteName: siteConfig.name,
      images: post.featuredImage ? [{
        url: post.featuredImage,
        width: 1200,
        height: 630,
        alt: title
      }] : undefined
    }
  };
}