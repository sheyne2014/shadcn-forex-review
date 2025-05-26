/**
 * Content Types and Topic Management for Blog Automation
 * Handles different types of financial content beyond just broker reviews
 */

export interface ContentType {
  id: string;
  name: string;
  category: string;
  weight: number; // Higher weight = more likely to be selected
  keywords: string[];
  searchTerms: string[];
  targetAudience: string;
  contentStructure: ContentStructure;
}

export interface ContentStructure {
  sections: ContentSection[];
  estimatedWordCount: number;
  faqCount: number;
  keyTakeawaysCount: number;
}

export interface ContentSection {
  heading: string;
  subheadings: string[];
  keyPoints: string[];
  estimatedWords: number;
}

/**
 * Comprehensive content types covering all financial markets
 */
export const CONTENT_TYPES: ContentType[] = [
  // Broker Reviews (30% weight)
  {
    id: 'broker-review',
    name: 'Broker Review',
    category: 'brokers',
    weight: 30,
    keywords: ['broker review', 'trading platform', 'forex broker', 'broker comparison'],
    searchTerms: ['broker review 2025', 'best trading platform', 'broker fees', 'broker regulation'],
    targetAudience: 'traders looking for broker information',
    contentStructure: {
      sections: [
        {
          heading: 'Broker Overview and Key Features',
          subheadings: ['Platform Overview', 'Key Trading Features', 'Account Types'],
          keyPoints: ['Regulation and safety', 'Trading platforms', 'Account options'],
          estimatedWords: 400
        },
        {
          heading: 'Trading Conditions and Fees',
          subheadings: ['Spreads and Commissions', 'Deposit and Withdrawal', 'Trading Costs'],
          keyPoints: ['Competitive spreads', 'Fee structure', 'Payment methods'],
          estimatedWords: 350
        },
        {
          heading: 'Platform and Tools Analysis',
          subheadings: ['Trading Platforms', 'Research Tools', 'Mobile Trading'],
          keyPoints: ['Platform features', 'Analysis tools', 'Mobile app'],
          estimatedWords: 400
        },
        {
          heading: 'Pros and Cons Analysis',
          subheadings: ['Advantages', 'Disadvantages', 'Who Should Use'],
          keyPoints: ['Main benefits', 'Potential drawbacks', 'Target audience'],
          estimatedWords: 300
        }
      ],
      estimatedWordCount: 1800,
      faqCount: 6,
      keyTakeawaysCount: 5
    }
  },

  // Forex Trading (25% weight)
  {
    id: 'forex-guide',
    name: 'Forex Trading Guide',
    category: 'forex',
    weight: 25,
    keywords: ['forex trading', 'currency pairs', 'forex strategies', 'forex analysis'],
    searchTerms: ['forex trading strategies', 'currency pair analysis', 'forex market trends', 'forex for beginners'],
    targetAudience: 'forex traders and beginners',
    contentStructure: {
      sections: [
        {
          heading: 'Understanding Forex Markets',
          subheadings: ['What is Forex Trading', 'Major Currency Pairs', 'Market Sessions'],
          keyPoints: ['Forex basics', 'Currency pair types', 'Trading hours'],
          estimatedWords: 450
        },
        {
          heading: 'Forex Trading Strategies',
          subheadings: ['Day Trading', 'Swing Trading', 'Scalping'],
          keyPoints: ['Strategy types', 'Risk management', 'Entry and exit points'],
          estimatedWords: 500
        },
        {
          heading: 'Technical and Fundamental Analysis',
          subheadings: ['Chart Patterns', 'Economic Indicators', 'News Impact'],
          keyPoints: ['Analysis methods', 'Key indicators', 'Market drivers'],
          estimatedWords: 450
        },
        {
          heading: 'Risk Management and Psychology',
          subheadings: ['Position Sizing', 'Stop Losses', 'Trading Psychology'],
          keyPoints: ['Risk control', 'Emotional management', 'Trading discipline'],
          estimatedWords: 400
        }
      ],
      estimatedWordCount: 2000,
      faqCount: 8,
      keyTakeawaysCount: 6
    }
  },

  // Stock Trading (20% weight)
  {
    id: 'stock-analysis',
    name: 'Stock Market Analysis',
    category: 'stocks',
    weight: 20,
    keywords: ['stock trading', 'stock analysis', 'stock market', 'equity investing'],
    searchTerms: ['best stocks 2025', 'stock market analysis', 'stock trading strategies', 'dividend stocks'],
    targetAudience: 'stock traders and investors',
    contentStructure: {
      sections: [
        {
          heading: 'Stock Market Fundamentals',
          subheadings: ['Market Structure', 'Stock Types', 'Market Indices'],
          keyPoints: ['Market basics', 'Stock categories', 'Index tracking'],
          estimatedWords: 400
        },
        {
          heading: 'Stock Analysis Methods',
          subheadings: ['Fundamental Analysis', 'Technical Analysis', 'Valuation Metrics'],
          keyPoints: ['Analysis techniques', 'Key ratios', 'Valuation methods'],
          estimatedWords: 500
        },
        {
          heading: 'Investment Strategies',
          subheadings: ['Value Investing', 'Growth Investing', 'Dividend Investing'],
          keyPoints: ['Strategy types', 'Selection criteria', 'Portfolio building'],
          estimatedWords: 450
        },
        {
          heading: 'Risk Management and Diversification',
          subheadings: ['Portfolio Allocation', 'Risk Assessment', 'Diversification Benefits'],
          keyPoints: ['Risk control', 'Asset allocation', 'Portfolio balance'],
          estimatedWords: 350
        }
      ],
      estimatedWordCount: 1900,
      faqCount: 7,
      keyTakeawaysCount: 5
    }
  },

  // Cryptocurrency (15% weight)
  {
    id: 'crypto-guide',
    name: 'Cryptocurrency Guide',
    category: 'crypto',
    weight: 15,
    keywords: ['cryptocurrency', 'crypto trading', 'bitcoin', 'blockchain'],
    searchTerms: ['crypto trading strategies', 'best cryptocurrency 2025', 'bitcoin analysis', 'crypto market trends'],
    targetAudience: 'crypto traders and investors',
    contentStructure: {
      sections: [
        {
          heading: 'Cryptocurrency Fundamentals',
          subheadings: ['Blockchain Technology', 'Types of Cryptocurrencies', 'Market Structure'],
          keyPoints: ['Crypto basics', 'Technology overview', 'Market dynamics'],
          estimatedWords: 450
        },
        {
          heading: 'Crypto Trading Strategies',
          subheadings: ['HODLing vs Trading', 'DeFi Strategies', 'Altcoin Analysis'],
          keyPoints: ['Trading approaches', 'DeFi opportunities', 'Coin selection'],
          estimatedWords: 500
        },
        {
          heading: 'Market Analysis and Trends',
          subheadings: ['Price Analysis', 'Market Cycles', 'Regulatory Impact'],
          keyPoints: ['Technical analysis', 'Market patterns', 'Regulation effects'],
          estimatedWords: 400
        },
        {
          heading: 'Security and Risk Management',
          subheadings: ['Wallet Security', 'Exchange Safety', 'Risk Mitigation'],
          keyPoints: ['Security practices', 'Platform safety', 'Risk control'],
          estimatedWords: 350
        }
      ],
      estimatedWordCount: 1900,
      faqCount: 8,
      keyTakeawaysCount: 6
    }
  },

  // Options Trading (5% weight)
  {
    id: 'options-guide',
    name: 'Options Trading Guide',
    category: 'options',
    weight: 5,
    keywords: ['options trading', 'call options', 'put options', 'options strategies'],
    searchTerms: ['options trading strategies', 'options for beginners', 'covered calls', 'options Greeks'],
    targetAudience: 'options traders and advanced investors',
    contentStructure: {
      sections: [
        {
          heading: 'Options Trading Basics',
          subheadings: ['What are Options', 'Call vs Put Options', 'Options Terminology'],
          keyPoints: ['Options fundamentals', 'Contract types', 'Key terms'],
          estimatedWords: 400
        },
        {
          heading: 'Options Strategies',
          subheadings: ['Basic Strategies', 'Intermediate Strategies', 'Advanced Strategies'],
          keyPoints: ['Strategy types', 'Risk profiles', 'Profit potential'],
          estimatedWords: 500
        },
        {
          heading: 'Options Greeks and Pricing',
          subheadings: ['Delta', 'Gamma', 'Theta', 'Vega'],
          keyPoints: ['Greeks explanation', 'Price sensitivity', 'Risk factors'],
          estimatedWords: 400
        },
        {
          heading: 'Risk Management',
          subheadings: ['Position Sizing', 'Exit Strategies', 'Common Mistakes'],
          keyPoints: ['Risk control', 'Exit planning', 'Error avoidance'],
          estimatedWords: 300
        }
      ],
      estimatedWordCount: 1800,
      faqCount: 6,
      keyTakeawaysCount: 5
    }
  },

  // CFD Trading (3% weight)
  {
    id: 'cfd-guide',
    name: 'CFD Trading Guide',
    category: 'cfd',
    weight: 3,
    keywords: ['CFD trading', 'contracts for difference', 'CFD strategies', 'CFD brokers'],
    searchTerms: ['CFD trading strategies', 'CFD vs stocks', 'CFD brokers comparison', 'CFD risks'],
    targetAudience: 'CFD traders and leveraged trading enthusiasts',
    contentStructure: {
      sections: [
        {
          heading: 'Understanding CFDs',
          subheadings: ['What are CFDs', 'CFD vs Traditional Trading', 'Market Access'],
          keyPoints: ['CFD basics', 'Comparison benefits', 'Market coverage'],
          estimatedWords: 400
        },
        {
          heading: 'CFD Trading Strategies',
          subheadings: ['Long and Short Positions', 'Leverage Usage', 'Hedging Strategies'],
          keyPoints: ['Position types', 'Leverage benefits', 'Risk hedging'],
          estimatedWords: 450
        },
        {
          heading: 'Costs and Risks',
          subheadings: ['Spreads and Commissions', 'Overnight Fees', 'Risk Factors'],
          keyPoints: ['Trading costs', 'Fee structure', 'Risk awareness'],
          estimatedWords: 350
        },
        {
          heading: 'Platform Selection and Tools',
          subheadings: ['Broker Comparison', 'Trading Platforms', 'Analysis Tools'],
          keyPoints: ['Broker selection', 'Platform features', 'Trading tools'],
          estimatedWords: 300
        }
      ],
      estimatedWordCount: 1700,
      faqCount: 6,
      keyTakeawaysCount: 4
    }
  },

  // ETF Investing (2% weight)
  {
    id: 'etf-guide',
    name: 'ETF Investment Guide',
    category: 'etf',
    weight: 2,
    keywords: ['ETF investing', 'exchange traded funds', 'ETF strategies', 'index funds'],
    searchTerms: ['best ETFs 2025', 'ETF vs mutual funds', 'ETF portfolio', 'dividend ETFs'],
    targetAudience: 'long-term investors and passive investment enthusiasts',
    contentStructure: {
      sections: [
        {
          heading: 'ETF Fundamentals',
          subheadings: ['What are ETFs', 'ETF Types', 'Benefits of ETF Investing'],
          keyPoints: ['ETF basics', 'Fund categories', 'Investment advantages'],
          estimatedWords: 400
        },
        {
          heading: 'ETF Selection and Analysis',
          subheadings: ['Expense Ratios', 'Tracking Error', 'Liquidity Factors'],
          keyPoints: ['Selection criteria', 'Cost analysis', 'Performance metrics'],
          estimatedWords: 450
        },
        {
          heading: 'Portfolio Construction',
          subheadings: ['Asset Allocation', 'Diversification', 'Rebalancing'],
          keyPoints: ['Portfolio building', 'Risk spreading', 'Maintenance strategies'],
          estimatedWords: 400
        },
        {
          heading: 'Tax Efficiency and Costs',
          subheadings: ['Tax Benefits', 'Cost Comparison', 'Long-term Strategy'],
          keyPoints: ['Tax advantages', 'Fee comparison', 'Investment planning'],
          estimatedWords: 300
        }
      ],
      estimatedWordCount: 1750,
      faqCount: 5,
      keyTakeawaysCount: 4
    }
  }
];

/**
 * Select content type based on weighted random selection
 */
export function selectContentType(): ContentType {
  const totalWeight = CONTENT_TYPES.reduce((sum, type) => sum + type.weight, 0);
  const random = Math.random() * totalWeight;

  let currentWeight = 0;
  for (const contentType of CONTENT_TYPES) {
    currentWeight += contentType.weight;
    if (random <= currentWeight) {
      return contentType;
    }
  }

  // Fallback to broker review
  return CONTENT_TYPES[0];
}

/**
 * Get content types by category
 */
export function getContentTypesByCategory(category: string): ContentType[] {
  return CONTENT_TYPES.filter(type => type.category === category);
}

/**
 * Get all available categories
 */
export function getAllCategories(): string[] {
  return [...new Set(CONTENT_TYPES.map(type => type.category))];
}

// Types are already exported as interfaces above
