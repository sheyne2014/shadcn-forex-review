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
    name: "IC Markets",
    slug: "ic-markets",
    description: "IC Markets is a leading Australian broker offering ultra-low spreads and institutional-grade execution. Key features include ASIC, CySEC, FSA regulation, $200 min deposit, True ECN execution. Particularly suitable for professional traders seeking the tightest spreads and fastest execution.",
    logo_url: "/images/brokers/ic-markets.png",
    website_url: "https://www.icmarkets.com",
    overall_rating: 4.9,
    min_deposit: 200,
    regulations: "ASIC, CySEC, FSA",
    established: "2007",
    country: "Australia",
    feature: "Ultra-Low Spreads",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateBrokerMetadata(broker);
}

export default async function ICMarketsReviewPage() {
  // IC Markets broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b3000000-0000-0000-0000-000000000030",
    name: "IC Markets",
    slug: "ic-markets",
    logo_url: "/images/brokers/ic-markets.png",
    description: "IC Markets is a leading Australian broker offering ultra-low spreads and institutional-grade execution. Key features include ASIC, CySEC, FSA regulation, $200 min deposit, True ECN execution. Particularly suitable for professional traders seeking the tightest spreads and fastest execution.",
    min_deposit: 200,
    max_leverage: "1:500",
    regulations: "ASIC, CySEC, FSA",
    trading_platforms: "MT4, MT5, cTrader",
    spreads_from: "0.0 pips",
    account_types: ["Standard", "Raw Spread", "cTrader"],
    country: "Australia",
    established: "2007",
    overall_rating: 4.9,
    pros: [
      "Ultra-low spreads from 0.0 pips",
      "Lightning-fast execution speeds",
      "Wide range of trading instruments",
      "Multiple platform options including cTrader",
      "Strong regulation and client fund protection"
    ],
    cons: [
      "Limited educational resources",
      "No fixed spreads option",
      "Higher minimum deposit than some competitors"
    ],
    educational_resources: false,
    feature: "Ultra-Low Spreads",
    website_url: "https://www.icmarkets.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
        question: "Is IC Markets regulated?",
        answer: "IC Markets is regulated by ASIC, CySEC, and FSA, ensuring the highest standards of client protection and fund security."
      },
      {
        question: "What is the minimum deposit for IC Markets?",
        answer: "The minimum deposit for IC Markets is $200."
      },
      {
        question: "What trading platforms does IC Markets offer?",
        answer: "IC Markets offers MetaTrader 4 (MT4), MetaTrader 5 (MT5), and cTrader platforms for all devices."
      }
    ]
  };

  // Similar brokers for recommendation with enhanced typing
  const similarBrokers: SimilarBroker[] = [
    {
      id: "pepperstone",
      name: "Pepperstone",
      logo_url: "/images/brokers/pepperstone.png",
      overall_rating: 4.8,
      min_deposit: 200,
      max_leverage: "1:500",
      regulations: "FCA, ASIC, CySEC",
      key_feature: "Competitive spreads",
      website_url: "https://www.pepperstone.com",
      spreads_from: "0.0 pips"
    },
    {
      id: "xm",
      name: "XM",
      logo_url: "/images/brokers/xm.png",
      overall_rating: 4.7,
      min_deposit: 5,
      max_leverage: "1:888",
      regulations: "CySEC, ASIC, IFSC",
      key_feature: "Low minimum deposit",
      website_url: "https://www.xm.com",
      spreads_from: "1.0 pips"
    },
    {
      id: "interactive-brokers",
      name: "Interactive Brokers",
      logo_url: "/images/brokers/interactive-brokers.png",
      overall_rating: 4.8,
      min_deposit: 0,
      max_leverage: "1:50",
      regulations: "SEC, FINRA, FCA",
      key_feature: "Global market access",
      website_url: "https://www.interactivebrokers.com",
      spreads_from: "0.2 pips"
    }
  ];

  // Generate headline for the broker
  const headline = "IC Markets is a premier forex and CFD broker renowned for offering some of the tightest spreads in the industry, starting from 0.0 pips. With lightning-fast execution speeds and comprehensive platform options, IC Markets caters to professional traders and scalpers who demand the best trading conditions.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}
