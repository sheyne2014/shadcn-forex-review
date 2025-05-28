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
    name: "XM",
    slug: "xm",
    description: "XM is a global forex and CFD broker offering trading services with MT4 and MT5 platforms. Key features include CySEC, ASIC, IFSC regulation, $5 min deposit, 1:888 leverage. Particularly suitable for beginners and traders seeking extensive educational resources.",
    logo_url: "/images/brokers/xm.png",
    website_url: "https://www.xm.com",
    overall_rating: 4.7,
    min_deposit: 5,
    regulations: "CySEC, ASIC, IFSC",
    established: "2009",
    country: "Cyprus",
    feature: "Educational Excellence",
    published_date: "2025-01-01",
    last_updated: "2025-01-01"
  };

  return generateEnhancedBrokerMetadata(broker);
}

export default async function XMReviewPage() {
  // XM broker data with enhanced SEO structure
  const broker: BrokerPageData = {
    id: "b2000000-0000-0000-0000-000000000020",
    name: "XM",
    slug: "xm",
    logo_url: "/images/brokers/xm.png",
    description: "XM is a global forex and CFD broker offering trading services with MT4 and MT5 platforms. Key features include CySEC, ASIC, IFSC regulation, $5 min deposit, 1:888 leverage. Particularly suitable for beginners and traders seeking extensive educational resources.",
    min_deposit: 5,
    max_leverage: "1:888",
    regulations: "CySEC, ASIC, IFSC",
    trading_platforms: "MT4, MT5",
    spreads_from: "1.0 pips",
    account_types: ["Micro", "Standard", "XM Zero"],
    country: "Cyprus",
    established: "2009",
    overall_rating: 4.7,
    pros: [
      "Very low minimum deposit of $5",
      "Extensive educational resources and webinars",
      "Multi-language customer support",
      "No deposit or withdrawal fees",
      "Regulated by multiple authorities"
    ],
    cons: [
      "Higher spreads compared to some competitors",
      "No cryptocurrency trading available",
      "Limited advanced trading tools"
    ],
    educational_resources: true,
    feature: "Educational Excellence",
    website_url: "https://www.xm.com",
    published_date: "2025-01-01",
    last_updated: "2025-01-01",
    faqs: [
      {
        question: "Is XM regulated?",
        answer: "XM is regulated by CySEC, ASIC, and IFSC, ensuring safety and transparency in financial standards."
      },
      {
        question: "What is the minimum deposit for XM?",
        answer: "The minimum deposit for XM is only $5, making it accessible for beginners."
      },
      {
        question: "What trading platforms does XM offer?",
        answer: "XM offers MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms for desktop, web, and mobile."
      }
    ]
  };

  // Similar brokers for recommendation with enhanced typing
  const similarBrokers: SimilarBroker[] = [
    {
      id: "plus500",
      name: "Plus500",
      logo_url: "/images/brokers/plus500.png",
      overall_rating: 4.4,
      min_deposit: 100,
      max_leverage: "1:30",
      regulations: "FCA, CySEC, ASIC",
      key_feature: "Simple CFD trading",
      website_url: "https://www.plus500.com",
      spreads_from: "Variable"
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
    }
  ];

  // Generate headline for the broker
  const headline = "XM is a well-established forex and CFD broker known for its exceptional educational resources and very low minimum deposit requirement. With comprehensive multi-language support and regulated operations across multiple jurisdictions, XM caters particularly well to beginner traders.";

  return (
    <EnhancedBrokerPageTemplate
      broker={broker}
      similarBrokers={similarBrokers}
      headline={headline}
    />
  );
}
