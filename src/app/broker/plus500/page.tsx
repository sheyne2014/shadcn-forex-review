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
    name: "Plus500",
    slug: "plus500",
    description: "Plus500 is a leading CFD provider offering simple and intuitive trading platform. Key features include FCA, CySEC, ASIC regulation, $100 min deposit, 1:30 leverage. Particularly suitable for beginners and retail traders seeking straightforward CFD trading.",
    logo_url: "/images/brokers/plus500.png",
    website_url: "https://www.plus500.com",
    overall_rating: 4.4,
    min_deposit: 100,
    regulations: "FCA, CySEC, ASIC, MAS",
    established: "2008",
    country: "Israel",
    feature: "Simple CFD Trading",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateBrokerMetadata(broker);
}

export default async function Plus500ReviewPage() {
  // Plus500 broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b7000000-0000-0000-0000-000000000070",
    name: "Plus500",
    slug: "plus500",
    logo_url: "/images/brokers/plus500.png",
    description: "Plus500 is a leading CFD provider offering simple and intuitive trading platform. Key features include FCA, CySEC, ASIC regulation, $100 min deposit, 1:30 leverage. Particularly suitable for beginners and retail traders seeking straightforward CFD trading.",
    min_deposit: 100,
    max_leverage: "1:500",
    regulations: "FCA, CySEC, ASIC, MAS",
    trading_platforms: "Plus500 WebTrader, Plus500 Mobile",
    spreads_from: "Variable spreads",
    account_types: ["Standard", "Professional"],
    country: "Israel",
    established: "2008",
    overall_rating: 4.4,
    pros: ["Simple and intuitive platform","No commission trading","Strong regulation","Wide range of CFDs"],
    cons: ["Limited educational resources","No MT4/MT5 support","Weekend fees on positions"],
    educational_resources: true,
    feature: "Simple CFD Trading",
    website_url: "https://www.plus500.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
            "question": "Is Plus500 regulated?",
            "answer": "Plus500 is regulated by FCA, CySEC, ASIC, and MAS, ensuring comprehensive regulatory oversight."
      },
      {
            "question": "What is the minimum deposit for Plus500?",
            "answer": "The minimum deposit for Plus500 is $100."
      },
      {
            "question": "What trading platforms does Plus500 offer?",
            "answer": "Plus500 offers its proprietary WebTrader platform and mobile applications for iOS and Android."
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
  const headline = "Plus500 is a user-friendly CFD trading platform known for its simplicity and wide range of tradeable instruments. With strong regulatory oversight and commission-free trading, Plus500 caters to retail traders who prefer straightforward, no-frills trading experiences.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}