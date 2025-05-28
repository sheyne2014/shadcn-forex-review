#!/usr/bin/env node

/**
 * Quick Batch Update Script
 * Generates enhanced template code for broker pages
 */

// Batch 2 brokers to update
const BATCH_2_BROKERS = [
  {
    slug: 'avatrade',
    name: 'AvaTrade',
    description: 'AvaTrade is a multi-asset broker offering forex, stocks, commodities, and crypto trading with comprehensive regulation and educational resources.',
    min_deposit: 100,
    regulations: 'CySEC, ASIC, FSA, FSCA',
    established: '2006',
    country: 'Ireland',
    feature: 'Multi-Asset Trading',
    rating: 4.5
  },
  {
    slug: 'oanda',
    name: 'OANDA',
    description: 'OANDA is a well-established forex broker known for competitive spreads, advanced trading tools, and comprehensive market research.',
    min_deposit: 0,
    regulations: 'FCA, NFA, CFTC, IIROC',
    established: '1996',
    country: 'USA',
    feature: 'Advanced Trading Tools',
    rating: 4.6
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
    rating: 4.8
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
    rating: 4.4
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
    rating: 4.5
  }
];

/**
 * Generate enhanced template code for a broker
 */
function generateBrokerTemplate(broker) {
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
  console.log('🚀 Generating Enhanced Templates for Batch 2 Brokers...\n');
  
  BATCH_2_BROKERS.forEach((broker, index) => {
    console.log(`${index + 1}. ${broker.name} (${broker.slug})`);
    console.log(`   Description: ${broker.description}`);
    console.log(`   Rating: ${broker.rating}/5`);
    console.log(`   Min Deposit: $${broker.min_deposit}`);
    console.log(`   Regulations: ${broker.regulations}`);
    console.log(`   Feature: ${broker.feature}\n`);
  });
  
  console.log('📋 BATCH 2 SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Brokers: ${BATCH_2_BROKERS.length}`);
  console.log(`Average Rating: ${(BATCH_2_BROKERS.reduce((sum, b) => sum + b.rating, 0) / BATCH_2_BROKERS.length).toFixed(1)}/5`);
  console.log(`Established Range: ${Math.min(...BATCH_2_BROKERS.map(b => parseInt(b.established)))} - ${Math.max(...BATCH_2_BROKERS.map(b => parseInt(b.established)))}`);
  
  console.log('\n💡 NEXT STEPS');
  console.log('='.repeat(50));
  console.log('1. Apply enhanced template to each broker page');
  console.log('2. Test functionality and schema markup');
  console.log('3. Validate with Google Rich Results Test');
  console.log('4. Monitor performance improvements');
  console.log('5. Proceed with Batch 3');
  
  console.log('\n✅ Batch 2 preparation complete!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { BATCH_2_BROKERS, generateBrokerTemplate };
