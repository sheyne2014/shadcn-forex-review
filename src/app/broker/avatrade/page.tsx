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
    name: "AvaTrade",
    slug: "avatrade",
    description: "AvaTrade is a multi-asset broker offering forex, stocks, commodities, and crypto trading with comprehensive regulation and educational resources.",
    logo_url: "/images/brokers/avatrade.png",
    website_url: "https://www.avatrade.com",
    overall_rating: 4.5,
    min_deposit: 100,
    regulations: "CySEC, ASIC, FSA, FSCA",
    established: "2006",
    country: "Ireland",
    feature: "Multi-Asset Trading",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function AvaTradeReviewPage() {
  // AvaTrade broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "d8000000-0000-0000-0000-000000000280",
    name: "AvaTrade",
    slug: "avatrade",
    logo_url: "/images/brokers/avatrade.png",
    description: "AvaTrade is a multi-asset broker offering forex, stocks, commodities, and crypto trading with comprehensive regulation and educational resources.",
    min_deposit: 100,
    max_leverage: "1:500",
    regulations: "CySEC, ASIC, FSA, FSCA",
    trading_platforms: "MT4, MT5, AvaTradeGO, WebTrader",
    spreads_from: "From 0.9 pips",
    account_types: ["Standard", "Professional"],
    country: "Ireland",
    established: "2006",
    overall_rating: 4.5,
    pros: ["Multiple regulations","Copy trading","Educational resources","Multiple platforms"],
    cons: ["Higher spreads","Inactivity fees","Limited crypto selection"],
    educational_resources: true,
    feature: "Multi-Asset Trading",
    website_url: "https://www.avatrade.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is AvaTrade regulated?",
            "answer": "AvaTrade is regulated by CySEC, ASIC, FSA, and FSCA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
            "question": "What is the minimum deposit for AvaTrade?",
            "answer": "AvaTrade has a minimum deposit of $100 for most account types."
      },
      {
            "question": "What copy trading options does AvaTrade offer?",
            "answer": "AvaTrade offers DupliTrade, ZuluTrade, and MQL5 copy trading platforms for automated social trading."
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
  const headline = "AvaTrade is a multi-asset trading broker known for its strong regulatory compliance and professional trading environment. With CySEC, ASIC, FSA, FSCA regulatory licenses and established operations since 2006, AvaTrade serves traders seeking multi-asset trading.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}