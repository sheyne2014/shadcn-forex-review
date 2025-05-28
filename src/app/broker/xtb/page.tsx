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
    name: "XTB",
    slug: "xtb",
    description: "XTB is a leading European broker offering award-winning trading platforms and comprehensive market access. Key features include FCA, CySEC, KNF regulation, $0 min deposit, xStation 5 platform. Particularly suitable for European traders seeking stocks, forex, and CFDs.",
    logo_url: "/images/brokers/xtb.png",
    website_url: "https://www.xtb.com",
    overall_rating: 4.5,
    min_deposit: 0,
    regulations: "FCA, CySEC, KNF, IFSC",
    established: "2002",
    country: "Poland",
    feature: "Award-Winning Platform",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function XTBReviewPage() {
  // XTB broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "ba000000-0000-0000-0000-0000000000a0",
    name: "XTB",
    slug: "xtb",
    logo_url: "/images/brokers/xtb.png",
    description: "XTB is a leading European broker offering award-winning trading platforms and comprehensive market access. Key features include FCA, CySEC, KNF regulation, $0 min deposit, xStation 5 platform. Particularly suitable for European traders seeking stocks, forex, and CFDs.",
    min_deposit: 0,
    max_leverage: "1:500",
    regulations: "FCA, CySEC, KNF, IFSC",
    trading_platforms: "xStation 5, MT4",
    spreads_from: "From 0.8 pips",
    account_types: ["Standard", "Professional"],
    country: "Poland",
    established: "2002",
    overall_rating: 4.5,
    pros: ["No minimum deposit","Award-winning xStation platform","Comprehensive education","Stock and ETF investing"],
    cons: ["Limited cryptocurrency options","Inactivity fees apply"],
    educational_resources: true,
    feature: "Award-Winning Platform",
    website_url: "https://www.xtb.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
        "question": "Is XTB regulated?",
        "answer": "XTB is regulated by FCA, CySEC, KNF, and IFSC, ensuring strong regulatory oversight across multiple jurisdictions."
      },
      {
        "question": "What is the minimum deposit for XTB?",
        "answer": "XTB has no minimum deposit requirement, making it accessible to all traders."
      },
      {
        "question": "What trading platforms does XTB offer?",
        "answer": "XTB offers its award-winning xStation 5 platform and MetaTrader 4 (MT4)."
      }
    ]
  };

  // Similar brokers for recommendation with enhanced typing
  const similarBrokers: SimilarBroker[] = [
    {
      id: "etoro",
      name: "eToro",
      logo_url: "/images/brokers/etoro.png",
      overall_rating: 4.5,
      min_deposit: 50,
      max_leverage: "1:30",
      regulations: "FCA, CySEC, ASIC",
      key_feature: "Social trading platform",
      website_url: "https://www.etoro.com",
      spreads_from: "1.0 pips"
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
  const headline = "XTB is an award-winning European broker known for its innovative xStation 5 platform and comprehensive educational resources. With no minimum deposit and access to stocks, forex, and CFDs, XTB serves traders of all levels across Europe and beyond.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}