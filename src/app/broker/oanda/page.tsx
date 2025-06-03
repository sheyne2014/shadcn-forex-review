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
    name: "OANDA",
    slug: "oanda",
    description: "OANDA is a well-established forex broker known for competitive spreads, advanced trading tools, and comprehensive market research.",
    logo_url: "/images/brokers/oanda.png",
    website_url: "https://www.oanda.com",
    overall_rating: 4.6,
    min_deposit: 0,
    regulations: "FCA, NFA, CFTC, IIROC",
    established: "1996",
    country: "USA",
    feature: "Advanced Trading Tools",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateBrokerMetadata(broker);
}

export default async function OANDAReviewPage() {
  // OANDA broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b5000000-0000-0000-0000-000000000050",
    name: "OANDA",
    slug: "oanda",
    logo_url: "/images/brokers/oanda.png",
    description: "OANDA is a well-established forex broker known for competitive spreads, advanced trading tools, and comprehensive market research.",
    min_deposit: 0,
    max_leverage: "1:500",
    regulations: "FCA, NFA, CFTC, IIROC",
    trading_platforms: "OANDA Trade, MT4",
    spreads_from: "From 1.2 pips",
    account_types: ["Standard", "Professional"],
    country: "USA",
    established: "1996",
    overall_rating: 4.6,
    pros: ["No minimum deposit","Fractional pip pricing","Advanced charting"],
    cons: ["Higher spreads on standard account","Limited cryptocurrency options"],
    educational_resources: true,
    feature: "Advanced Trading Tools",
    website_url: "https://www.oanda.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is OANDA regulated?",
            "answer": "OANDA is regulated by FCA, NFA, CFTC, and IIROC, ensuring comprehensive regulatory oversight."
      },
      {
            "question": "What is the minimum deposit for OANDA?",
            "answer": "OANDA has no minimum deposit requirement, making it accessible to all traders."
      },
      {
            "question": "What trading platforms does OANDA offer?",
            "answer": "OANDA offers its proprietary OANDA Trade platform and MetaTrader 4 (MT4)."
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
  const headline = "OANDA is a advanced trading tools broker known for its competitive trading conditions and professional trading environment. With 4 regulatory licenses and established operations since 1996, OANDA serves traders seeking advanced trading tools.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}