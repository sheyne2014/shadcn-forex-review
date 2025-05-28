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
    name: "Saxo Bank",
    slug: "saxo-bank",
    description: "Saxo Bank is a premium Danish investment bank offering advanced trading platforms, comprehensive research, and institutional-grade services.",
    logo_url: "/images/brokers/saxo-bank.png",
    website_url: "https://www.saxobank.com",
    overall_rating: 4.6,
    min_deposit: 10000,
    regulations: "DFSA, FCA, FINMA, MAS",
    established: "1992",
    country: "Denmark",
    feature: "Premium Trading",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function SaxoBankReviewPage() {
  // Saxo Bank broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b9000000-0000-0000-0000-000000000090",
    name: "Saxo Bank",
    slug: "saxo-bank",
    logo_url: "/images/brokers/saxo-bank.png",
    description: "Saxo Bank is a premium Danish investment bank offering advanced trading platforms, comprehensive research, and institutional-grade services.",
    min_deposit: 10000,
    max_leverage: "1:500",
    regulations: "FCA, DFSA, FINMA, ASIC",
    trading_platforms: "SaxoTraderGO, SaxoTraderPRO",
    spreads_from: "From 0.4 pips",
    account_types: ["Standard", "Professional"],
    country: "Denmark",
    established: "1992",
    overall_rating: 4.6,
    pros: ["Premium research and analysis","Global market access","Professional-grade tools","Comprehensive asset coverage"],
    cons: ["High minimum deposit","Complex fee structure","Not suitable for beginners"],
    educational_resources: true,
    feature: "Premium Trading",
    website_url: "https://www.saxobank.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is Saxo Bank regulated?",
            "answer": "Saxo Bank is regulated by FCA, DFSA, FINMA, and ASIC among others, with operations in major financial centers worldwide."
      },
      {
            "question": "What is the minimum deposit for Saxo Bank?",
            "answer": "The minimum deposit for Saxo Bank is $10,000, reflecting its focus on professional traders."
      },
      {
            "question": "What trading platforms does Saxo Bank offer?",
            "answer": "Saxo Bank offers SaxoTraderGO for beginners and SaxoTraderPRO for advanced traders."
      }
]
  };

  // Similar brokers for recommendation with enhanced typing
  const similarBrokers: SimilarBroker[] = [
    {
      id: "interactive-brokers",
      name: "Interactive Brokers",
      logo_url: "/images/brokers/interactive-brokers.png",
      overall_rating: 4.7,
      min_deposit: 0,
      max_leverage: "1:100",
      regulations: "SEC, FINRA, CFTC, FCA",
      key_feature: "Professional platform",
      website_url: "https://www.interactivebrokers.com",
      spreads_from: "0.2 pips"
    },
    {
      id: "ig",
      name: "IG",
      logo_url: "/images/brokers/ig.png",
      overall_rating: 4.5,
      min_deposit: 250,
      max_leverage: "1:500",
      regulations: "FCA, ASIC, MAS, BaFin",
      key_feature: "CFD market leader",
      website_url: "https://www.ig.com",
      spreads_from: "0.6 pips"
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
    }
  ];

  // Generate headline for the broker
  const headline = "Saxo Bank is a premium trading broker known for its competitive trading conditions and professional trading environment. With 4 regulatory licenses and established operations since 1992, Saxo Bank serves traders seeking premium trading.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}