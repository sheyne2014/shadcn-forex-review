import fs from 'fs';
import path from 'path';

// Broker data from BROKER_DATABASE - BATCH 11
const brokerData = {
  "AMarkets": {
    id: "b0000000-0000-0000-0000-000000000700",
    name: "AMarkets",
    slug: "amarkets",
    logo: "/images/brokers/amarkets.png",
    rating: 4.3,
    minDeposit: 100,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "AMarkets Mobile"],
    regulation: ["VFSC", "FSC"],
    pros: ["Low minimum deposit", "ECN execution", "Multiple account types", "Copy trading"],
    cons: ["Limited regulation", "Offshore jurisdiction", "Limited educational content"],
    url: "https://www.amarkets.com",
    country: "Saint Vincent",
    established: "2007",
    feature: "Multi-Asset ECN Trading",
    description: "AMarkets is a Saint Vincent-based multi-asset broker offering ECN execution with low minimum deposits and copy trading features. Key features include VFSC regulation, $100 min deposit, ECN execution. Particularly suitable for traders seeking affordable multi-asset trading with professional execution. Updated May 2023.",
    headline: "AMarkets is a versatile multi-asset broker renowned for its ECN execution and affordable trading conditions. With copy trading features and multiple account types, AMarkets serves traders seeking professional execution with accessible entry requirements.",
    faqs: [
      {
        question: "Is AMarkets regulated?",
        answer: "AMarkets is regulated by VFSC (Vanuatu Financial Services Commission) and FSC, ensuring regulatory oversight for trading operations."
      },
      {
        question: "What is the minimum deposit for AMarkets?",
        answer: "AMarkets has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes AMarkets special?",
        answer: "AMarkets offers ECN execution with copy trading features and multiple account types for diverse trading needs."
      }
    ]
  },
  "FTX.US": {
    id: "b1000000-0000-0000-0000-000000000710",
    name: "FTX.US",
    slug: "ftxus",
    logo: "/images/brokers/ftxus.png",
    rating: 4.3,
    minDeposit: 0,
    spread: "0.1% trading fee",
    platforms: ["FTX.US Platform", "FTX.US Mobile", "FTX.US Pro"],
    regulation: ["FinCEN", "State Licenses"],
    pros: ["No minimum deposit", "Advanced trading features", "Institutional-grade security", "Wide crypto selection"],
    cons: ["Crypto only", "Complex for beginners", "US restrictions"],
    url: "https://ftx.us",
    country: "USA",
    established: "2020",
    feature: "Advanced Crypto Exchange",
    description: "FTX.US is a US-based cryptocurrency exchange offering advanced trading features with institutional-grade security and wide crypto selection. Key features include FinCEN registration, $0 min deposit, advanced features. Particularly suitable for serious crypto traders seeking professional-grade exchange with US compliance. Updated May 2023.",
    headline: "FTX.US is a premier US cryptocurrency exchange renowned for its advanced trading features and institutional-grade security. With comprehensive crypto offerings and professional tools, FTX.US serves serious crypto traders who demand the highest standards and regulatory compliance.",
    faqs: [
      {
        question: "Is FTX.US regulated?",
        answer: "FTX.US is registered with FinCEN and holds various state licenses, ensuring compliance with US cryptocurrency regulations."
      },
      {
        question: "What is the minimum deposit for FTX.US?",
        answer: "FTX.US has no minimum deposit requirement for cryptocurrency trading."
      },
      {
        question: "What makes FTX.US special?",
        answer: "FTX.US offers advanced crypto trading features with institutional-grade security and US regulatory compliance."
      }
    ]
  },
  "OCTA": {
    id: "b2000000-0000-0000-0000-000000000720",
    name: "OCTA",
    slug: "octa",
    logo: "/images/brokers/octa.png",
    rating: 4.3,
    minDeposit: 25,
    spread: "From 0.6 pips",
    platforms: ["MT4", "MT5", "OCTA Mobile"],
    regulation: ["SVGFSA"],
    pros: ["Very low minimum deposit", "Multiple asset classes", "Educational resources", "Copy trading"],
    cons: ["Limited regulation", "Offshore jurisdiction", "Higher spreads"],
    url: "https://www.octa.com",
    country: "St. Vincent",
    established: "2011",
    feature: "Accessible Multi-Asset Trading",
    description: "OCTA is a St. Vincent-based multi-asset broker offering very low minimum deposits with forex, crypto, and indices trading. Key features include SVGFSA regulation, $25 min deposit, multiple assets. Particularly suitable for beginner traders seeking accessible entry to diverse markets with educational support. Updated May 2023.",
    headline: "OCTA is an accessible multi-asset broker renowned for its very low minimum deposits and comprehensive educational resources. With diverse trading options and copy trading features, OCTA serves beginner and intermediate traders seeking affordable access to multiple markets.",
    faqs: [
      {
        question: "Is OCTA regulated?",
        answer: "OCTA is regulated by SVGFSA (Saint Vincent and the Grenadines Financial Services Authority), providing regulatory oversight for trading operations."
      },
      {
        question: "What is the minimum deposit for OCTA?",
        answer: "OCTA has a very low minimum deposit of just $25 for most trading accounts."
      },
      {
        question: "What makes OCTA special?",
        answer: "OCTA offers very low minimum deposits with access to forex, crypto, and indices, plus comprehensive educational resources."
      }
    ]
  },
  "FBS": {
    id: "b3000000-0000-0000-0000-000000000730",
    name: "FBS",
    slug: "fbs",
    logo: "/images/brokers/fbs.png",
    rating: 4.3,
    minDeposit: 5,
    spread: "From 0.5 pips",
    platforms: ["MT4", "MT5", "FBS Mobile"],
    regulation: ["IFSC", "CySEC"],
    pros: ["Ultra-low minimum deposit", "High leverage", "Multiple account types", "Educational resources"],
    cons: ["High leverage risks", "Complex fee structure", "Limited advanced tools"],
    url: "https://www.fbs.com",
    country: "Belize",
    established: "2009",
    feature: "Ultra-Accessible Trading",
    description: "FBS is a Belize-based multi-asset broker offering ultra-low minimum deposits with high leverage and comprehensive educational resources. Key features include IFSC, CySEC regulation, $5 min deposit, high leverage. Particularly suitable for beginner traders seeking ultra-accessible entry with educational support. Updated May 2023.",
    headline: "FBS is an ultra-accessible broker renowned for its extremely low minimum deposits and comprehensive educational programs. With high leverage options and multiple account types, FBS serves traders seeking the most affordable entry to forex and CFD markets.",
    faqs: [
      {
        question: "Is FBS regulated?",
        answer: "FBS is regulated by IFSC (Belize) and CySEC (Cyprus), ensuring regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for FBS?",
        answer: "FBS has an ultra-low minimum deposit of just $5 for most trading accounts."
      },
      {
        question: "What makes FBS special?",
        answer: "FBS offers ultra-low minimum deposits with high leverage options and comprehensive educational resources."
      }
    ]
  },
  "GO Markets": {
    id: "b4000000-0000-0000-0000-000000000740",
    name: "GO Markets",
    slug: "go-markets",
    logo: "/images/brokers/go-markets.png",
    rating: 4.3,
    minDeposit: 200,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "GO Markets Mobile"],
    regulation: ["ASIC", "VFSC"],
    pros: ["Strong regulation", "ECN execution", "Professional tools", "Multiple account types"],
    cons: ["Higher minimum deposit", "Limited crypto options", "Complex for beginners"],
    url: "https://www.gomarkets.com",
    country: "Australia",
    established: "2006",
    feature: "Professional ECN Trading",
    description: "GO Markets is an Australian-based ECN broker offering professional trading tools with strong ASIC regulation and ECN execution. Key features include ASIC, VFSC regulation, $200 min deposit, ECN execution. Particularly suitable for professional traders seeking regulated ECN conditions with advanced tools. Updated May 2023.",
    headline: "GO Markets is a professional ECN broker renowned for its strong ASIC regulation and advanced trading tools. With ECN execution and multiple account types, GO Markets serves professional traders seeking regulated access to institutional-grade trading conditions.",
    faqs: [
      {
        question: "Is GO Markets regulated?",
        answer: "GO Markets is regulated by ASIC (Australia) and VFSC, ensuring strong regulatory oversight and client protection."
      },
      {
        question: "What is the minimum deposit for GO Markets?",
        answer: "GO Markets has a minimum deposit of $200 for most trading accounts."
      },
      {
        question: "What makes GO Markets special?",
        answer: "GO Markets offers professional ECN execution with strong ASIC regulation and advanced trading tools."
      }
    ]
  },
  "HFM": {
    id: "b5000000-0000-0000-0000-000000000750",
    name: "HFM",
    slug: "hfm",
    logo: "/images/brokers/hfm.png",
    rating: 4.3,
    minDeposit: 5,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "HFM Mobile"],
    regulation: ["CySEC", "DFSA", "FSCA"],
    pros: ["Ultra-low minimum deposit", "ECN execution", "Strong regulation", "Multiple account types"],
    cons: ["Complex fee structure", "Limited educational content", "High leverage risks"],
    url: "https://www.hfm.com",
    country: "Cyprus",
    established: "2010",
    feature: "Ultra-Accessible ECN Trading",
    description: "HFM is a Cyprus-based ECN broker offering ultra-low minimum deposits with strong regulatory oversight and ECN execution. Key features include CySEC, DFSA regulation, $5 min deposit, ECN execution. Particularly suitable for traders seeking ultra-accessible ECN conditions with strong regulation. Updated May 2023.",
    headline: "HFM is a regulated ECN broker renowned for its ultra-low minimum deposits and strong regulatory oversight. With ECN execution and multiple account types, HFM serves traders seeking accessible entry to professional trading conditions with comprehensive regulation.",
    faqs: [
      {
        question: "Is HFM regulated?",
        answer: "HFM is regulated by CySEC, DFSA, and FSCA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for HFM?",
        answer: "HFM has an ultra-low minimum deposit of just $5 for most trading accounts."
      },
      {
        question: "What makes HFM special?",
        answer: "HFM offers ultra-low minimum deposits with ECN execution and strong multi-jurisdictional regulation."
      }
    ]
  },
  "Moneta Markets": {
    id: "b6000000-0000-0000-0000-000000000760",
    name: "Moneta Markets",
    slug: "moneta-markets",
    logo: "/images/brokers/moneta-markets.png",
    rating: 4.3,
    minDeposit: 50,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "Moneta Mobile"],
    regulation: ["ASIC", "VFSC"],
    pros: ["Strong ASIC regulation", "ECN execution", "Competitive spreads", "Professional tools"],
    cons: ["Limited crypto options", "Higher minimum than some", "Complex for beginners"],
    url: "https://www.monetamarkets.com",
    country: "Australia",
    established: "2018",
    feature: "ASIC-Regulated ECN Trading",
    description: "Moneta Markets is an Australian-based ECN broker offering strong ASIC regulation with competitive spreads and professional trading tools. Key features include ASIC, VFSC regulation, $50 min deposit, ECN execution. Particularly suitable for traders seeking ASIC-regulated ECN conditions with professional tools. Updated May 2023.",
    headline: "Moneta Markets is a professionally regulated ECN broker renowned for its strong ASIC oversight and competitive spreads. With ECN execution and advanced tools, Moneta Markets serves traders seeking regulated access to institutional-grade trading conditions.",
    faqs: [
      {
        question: "Is Moneta Markets regulated?",
        answer: "Moneta Markets is regulated by ASIC (Australia) and VFSC, ensuring strong regulatory oversight and client protection."
      },
      {
        question: "What is the minimum deposit for Moneta Markets?",
        answer: "Moneta Markets has a minimum deposit of $50 for most trading accounts."
      },
      {
        question: "What makes Moneta Markets special?",
        answer: "Moneta Markets offers strong ASIC regulation with ECN execution and competitive spreads."
      }
    ]
  },
  "Liquid": {
    id: "b7000000-0000-0000-0000-000000000770",
    name: "Liquid",
    slug: "liquid",
    logo: "/images/brokers/liquid.png",
    rating: 4.3,
    minDeposit: 0,
    spread: "0.1% trading fee",
    platforms: ["Liquid Platform", "Liquid Mobile", "Liquid Pro"],
    regulation: ["JFSA", "FSA"],
    pros: ["No minimum deposit", "High liquidity", "Advanced trading features", "Strong security"],
    cons: ["Crypto only", "Complex interface", "Limited educational content"],
    url: "https://www.liquid.com",
    country: "Japan",
    established: "2014",
    feature: "High-Liquidity Crypto Exchange",
    description: "Liquid is a Japan-based cryptocurrency exchange offering high liquidity with advanced trading features and strong security measures. Key features include JFSA regulation, $0 min deposit, high liquidity. Particularly suitable for serious crypto traders seeking high liquidity and advanced features with Japanese regulatory oversight. Updated May 2023.",
    headline: "Liquid is a premier Japanese cryptocurrency exchange renowned for its high liquidity and advanced trading features. With strong regulatory oversight and institutional-grade security, Liquid serves professional crypto traders who demand the highest liquidity and reliability.",
    faqs: [
      {
        question: "Is Liquid regulated?",
        answer: "Liquid is regulated by JFSA (Japan Financial Services Agency) and FSA, ensuring comprehensive oversight for cryptocurrency trading."
      },
      {
        question: "What is the minimum deposit for Liquid?",
        answer: "Liquid has no minimum deposit requirement for cryptocurrency trading."
      },
      {
        question: "What makes Liquid special?",
        answer: "Liquid offers high liquidity cryptocurrency trading with advanced features and strong Japanese regulation."
      }
    ]
  },
  "Phemex": {
    id: "b8000000-0000-0000-0000-000000000780",
    name: "Phemex",
    slug: "phemex",
    logo: "/images/brokers/phemex.png",
    rating: 4.3,
    minDeposit: 0,
    spread: "0.075% trading fee",
    platforms: ["Phemex Platform", "Phemex Mobile", "Phemex API"],
    regulation: ["Various jurisdictions", "Compliance programs"],
    pros: ["No minimum deposit", "High leverage", "Advanced derivatives", "Fast execution"],
    cons: ["Crypto only", "High leverage risks", "Complex for beginners"],
    url: "https://www.phemex.com",
    country: "Singapore",
    established: "2019",
    feature: "Advanced Crypto Derivatives",
    description: "Phemex is a Singapore-based cryptocurrency derivatives exchange offering advanced trading features with high leverage and fast execution. Key features include compliance programs, $0 min deposit, advanced derivatives. Particularly suitable for experienced crypto traders seeking advanced derivatives and high leverage trading. Updated May 2023.",
    headline: "Phemex is an advanced cryptocurrency derivatives exchange renowned for its high leverage options and fast execution. With sophisticated trading tools and derivatives products, Phemex serves experienced crypto traders seeking professional-grade derivatives trading.",
    faqs: [
      {
        question: "Is Phemex regulated?",
        answer: "Phemex operates under various jurisdictional compliance programs, ensuring adherence to applicable cryptocurrency regulations."
      },
      {
        question: "What is the minimum deposit for Phemex?",
        answer: "Phemex has no minimum deposit requirement for cryptocurrency trading."
      },
      {
        question: "What makes Phemex special?",
        answer: "Phemex offers advanced cryptocurrency derivatives with high leverage and fast execution for professional traders."
      }
    ]
  },
  "FxPrimus": {
    id: "b9000000-0000-0000-0000-000000000790",
    name: "FxPrimus",
    slug: "fxprimus",
    logo: "/images/brokers/fxprimus.png",
    rating: 4.3,
    minDeposit: 100,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "FxPrimus Mobile"],
    regulation: ["CySEC", "VFSC"],
    pros: ["ECN execution", "Competitive spreads", "Multiple account types", "Professional tools"],
    cons: ["Limited regulation", "Complex fee structure", "Limited educational content"],
    url: "https://www.fxprimus.com",
    country: "Cyprus",
    established: "2009",
    feature: "Professional ECN Trading",
    description: "FxPrimus is a Cyprus-based ECN broker offering professional trading conditions with competitive spreads and multiple account types. Key features include CySEC, VFSC regulation, $100 min deposit, ECN execution. Particularly suitable for professional traders seeking ECN conditions with competitive pricing. Updated May 2023.",
    headline: "FxPrimus is a professional ECN broker renowned for its competitive spreads and advanced trading conditions. With multiple account types and professional tools, FxPrimus serves experienced traders seeking institutional-grade ECN execution.",
    faqs: [
      {
        question: "Is FxPrimus regulated?",
        answer: "FxPrimus is regulated by CySEC and VFSC, ensuring regulatory oversight for trading operations."
      },
      {
        question: "What is the minimum deposit for FxPrimus?",
        answer: "FxPrimus has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes FxPrimus special?",
        answer: "FxPrimus offers professional ECN execution with competitive spreads and multiple account types."
      }
    ]
  }
};

