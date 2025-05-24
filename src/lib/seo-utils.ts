/**
 * SEO utility functions for broker reviews
 * These functions generate optimized titles, descriptions, keywords, and schema data
 */

/**
 * Generate SEO data for a broker review page
 */
export function getBrokerSeo(broker: any) {
  if (!broker) {
    return {
      title: "Forex Broker Review",
      description: "Comprehensive forex broker review and analysis.",
      keywords: "forex broker, trading, forex, review"
    };
  }

  const brokerName = broker.name || "Forex Broker";
  const regulatedText = broker.regulations ? " Regulated" : "";
  const countryText = broker.country ? ` ${broker.country}` : "";
  
  // Create title with broker name, regulated status, and top features
  const title = `${brokerName} Review${regulatedText}${countryText} | Pros & Cons (${new Date().getFullYear()})`;
  
  // Create description with key broker features
  let description = `Read our comprehensive review of ${brokerName}`;
  
  // Add regulation information if available
  if (broker.regulations) {
    description += `, regulated by ${broker.regulations}`;
  }
  
  // Add minimum deposit if available
  if (broker.min_deposit) {
    description += `, with a minimum deposit of $${broker.min_deposit}`;
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
  let keywords = [
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
  
  return {
    title,
    description,
    keywords: keywords.join(", ")
  };
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
 * Generate FAQ schema for structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }
  
  return {
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
        "item": "https://yoursite.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Forex Brokers",
        "item": "https://yoursite.com/brokers/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": broker.name,
        "item": `https://yoursite.com/brokers/${broker.slug || broker.id}`
      }
    ]
  };
} 