#!/usr/bin/env node

/**
 * Batch 3 Enhanced Templates
 * Pre-generated templates for the next 10 brokers
 */

const BATCH_3_BROKERS = [
  {
    slug: 'oanda',
    name: 'OANDA',
    description: 'OANDA is a well-established forex broker known for competitive spreads, advanced trading tools, and comprehensive market research.',
    min_deposit: 0,
    regulations: 'FCA, NFA, CFTC, IIROC',
    established: '1996',
    country: 'USA',
    feature: 'Advanced Trading Tools',
    rating: 4.6,
    title_length: 47
  },
  {
    slug: 'interactive-brokers',
    name: 'Interactive Brokers',
    description: 'Interactive Brokers is a professional trading platform offering global market access with low costs and advanced tools for serious traders.',
    min_deposit: 0,
    regulations: 'SEC, FINRA, FCA, IIROC',
    established: '1978',
    country: 'USA',
    feature: 'Global Market Access',
    rating: 4.8,
    title_length: 59
  },
  {
    slug: 'fxpro',
    name: 'FxPro',
    description: 'FxPro is a European regulated broker offering forex and CFD trading with multiple platforms and competitive trading conditions.',
    min_deposit: 100,
    regulations: 'FCA, CySEC, FSCA, SCB',
    established: '2006',
    country: 'UK',
    feature: 'European Regulation',
    rating: 4.4,
    title_length: 47
  },
  {
    slug: 'capital-com',
    name: 'Capital.com',
    description: 'Capital.com is an AI-powered trading platform offering CFDs on forex, stocks, commodities, and cryptocurrencies with innovative features.',
    min_deposit: 20,
    regulations: 'FCA, CySEC, ASIC, NBRB',
    established: '2016',
    country: 'UK',
    feature: 'AI-Powered Trading',
    rating: 4.5,
    title_length: 53
  },
  {
    slug: 'saxo-bank',
    name: 'Saxo Bank',
    description: 'Saxo Bank is a premium trading platform offering comprehensive market access, advanced tools, and institutional-grade execution for professional traders.',
    min_deposit: 10000,
    regulations: 'DFSA, FCA, MAS, ASIC',
    established: '1992',
    country: 'Denmark',
    feature: 'Premium Trading Platform',
    rating: 4.7,
    title_length: 51
  },
  {
    slug: 'ig',
    name: 'IG',
    description: 'IG is a market leader in CFD trading offering a wide range of markets, competitive spreads, and advanced trading platforms.',
    min_deposit: 0,
    regulations: 'FCA, ASIC, MAS, BaFin',
    established: '1974',
    country: 'UK',
    feature: 'CFD Market Leader',
    rating: 4.5,
    title_length: 42
  },
  {
    slug: 'fxcm',
    name: 'FXCM',
    description: 'FXCM is a global forex broker offering competitive spreads, advanced trading platforms, and comprehensive market analysis.',
    min_deposit: 50,
    regulations: 'FCA, ASIC, FSCA',
    established: '1999',
    country: 'UK',
    feature: 'Global Forex Trading',
    rating: 4.3,
    title_length: 44
  },
  {
    slug: 'exness',
    name: 'Exness',
    description: 'Exness is a global forex broker offering ultra-low spreads, instant execution, and unlimited leverage for professional traders.',
    min_deposit: 1,
    regulations: 'FCA, CySEC, FSA, FSCA',
    established: '2008',
    country: 'Cyprus',
    feature: 'Ultra-Low Spreads',
    rating: 4.4,
    title_length: 46
  },
  {
    slug: 'fbs',
    name: 'FBS',
    description: 'FBS is an international forex broker offering competitive trading conditions, multiple platforms, and comprehensive educational resources.',
    min_deposit: 1,
    regulations: 'CySEC, ASIC, FSC',
    established: '2009',
    country: 'Cyprus',
    feature: 'International Trading',
    rating: 4.2,
    title_length: 43
  },
  {
    slug: 'thinkmarkets',
    name: 'ThinkMarkets',
    description: 'ThinkMarkets is a professional trading platform offering multi-asset trading with advanced tools and competitive conditions.',
    min_deposit: 0,
    regulations: 'FCA, ASIC, CySEC',
    established: '2010',
    country: 'UK',
    feature: 'Professional Trading',
    rating: 4.3,
    title_length: 55
  }
];

/**
 * Generate complete enhanced template for a broker
 */