function generateBrokerPage(brokerInfo) {
  const template = `import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroBrokerSection } from "@/components/broker-review/HeroBrokerSection";
import { BrokerOverviewSection } from "@/components/broker-review/BrokerOverviewSection";
import { BrokerTradingConditions } from "@/components/broker-review/BrokerTradingConditions";
import { PlatformsSection } from "@/components/broker-review/PlatformsSection";
import { ReviewsSection } from "@/components/broker-review/ReviewsSection";
import { BrokerAnalysisWidget } from "@/components/broker-review/BrokerAnalysisWidget";
import { DynamicFAQSection } from "@/components/broker-review/DynamicFAQSection";
import { SimilarBrokersSection } from "@/components/broker-review/SimilarBrokersSection";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, AlertTriangle } from "lucide-react";

// Generate metadata for the broker review page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "${brokerInfo.name} Review 2025 | Expert Analysis of ${brokerInfo.feature}",
    description: "Comprehensive ${brokerInfo.name} review. Discover trading fees, platforms, regulation, and key features. Updated for 2025.",
    keywords: ["${brokerInfo.name} review", "${brokerInfo.name} trading fees", "${brokerInfo.name} platforms", "forex broker review"],
    openGraph: {
      title: "${brokerInfo.name} Review 2025 | Expert Analysis of ${brokerInfo.feature}",
      description: "Comprehensive ${brokerInfo.name} review. Discover trading fees, platforms, regulation, and key features. Updated for 2025.",
      url: "https://brokeranalysis.com/broker/${brokerInfo.slug}",
      type: "article",
    },
  };
}

export default async function ${brokerInfo.name.replace(/\s+/g, '').replace(/\./g, '')}ReviewPage() {
  // ${brokerInfo.name} broker data
  const broker = {
    id: "${brokerInfo.id}",
    name: "${brokerInfo.name}",
    logo_url: "${brokerInfo.logo}",
    description: "${brokerInfo.description}",
    min_deposit: ${brokerInfo.minDeposit},
    max_leverage: "1:500",
    regulations: "${brokerInfo.regulation.join(', ')}",
    trading_platforms: "${brokerInfo.platforms.join(', ')}",
    spreads_from: "${brokerInfo.spread}",
    account_types: ["Standard", "Professional"],
    country: "${brokerInfo.country}",
    established: "${brokerInfo.established}",
    overall_rating: ${brokerInfo.rating},
    pros: ${JSON.stringify(brokerInfo.pros)},
    cons: ${JSON.stringify(brokerInfo.cons)},
    educational_resources: true,
    feature: "${brokerInfo.feature}",
    website_url: "${brokerInfo.url}",
    published_date: "2023-05-15",
    last_updated: "2023-05-15",
    faqs: ${JSON.stringify(brokerInfo.faqs, null, 6)}
  };

  // Similar brokers for recommendation
  const similarBrokers = [
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
  const headline = "${brokerInfo.headline}";

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": broker.name,
      "description": broker.description,
      "url": broker.website_url,
      "logo": broker.logo_url
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": broker.overall_rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "BrokerAnalysis"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrokerAnalysis",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brokeranalysis.com/logo.png"
      }
    },
    "headline": headline,
    "datePublished": "2023-05-15",
    "dateModified": "2023-05-15"
  };

  return (
    <>
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Section with broker overview */}
        <HeroBrokerSection broker={broker} />

        <div className="mt-8 sm:mt-12">
          <BrokerOverviewSection broker={broker} headline={headline} />
        </div>

        <Separator className="my-8 sm:my-12" />

        {/* Mobile Navigation for sections */}
        <div className="lg:hidden mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent sticky top-16 z-20 bg-background/95 backdrop-blur-sm pb-2 pt-2 -mx-4 px-4 shadow-sm border-b border-border/50">
          <div className="flex space-x-3 min-w-max">
            <a href="#trading-conditions" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Trading Conditions</a>
            <a href="#platforms" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Platforms</a>
            <a href="#reviews" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Reviews</a>
            <a href="#similar" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Similar Brokers</a>
            <a href="#faq" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">FAQ</a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-12">
            {/* Trading Conditions */}
            <section id="trading-conditions" className="scroll-mt-20">
              <div className="rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <BrokerTradingConditions broker={broker} />
              </div>
            </section>

            {/* Trading Platforms */}
            <section id="platforms" className="scroll-mt-20">
              <div className="rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <PlatformsSection broker={broker} />
              </div>
            </section>

            {/* User Reviews */}
            <section id="reviews" className="scroll-mt-20">
              <div className="rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <ReviewsSection broker={broker} />
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* Broker Analysis Widget */}
            <section id="analysis" className="scroll-mt-20">
              <div className="sticky top-20 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <BrokerAnalysisWidget broker={broker} />
              </div>
            </section>
          </div>
        </div>

        <Separator className="my-12 sm:my-16" />

        {/* Similar Brokers Section - Full Width */}
        <section id="similar" className="scroll-mt-20">
          <div className="bg-gradient-to-b from-muted/30 to-transparent py-12 px-8 -mx-4 sm:-mx-6 lg:-mx-8 rounded-xl">
            <SimilarBrokersSection brokers={similarBrokers} currentBroker={broker.name} />
          </div>
        </section>

        <Separator className="my-12 sm:my-16" />

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-20">
          <DynamicFAQSection broker={broker} additionalFaqs={broker.faqs} />
        </section>
      </div>
    </>
  );
}`;

  return template;
}

// Create broker pages for Batch 11 brokers
const brokersToCreate = ["AMarkets", "FTX.US", "OCTA", "FBS", "GO Markets", "HFM", "Moneta Markets", "Liquid", "Phemex", "FxPrimus"];

brokersToCreate.forEach(brokerName => {
  const brokerInfo = brokerData[brokerName];
  if (brokerInfo) {
    const pageContent = generateBrokerPage(brokerInfo);
    const dirPath = path.join(process.cwd(), 'src', 'app', 'broker', brokerInfo.slug);
    const filePath = path.join(dirPath, 'page.tsx');

    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, pageContent);
    console.log(`✅ Created ${brokerName} page at ${filePath}`);
  }
});

console.log('🎉 Batch 11 broker pages created successfully!');
