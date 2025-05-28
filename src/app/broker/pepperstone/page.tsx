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
    name: "Pepperstone",
    slug: "pepperstone",
    description: "Pepperstone is a leading forex and CFD broker offering competitive spreads and advanced trading tools. Key features include FCA, ASIC, CySEC regulation, $200 min deposit, 1:500 leverage. Particularly suitable for intermediate and professional traders seeking excellent execution speeds.",
    logo_url: "/images/brokers/pepperstone.png",
    website_url: "https://www.pepperstone.com",
    overall_rating: 4.8,
    min_deposit: 200,
    regulations: "FCA, ASIC, CySEC, DFSA, SCB",
    established: "2010",
    country: "Australia",
    feature: "Advanced Trading Tools",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function PepperstoneReviewPage() {
  // Pepperstone broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b4000000-0000-0000-0000-000000000040",
    name: "Pepperstone",
    slug: "pepperstone",
    logo_url: "/images/brokers/pepperstone.png",
    description: "Pepperstone is a leading forex and CFD broker offering competitive spreads and advanced trading tools. Key features include FCA, ASIC, CySEC regulation, $200 min deposit, 1:500 leverage. Particularly suitable for intermediate and professional traders seeking excellent execution speeds.",
    min_deposit: 200,
    max_leverage: "1:500",
    regulations: "FCA, ASIC, CySEC, DFSA, SCB",
    trading_platforms: "MT4, MT5, cTrader",
    spreads_from: "From 0.0 pips",
    account_types: ["Standard", "Professional"],
    country: "Australia",
    established: "2010",
    overall_rating: 4.8,
    pros: ["Competitive spreads","Advanced trading tools","Excellent customer support"],
    cons: ["Limited product range compared to some competitors","No proprietary trading platform"],
    educational_resources: true,
    feature: "Advanced Trading Tools",
    website_url: "https://www.pepperstone.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is Pepperstone regulated?",
            "answer": "Pepperstone is regulated by FCA, ASIC, CySEC, DFSA, and SCB, ensuring the highest standards of client protection."
      },
      {
            "question": "What is the minimum deposit for Pepperstone?",
            "answer": "The minimum deposit for Pepperstone is $200."
      },
      {
            "question": "What trading platforms does Pepperstone offer?",
            "answer": "Pepperstone offers MetaTrader 4 (MT4), MetaTrader 5 (MT5), and cTrader platforms."
      }
]
  };

  // Similar brokers for recommendation with enhanced typing
  const similarBrokers: SimilarBroker[] = [
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
    },
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
      id: "plus500",
      name: "Plus500",
      logo_url: "/images/brokers/plus500.png",
      overall_rating: 4.4,
      min_deposit: 100,
      max_leverage: "1:500",
      regulations: "FCA, CySEC, ASIC, MAS",
      key_feature: "Simple CFD trading",
      website_url: "https://www.plus500.com",
      spreads_from: "Variable spreads"
    }
  ];

  // Generate headline for the broker
  const headline = "Pepperstone is a premium forex and CFD broker known for its competitive spreads, advanced trading tools, and excellent customer support. With strong regulation across multiple jurisdictions and cutting-edge technology, Pepperstone caters to intermediate and professional traders who demand superior trading conditions.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}