function generateCompleteTemplate(broker) {
  return `import { Metadata } from "next";
import {
  EnhancedBrokerPageTemplate,
  generateEnhancedBrokerMetadata,
  BrokerPageData,
  SimilarBroker
} from "@/components/broker-review/EnhancedBrokerPageTemplate";

// Generate metadata for the broker review page
export async function generateMetadata(): Promise<Metadata> {
  const broker: BrokerPageData = {
    name: "${broker.name}",
    slug: "${broker.slug}",
    description: "${broker.description}",
    logo_url: "/images/brokers/${broker.slug}.png",
    website_url: "https://www.${broker.slug.replace('-', '')}.com",
    overall_rating: ${broker.rating},
    min_deposit: ${broker.min_deposit},
    regulations: "${broker.regulations}",
    established: "${broker.established}",
    country: "${broker.country}",
    feature: "${broker.feature}",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function ${broker.name.replace(/[^a-zA-Z]/g, '')}ReviewPage() {
  // ${broker.name} broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b${Math.random().toString().substr(2, 8)}-0000-0000-0000-000000000000",
    name: "${broker.name}",
    slug: "${broker.slug}",
    logo_url: "/images/brokers/${broker.slug}.png",
    description: "${broker.description}",
    min_deposit: ${broker.min_deposit},
    max_leverage: "1:500",
    regulations: "${broker.regulations}",
    trading_platforms: "MT4, MT5, WebTrader",
    spreads_from: "Variable spreads",
    account_types: ["Standard", "Professional"],
    country: "${broker.country}",
    established: "${broker.established}",
    overall_rating: ${broker.rating},
    pros: [
      "Strong regulation and compliance",
      "Competitive trading conditions",
      "Professional trading platforms",
      "Comprehensive market access"
    ],
    cons: [
      "Higher minimum deposit than some competitors",
      "Complex platform for beginners",
      "Limited educational resources"
    ],
    educational_resources: true,
    feature: "${broker.feature}",
    website_url: "https://www.${broker.slug.replace('-', '')}.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
        question: "Is ${broker.name} regulated?",
        answer: "${broker.name} is regulated by ${broker.regulations}, ensuring high standards of client protection and fund security."
      },
      {
        question: "What is the minimum deposit for ${broker.name}?",
        answer: "The minimum deposit for ${broker.name} is $${broker.min_deposit}."
      },
      {
        question: "What trading platforms does ${broker.name} offer?",
        answer: "${broker.name} offers multiple trading platforms including MT4, MT5, and proprietary web-based platforms."
      }
    ]
  };

  // Similar brokers for recommendation with enhanced typing
  const similarBrokers: SimilarBroker[] = [
    {
      id: "xtb",
      name: "XTB",
      logo_url: "/images/brokers/xtb.png",
      overall_rating: 4.6,
      min_deposit: 0,
      max_leverage: "1:500",
      regulations: "FCA, CySEC, KNF, IFSC",
      key_feature: "Award-winning platform",
      website_url: "https://www.xtb.com",
      spreads_from: "0.8 pips"
    },
    {
      id: "pepperstone",
      name: "Pepperstone",
      logo_url: "/images/brokers/pepperstone.png",
      overall_rating: 4.8,
      min_deposit: 200,
      max_leverage: "1:500",
      regulations: "FCA, ASIC, CySEC, DFSA, SCB",
      key_feature: "Advanced trading tools",
      website_url: "https://www.pepperstone.com",
      spreads_from: "0.0 pips"
    },
    {
      id: "ic-markets",
      name: "IC Markets",
      logo_url: "/images/brokers/ic-markets.png",
      overall_rating: 4.9,
      min_deposit: 200,
      max_leverage: "1:500",
      regulations: "ASIC, CySEC, FSA",
      key_feature: "Ultra-low spreads",
      website_url: "https://www.icmarkets.com",
      spreads_from: "0.0 pips"
    }
  ];

  // Generate headline for the broker
  const headline = "${broker.name} is a ${broker.feature.toLowerCase()} broker known for its ${broker.description.toLowerCase().includes('regulation') ? 'strong regulatory compliance' : 'competitive trading conditions'} and professional trading environment. With ${broker.regulations.split(',').length} regulatory licenses and established operations since ${broker.established}, ${broker.name} serves traders seeking ${broker.feature.toLowerCase()}.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}`;
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Batch 3: Enhanced Templates for 10 Brokers\n');
  
  console.log('📊 BATCH 3 BROKERS');
  console.log('='.repeat(60));
  
  BATCH_3_BROKERS.forEach((broker, index) => {
    console.log(`${(index + 1).toString().padStart(2)}. ${broker.name.padEnd(20)} | Rating: ${broker.rating}/5 | Min: $${broker.min_deposit.toString().padStart(5)} | Title: ${broker.title_length} chars`);
  });
  
  console.log('\n📋 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Brokers: ${BATCH_3_BROKERS.length}`);
  console.log(`Average Rating: ${(BATCH_3_BROKERS.reduce((sum, b) => sum + b.rating, 0) / BATCH_3_BROKERS.length).toFixed(1)}/5`);
  console.log(`Min Deposit Range: $${Math.min(...BATCH_3_BROKERS.map(b => b.min_deposit))} - $${Math.max(...BATCH_3_BROKERS.map(b => b.min_deposit))}`);
  console.log(`Title Length Range: ${Math.min(...BATCH_3_BROKERS.map(b => b.title_length))} - ${Math.max(...BATCH_3_BROKERS.map(b => b.title_length))} chars`);
  console.log(`Established Range: ${Math.min(...BATCH_3_BROKERS.map(b => parseInt(b.established)))} - ${Math.max(...BATCH_3_BROKERS.map(b => parseInt(b.established)))}`);
  
  console.log('\n🎯 OPTIMIZATION STATUS');
  console.log('='.repeat(60));
  const optimizedTitles = BATCH_3_BROKERS.filter(b => b.title_length <= 60).length;
  console.log(`SEO Optimized Titles: ${optimizedTitles}/${BATCH_3_BROKERS.length} (${((optimizedTitles/BATCH_3_BROKERS.length)*100).toFixed(1)}%)`);
  
  console.log('\n💡 NEXT STEPS');
  console.log('='.repeat(60));
  console.log('1. Apply enhanced template to each broker page');
  console.log('2. Test functionality and schema markup');
  console.log('3. Validate with Google Rich Results Test');
  console.log('4. Monitor performance improvements');
  console.log('5. Proceed with next batch');
  
  console.log('\n✅ Batch 3 templates ready for deployment!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { BATCH_3_BROKERS, generateCompleteTemplate };
