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
    name: "FXCM",
    slug: "fxcm",
    description: "FXCM is a global forex broker offering competitive spreads, advanced trading platforms, and comprehensive market analysis.",
    logo_url: "/images/brokers/fxcm.png",
    website_url: "https://www.fxcm.com",
    overall_rating: 4.3,
    min_deposit: 50,
    regulations: "FCA, ASIC, FSCA",
    established: "1999",
    country: "UK",
    feature: "Global Forex Trading",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateBrokerMetadata(broker);
}

export default async function FXCMReviewPage() {
  // FXCM broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "a8000000-0000-0000-0000-000000000680",
    name: "FXCM",
    slug: "fxcm",
    logo_url: "/images/brokers/fxcm.png",
    description: "FXCM is a global forex broker offering competitive spreads, advanced trading platforms, and comprehensive market analysis.",
    min_deposit: 50,
    max_leverage: "1:500",
    regulations: "FCA, ASIC, FSCA",
    trading_platforms: "Trading Station, MT4, FXCM Mobile",
    spreads_from: "From 1.2 pips",
    account_types: ["Standard", "Professional"],
    country: "UK",
    established: "1999",
    overall_rating: 4.3,
    pros: ["Established reputation","Advanced charting","Educational resources","Global presence"],
    cons: ["Higher spreads","Limited crypto options","Account fees"],
    educational_resources: true,
    feature: "Global Forex Trading",
    website_url: "https://www.fxcm.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is FXCM regulated?",
            "answer": "FXCM is regulated by FCA, ASIC, and FSCA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
            "question": "What is the minimum deposit for FXCM?",
            "answer": "FXCM has a minimum deposit of $50 for most trading accounts."
      },
      {
            "question": "What makes FXCM special?",
            "answer": "FXCM offers over 20 years of forex expertise with advanced Trading Station platform and comprehensive education."
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
  const headline = "FXCM is a global forex trading broker known for its competitive trading conditions and professional trading environment. With 3 regulatory licenses and established operations since 1999, FXCM serves traders seeking global forex trading.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}