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
    name: "FxPro",
    slug: "fxpro",
    description: "FxPro is a European regulated broker offering forex and CFD trading with multiple platforms and competitive trading conditions.",
    logo_url: "/images/brokers/fxpro.png",
    website_url: "https://www.fxpro.com",
    overall_rating: 4.4,
    min_deposit: 100,
    regulations: "FCA, CySEC, FSCA, SCB",
    established: "2006",
    country: "UK",
    feature: "European Regulation",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function FxProReviewPage() {
  // FxPro broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "d6000000-0000-0000-0000-000000000260",
    name: "FxPro",
    slug: "fxpro",
    logo_url: "/images/brokers/fxpro.png",
    description: "FxPro is a European regulated broker offering forex and CFD trading with multiple platforms and competitive trading conditions.",
    min_deposit: 100,
    max_leverage: "1:500",
    regulations: "FCA, CySEC, FSCA, SCB",
    trading_platforms: "MT4, MT5, cTrader, FxPro Edge",
    spreads_from: "From 0.6 pips",
    account_types: ["Standard", "Professional"],
    country: "UK",
    established: "2006",
    overall_rating: 4.4,
    pros: ["Multiple platforms","Strong regulation","No dealing desk","Advanced tools"],
    cons: ["Higher spreads on standard","Inactivity fees","Limited crypto options"],
    educational_resources: true,
    feature: "European Regulation",
    website_url: "https://www.fxpro.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is FxPro regulated?",
            "answer": "FxPro is regulated by FCA, CySEC, FSCA, and SCB, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
            "question": "What is the minimum deposit for FxPro?",
            "answer": "FxPro has a minimum deposit of $100 for most account types."
      },
      {
            "question": "What trading platforms does FxPro offer?",
            "answer": "FxPro offers MetaTrader 4, MetaTrader 5, cTrader, and its proprietary FxPro Edge platform."
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
  const headline = "FxPro is a european regulation broker known for its competitive trading conditions and professional trading environment. With 4 regulatory licenses and established operations since 2006, FxPro serves traders seeking european regulation.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}