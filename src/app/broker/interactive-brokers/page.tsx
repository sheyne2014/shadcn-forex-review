import { Metadata } from "next";
import {
  EnhancedBrokerPageTemplate,
  BrokerPageData,
  SimilarBroker
} from "@/components/broker-review/EnhancedBrokerPageTemplate";
import { generateBrokerMetadata } from "@/lib/broker-metadata";

// Generate metadata for the broker review page
export async function generateMetadata(): Promise<Metadata> {
  const broker: BrokerPageData = {
    name: "Interactive Brokers",
    slug: "interactive-brokers",
    description: "Interactive Brokers is a professional trading platform offering global market access with low costs and advanced tools for serious traders.",
    logo_url: "/images/brokers/interactive-brokers.png",
    website_url: "https://www.interactivebrokers.com",
    overall_rating: 4.8,
    min_deposit: 0,
    regulations: "SEC, FINRA, FCA, IIROC",
    established: "1978",
    country: "USA",
    feature: "Global Market Access",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateBrokerMetadata(broker);
}

export default async function InteractiveBrokersReviewPage() {
  // Interactive Brokers broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b6000000-0000-0000-0000-000000000060",
    name: "Interactive Brokers",
    slug: "interactive-brokers",
    logo_url: "/images/brokers/interactive-brokers.png",
    description: "Interactive Brokers is a professional trading platform offering global market access with low costs and advanced tools for serious traders.",
    min_deposit: 0,
    max_leverage: "1:500",
    regulations: "SEC, FINRA, FCA, IIROC",
    trading_platforms: "TWS, IBKR Mobile",
    spreads_from: "From 0.2 pips",
    account_types: ["Standard", "Professional"],
    country: "USA",
    established: "1978",
    overall_rating: 4.8,
    pros: ["Low costs","Global market access","Advanced tools"],
    cons: ["Complex platform","Not beginner-friendly"],
    educational_resources: true,
    feature: "Global Market Access",
    website_url: "https://www.interactivebrokers.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is Interactive Brokers regulated?",
            "answer": "Interactive Brokers is regulated by SEC, FINRA, FCA, and IIROC among others, with operations in major financial centers worldwide."
      },
      {
            "question": "What is the minimum deposit for Interactive Brokers?",
            "answer": "Interactive Brokers has no minimum deposit requirement for most account types."
      },
      {
            "question": "What trading platforms does Interactive Brokers offer?",
            "answer": "Interactive Brokers offers Trader Workstation (TWS) and IBKR Mobile app with advanced trading capabilities."
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
  const headline = "Interactive Brokers is a global market access broker known for its competitive trading conditions and professional trading environment. With 4 regulatory licenses and established operations since 1978, Interactive Brokers serves traders seeking global market access.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}