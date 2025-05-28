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
    name: "Exness",
    slug: "exness",
    description: "Exness is a global forex broker offering ultra-low spreads, instant execution, and unlimited leverage for professional traders.",
    logo_url: "/images/brokers/exness.png",
    website_url: "https://www.exness.com",
    overall_rating: 4.4,
    min_deposit: 1,
    regulations: "FCA, CySEC, FSA, FSCA",
    established: "2008",
    country: "Cyprus",
    feature: "Ultra-Low Spreads",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function ExnessReviewPage() {
  // Exness broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "d5000000-0000-0000-0000-000000000250",
    name: "Exness",
    slug: "exness",
    logo_url: "/images/brokers/exness.png",
    description: "Exness is a global forex broker offering ultra-low spreads, instant execution, and unlimited leverage for professional traders.",
    min_deposit: 0,
    max_leverage: "1:500",
    regulations: "FCA, CySEC, FSCA",
    trading_platforms: "MT4, MT5, Exness Terminal",
    spreads_from: "From 0.3 pips",
    account_types: ["Standard", "Professional"],
    country: "Cyprus",
    established: "2008",
    overall_rating: 4.4,
    pros: ["No minimum deposit","Unlimited leverage","Fast withdrawals","Multiple account types"],
    cons: ["High leverage risks","Limited educational content","Complex for beginners"],
    educational_resources: true,
    feature: "Ultra-Low Spreads",
    website_url: "https://www.exness.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is Exness regulated?",
            "answer": "Exness is regulated by FCA, CySEC, and FSCA, ensuring comprehensive regulatory oversight."
      },
      {
            "question": "What is the minimum deposit for Exness?",
            "answer": "Exness has no minimum deposit requirement, making it accessible to all traders."
      },
      {
            "question": "What is unlimited leverage?",
            "answer": "Exness offers unlimited leverage for experienced traders, allowing maximum trading flexibility with proper risk management."
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
  const headline = "Exness is a ultra-low spreads broker known for its competitive trading conditions and professional trading environment. With 3 regulatory licenses and established operations since 2008, Exness serves traders seeking ultra-low spreads.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}