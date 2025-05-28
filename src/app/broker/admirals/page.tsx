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
    name: "Admirals",
    slug: "admirals",
    description: "Admirals is a well-established multi-asset broker offering forex, CFDs, and crypto trading with strong regulation across multiple jurisdictions.",
    logo_url: "/images/brokers/admirals.png",
    website_url: "https://www.admirals.com",
    overall_rating: 4.6,
    min_deposit: 100,
    regulations: "FCA, CySEC, ASIC, EFSA",
    established: "2001",
    country: "Estonia",
    feature: "Multi-Asset Broker",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function AdmiralsReviewPage() {
  // Admirals broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "d2000000-0000-0000-0000-000000000220",
    name: "Admirals",
    slug: "admirals",
    logo_url: "/images/brokers/admirals.png",
    description: "Admirals is a well-established multi-asset broker offering forex, CFDs, and crypto trading with strong regulation across multiple jurisdictions.",
    min_deposit: 100,
    max_leverage: "1:500",
    regulations: "FCA, CySEC, ASIC, EFSA",
    trading_platforms: "MT4, MT5, MetaTrader WebTrader",
    spreads_from: "From 0.5 pips",
    account_types: ["Standard", "Professional"],
    country: "Estonia",
    established: "2001",
    overall_rating: 4.6,
    pros: ["Strong regulation","Multiple platforms","Educational resources","Negative balance protection"],
    cons: ["Limited US availability","Inactivity fees","Complex fee structure"],
    educational_resources: true,
    feature: "Multi-Asset Broker",
    website_url: "https://www.admirals.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is Admirals regulated?",
            "answer": "Admirals is regulated by FCA, CySEC, ASIC, and EFSA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
            "question": "What is the minimum deposit for Admirals?",
            "answer": "Admirals has a minimum deposit of $100 for most account types."
      },
      {
            "question": "What trading platforms does Admirals offer?",
            "answer": "Admirals offers MetaTrader 4, MetaTrader 5, and MetaTrader WebTrader platforms."
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
  const headline = "Admirals is a multi-asset broker broker known for its competitive trading conditions and professional trading environment. With 4 regulatory licenses and established operations since 2001, Admirals serves traders seeking multi-asset broker.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}