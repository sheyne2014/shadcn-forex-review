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
    name: "IG",
    slug: "ig",
    description: "IG is a market leader in CFD trading offering a wide range of markets, competitive spreads, and advanced trading platforms.",
    logo_url: "/images/brokers/ig.png",
    website_url: "https://www.ig.com",
    overall_rating: 4.5,
    min_deposit: 0,
    regulations: "FCA, ASIC, MAS, BaFin",
    established: "1974",
    country: "UK",
    feature: "CFD Market Leader",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateBrokerMetadata(broker);
}

export default async function IGReviewPage() {
  // IG broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "d9000000-0000-0000-0000-000000000290",
    name: "IG",
    slug: "ig",
    logo_url: "/images/brokers/ig.png",
    description: "IG is a market leader in CFD trading offering a wide range of markets, competitive spreads, and advanced trading platforms.",
    min_deposit: 250,
    max_leverage: "1:500",
    regulations: "FCA, ASIC, MAS, BaFin",
    trading_platforms: "IG Platform, MT4, ProRealTime, L2 Dealer",
    spreads_from: "From 0.6 pips",
    account_types: ["Standard", "Professional"],
    country: "UK",
    established: "1974",
    overall_rating: 4.5,
    pros: ["Extensive market coverage","Advanced charting","Strong research","Barrier options"],
    cons: ["Higher minimum deposit","Complex fee structure","Overwhelming for beginners"],
    educational_resources: true,
    feature: "CFD Market Leader",
    website_url: "https://www.ig.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is IG regulated?",
            "answer": "IG is regulated by FCA, ASIC, MAS, and BaFin among others, with operations in major financial centers worldwide."
      },
      {
            "question": "What is the minimum deposit for IG?",
            "answer": "IG has a minimum deposit of $250 for most account types."
      },
      {
            "question": "What are barrier options?",
            "answer": "IG offers barrier options (knock-outs) providing leveraged exposure with guaranteed stop losses and limited risk."
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
  const headline = "IG is a cfd market leader broker known for its competitive trading conditions and professional trading environment. With 4 regulatory licenses and established operations since 1974, IG serves traders seeking cfd market leader.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}