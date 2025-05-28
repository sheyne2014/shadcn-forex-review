import { Metadata } from "next";
import {
  EnhancedBrokerPageTemplate,
  generateEnhancedBrokerMetadata,
  BrokerPageData,
  SimilarBroker
} from "@/components/broker-review/EnhancedBrokerPageTemplate";

// Generate metadata for the broker review page
export async function generateMetadata(): Promise<Metadata> {
  const broker: BrokerPageData = {
    name: "Capital.com",
    slug: "capital-com",
    description: "Capital.com is an AI-powered trading platform offering CFDs on forex, stocks, commodities, and cryptocurrencies with innovative features.",
    logo_url: "/images/brokers/capital-com.png",
    website_url: "https://www.capital.com",
    overall_rating: 4.5,
    min_deposit: 20,
    regulations: "FCA, CySEC, ASIC, NBRB",
    established: "2016",
    country: "UK",
    feature: "AI-Powered Trading",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function CapitalComReviewPage() {
  // Capital.com broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b8000000-0000-0000-0000-000000000080",
    name: "Capital.com",
    slug: "capital-com",
    logo_url: "/images/brokers/capital-com.png",
    description: "Capital.com is an AI-powered trading platform offering CFDs on forex, stocks, commodities, and cryptocurrencies with innovative features.",
    min_deposit: 20,
    max_leverage: "1:500",
    regulations: "FCA, CySEC, ASIC, NBRB",
    trading_platforms: "Capital.com Platform, MT4, TradingView",
    spreads_from: "From 0.6 pips",
    account_types: ["Standard", "Professional"],
    country: "UK",
    established: "2016",
    overall_rating: 4.5,
    pros: ["AI-powered insights","Low minimum deposit","TradingView integration","Comprehensive education"],
    cons: ["Limited cryptocurrency selection","No US clients accepted"],
    educational_resources: true,
    feature: "AI-Powered Trading",
    website_url: "https://www.capital.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is Capital.com regulated?",
            "answer": "Capital.com is regulated by FCA, CySEC, ASIC, and NBRB, ensuring strong regulatory compliance."
      },
      {
            "question": "What is the minimum deposit for Capital.com?",
            "answer": "The minimum deposit for Capital.com is only $20."
      },
      {
            "question": "What trading platforms does Capital.com offer?",
            "answer": "Capital.com offers its proprietary platform, MetaTrader 4, and TradingView integration."
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
  const headline = "Capital.com is a ai-powered trading broker known for its competitive trading conditions and professional trading environment. With 4 regulatory licenses and established operations since 2016, Capital.com serves traders seeking ai-powered trading.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}