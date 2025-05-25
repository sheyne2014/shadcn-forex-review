import fs from 'fs';
import path from 'path';

// Broker data from BROKER_DATABASE - BATCH 12
const brokerData = {
  "Webull": {
    id: "c0000000-0000-0000-0000-000000000800",
    name: "Webull",
    slug: "webull",
    logo: "/images/brokers/webull.png",
    rating: 4.3,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["Webull Platform", "Webull Mobile", "Webull Desktop"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Commission-free trading", "Advanced charting", "Real-time data"],
    cons: ["Limited international markets", "No mutual funds", "Account fees for some services"],
    url: "https://www.webull.com",
    country: "USA",
    established: "2017",
    feature: "Commission-Free Advanced Trading",
    description: "Webull is a US-based commission-free broker offering advanced trading tools with real-time data and sophisticated charting for stocks, ETFs, and options. Key features include SEC, FINRA regulation, $0 min deposit, advanced charting. Particularly suitable for active traders seeking commission-free trading with professional-grade tools. Updated May 2023.",
    headline: "Webull is a cutting-edge commission-free broker renowned for its advanced trading tools and real-time market data. With sophisticated charting and professional features, Webull serves active traders seeking institutional-quality tools without commission fees.",
    faqs: [
      {
        question: "Is Webull regulated?",
        answer: "Webull is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for Webull?",
        answer: "Webull has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Webull special?",
        answer: "Webull offers commission-free trading with advanced charting tools and real-time market data for active traders."
      }
    ]
  },
  "FXDD": {
    id: "c1000000-0000-0000-0000-000000000810",
    name: "FXDD",
    slug: "fxdd",
    logo: "/images/brokers/fxdd.png",
    rating: 4.3,
    minDeposit: 50,
    spread: "From 0.8 pips",
    platforms: ["MT4", "MT5", "FXDD Mobile"],
    regulation: ["MFSA", "CYSEC"],
    pros: ["Established reputation", "Multiple platforms", "Competitive spreads", "Educational resources"],
    cons: ["Higher minimum than some", "Limited crypto options", "Complex fee structure"],
    url: "https://www.fxdd.com",
    country: "Malta",
    established: "2002",
    feature: "Established Forex Specialist",
    description: "FXDD is a Malta-based established forex broker offering competitive spreads with multiple trading platforms and comprehensive educational resources. Key features include MFSA, CySEC regulation, $50 min deposit, competitive spreads. Particularly suitable for forex traders seeking established reputation with educational support. Updated May 2023.",
    headline: "FXDD is an established forex specialist renowned for its competitive spreads and comprehensive educational resources. With over 20 years of experience and strong regulatory oversight, FXDD serves forex traders seeking reliability and professional trading conditions.",
    faqs: [
      {
        question: "Is FXDD regulated?",
        answer: "FXDD is regulated by MFSA (Malta Financial Services Authority) and CySEC, ensuring comprehensive regulatory oversight."
      },
      {
        question: "What is the minimum deposit for FXDD?",
        answer: "FXDD has a minimum deposit of $50 for most trading accounts."
      },
      {
        question: "What makes FXDD special?",
        answer: "FXDD offers over 20 years of forex expertise with competitive spreads and comprehensive educational resources."
      }
    ]
  },
  "Lightspeed": {
    id: "c2000000-0000-0000-0000-000000000820",
    name: "Lightspeed",
    slug: "lightspeed",
    logo: "/images/brokers/lightspeed.png",
    rating: 4.3,
    minDeposit: 10000,
    spread: "From $0.45 per contract",
    platforms: ["Lightspeed Trader", "Lightspeed Mobile", "Sterling Trader"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["Professional platform", "Direct market access", "Advanced tools", "High-speed execution"],
    cons: ["High minimum deposit", "Complex for beginners", "Professional fees"],
    url: "https://www.lightspeed.com",
    country: "USA",
    established: "1999",
    feature: "Professional Direct Market Access",
    description: "Lightspeed is a US-based professional trading platform offering direct market access with high-speed execution and advanced tools for serious traders. Key features include SEC, FINRA regulation, $10,000 min deposit, direct market access. Particularly suitable for professional day traders seeking institutional-grade execution and tools. Updated May 2023.",
    headline: "Lightspeed is a premier professional trading platform renowned for its direct market access and high-speed execution. With advanced tools and institutional-grade technology, Lightspeed serves professional traders who demand the fastest execution and most sophisticated trading infrastructure.",
    faqs: [
      {
        question: "Is Lightspeed regulated?",
        answer: "Lightspeed is regulated by SEC, FINRA, and provides SIPC protection for professional trading accounts."
      },
      {
        question: "What is the minimum deposit for Lightspeed?",
        answer: "Lightspeed has a minimum deposit of $10,000 for professional trading accounts."
      },
      {
        question: "What makes Lightspeed special?",
        answer: "Lightspeed offers direct market access with high-speed execution and professional-grade trading tools."
      }
    ]
  },
  "Dorman Trading": {
    id: "c3000000-0000-0000-0000-000000000830",
    name: "Dorman Trading",
    slug: "dorman-trading",
    logo: "/images/brokers/dorman-trading.png",
    rating: 4.3,
    minDeposit: 2500,
    spread: "From $1.50 per contract",
    platforms: ["CQG", "TT Platform", "Dorman Mobile"],
    regulation: ["CFTC", "NFA"],
    pros: ["Futures expertise", "Professional platforms", "Competitive rates", "Personal service"],
    cons: ["Futures only", "High minimum deposit", "Complex for beginners"],
    url: "https://www.dormantrading.com",
    country: "USA",
    established: "1956",
    feature: "Professional Futures Trading",
    description: "Dorman Trading is a US-based professional futures broker offering competitive rates with advanced platforms and personal service for serious futures traders. Key features include CFTC, NFA regulation, $2,500 min deposit, futures expertise. Particularly suitable for professional futures traders seeking competitive rates with personal service. Updated May 2023.",
    headline: "Dorman Trading is a professional futures specialist with over 65 years of experience, offering competitive rates and advanced platforms. With personal service and deep futures expertise, Dorman Trading serves serious futures traders seeking professional execution and support.",
    faqs: [
      {
        question: "Is Dorman Trading regulated?",
        answer: "Dorman Trading is regulated by CFTC and NFA, ensuring comprehensive oversight for futures trading operations."
      },
      {
        question: "What is the minimum deposit for Dorman Trading?",
        answer: "Dorman Trading has a minimum deposit of $2,500 for futures trading accounts."
      },
      {
        question: "What makes Dorman Trading special?",
        answer: "Dorman Trading offers over 65 years of futures expertise with competitive rates and personal service."
      }
    ]
  },
  "Firstrade": {
    id: "c4000000-0000-0000-0000-000000000840",
    name: "Firstrade",
    slug: "firstrade",
    logo: "/images/brokers/firstrade.png",
    rating: 4.3,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["Firstrade Platform", "Firstrade Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Commission-free trading", "No account fees", "International trading"],
    cons: ["Limited research tools", "Basic platform features", "Limited advanced tools"],
    url: "https://www.firstrade.com",
    country: "USA",
    established: "1985",
    feature: "Commission-Free International Trading",
    description: "Firstrade is a US-based commission-free broker offering international trading capabilities with no account fees and comprehensive stock and ETF access. Key features include SEC, FINRA regulation, $0 min deposit, international trading. Particularly suitable for investors seeking commission-free international trading with no account fees. Updated May 2023.",
    headline: "Firstrade is a pioneering commission-free broker renowned for its international trading capabilities and zero account fees. With comprehensive market access and straightforward pricing, Firstrade serves investors seeking affordable global investing without hidden costs.",
    faqs: [
      {
        question: "Is Firstrade regulated?",
        answer: "Firstrade is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for Firstrade?",
        answer: "Firstrade has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Firstrade special?",
        answer: "Firstrade offers commission-free trading with international market access and no account fees."
      }
    ]
  },
  "TradeZero": {
    id: "c5000000-0000-0000-0000-000000000850",
    name: "TradeZero",
    slug: "tradezero",
    logo: "/images/brokers/tradezero.png",
    rating: 4.3,
    minDeposit: 500,
    spread: "$0 commissions",
    platforms: ["TradeZero Platform", "TradeZero Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["Commission-free trading", "Short selling capabilities", "Professional tools", "Real-time data"],
    cons: ["Higher minimum deposit", "Limited research", "Account fees"],
    url: "https://www.tradezero.co",
    country: "USA",
    established: "2015",
    feature: "Commission-Free Short Selling",
    description: "TradeZero is a US-based commission-free broker offering advanced short selling capabilities with professional tools and real-time data for active traders. Key features include SEC, FINRA regulation, $500 min deposit, short selling. Particularly suitable for active traders seeking commission-free trading with advanced short selling capabilities. Updated May 2023.",
    headline: "TradeZero is a specialized commission-free broker renowned for its advanced short selling capabilities and professional trading tools. With real-time data and sophisticated features, TradeZero serves active traders seeking commission-free access to advanced trading strategies.",
    faqs: [
      {
        question: "Is TradeZero regulated?",
        answer: "TradeZero is regulated by SEC, FINRA, and provides SIPC protection for trading accounts."
      },
      {
        question: "What is the minimum deposit for TradeZero?",
        answer: "TradeZero has a minimum deposit of $500 for most trading accounts."
      },
      {
        question: "What makes TradeZero special?",
        answer: "TradeZero offers commission-free trading with advanced short selling capabilities and professional tools."
      }
    ]
  },
  "AMarkets ECN": {
    id: "c6000000-0000-0000-0000-000000000860",
    name: "AMarkets ECN",
    slug: "amarkets-ecn",
    logo: "/images/brokers/amarkets-ecn.png",
    rating: 4.3,
    minDeposit: 100,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "AMarkets Mobile"],
    regulation: ["VFSC", "FSC"],
    pros: ["ECN execution", "Low minimum deposit", "Multiple account types", "Copy trading"],
    cons: ["Limited regulation", "Offshore jurisdiction", "Commission-based accounts"],
    url: "https://www.amarkets.com",
    country: "Saint Vincent",
    established: "2007",
    feature: "ECN Multi-Asset Trading",
    description: "AMarkets ECN is a Saint Vincent-based ECN broker offering true ECN execution with low minimum deposits and copy trading features across multiple asset classes. Key features include VFSC regulation, $100 min deposit, ECN execution. Particularly suitable for traders seeking affordable ECN conditions with multi-asset trading. Updated May 2023.",
    headline: "AMarkets ECN is a specialized ECN broker renowned for its true ECN execution and affordable multi-asset trading. With copy trading features and multiple account types, AMarkets ECN serves traders seeking professional ECN conditions with accessible entry requirements.",
    faqs: [
      {
        question: "Is AMarkets ECN regulated?",
        answer: "AMarkets ECN is regulated by VFSC (Vanuatu Financial Services Commission) and FSC, ensuring regulatory oversight for ECN trading operations."
      },
      {
        question: "What is the minimum deposit for AMarkets ECN?",
        answer: "AMarkets ECN has a minimum deposit of $100 for ECN trading accounts."
      },
      {
        question: "What makes AMarkets ECN special?",
        answer: "AMarkets ECN offers true ECN execution with copy trading features and affordable multi-asset trading."
      }
    ]
  },
  "Windsor Brokers": {
    id: "c7000000-0000-0000-0000-000000000870",
    name: "Windsor Brokers",
    slug: "windsor-brokers",
    logo: "/images/brokers/windsor-brokers.png",
    rating: 4.2,
    minDeposit: 100,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "Windsor Mobile"],
    regulation: ["CySEC", "BVIFSC"],
    pros: ["Strong regulation", "ECN execution", "Multiple account types", "Educational resources"],
    cons: ["Limited crypto options", "Complex fee structure", "Higher spreads on some accounts"],
    url: "https://www.windsorbrokers.com",
    country: "Cyprus",
    established: "1988",
    feature: "Established ECN Trading",
    description: "Windsor Brokers is a Cyprus-based established ECN broker offering strong regulatory oversight with multiple account types and comprehensive educational resources. Key features include CySEC, BVIFSC regulation, $100 min deposit, ECN execution. Particularly suitable for traders seeking established ECN broker with strong regulation and education. Updated May 2023.",
    headline: "Windsor Brokers is an established ECN specialist with over 35 years of experience, offering strong regulatory oversight and comprehensive educational resources. With multiple account types and professional execution, Windsor Brokers serves traders seeking reliability and regulatory compliance.",
    faqs: [
      {
        question: "Is Windsor Brokers regulated?",
        answer: "Windsor Brokers is regulated by CySEC and BVIFSC, ensuring comprehensive regulatory oversight for trading operations."
      },
      {
        question: "What is the minimum deposit for Windsor Brokers?",
        answer: "Windsor Brokers has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes Windsor Brokers special?",
        answer: "Windsor Brokers offers over 35 years of experience with strong regulation and comprehensive educational resources."
      }
    ]
  },
  "Skilling": {
    id: "c8000000-0000-0000-0000-000000000880",
    name: "Skilling",
    slug: "skilling",
    logo: "/images/brokers/skilling.png",
    rating: 4.2,
    minDeposit: 100,
    spread: "From 0.1 pips",
    platforms: ["Skilling Trader", "MT4", "Skilling Mobile"],
    regulation: ["CySEC", "FSA"],
    pros: ["Proprietary platform", "Strong regulation", "Multiple asset classes", "User-friendly interface"],
    cons: ["Limited advanced tools", "Higher spreads", "Account fees"],
    url: "https://www.skilling.com",
    country: "Cyprus",
    established: "2016",
    feature: "User-Friendly Multi-Asset Trading",
    description: "Skilling is a Cyprus-based multi-asset broker offering user-friendly proprietary platform with strong regulatory oversight and multiple asset classes. Key features include CySEC, FSA regulation, $100 min deposit, proprietary platform. Particularly suitable for traders seeking user-friendly multi-asset trading with strong regulation. Updated May 2023.",
    headline: "Skilling is a modern multi-asset broker renowned for its user-friendly proprietary platform and strong regulatory oversight. With intuitive design and comprehensive asset coverage, Skilling serves traders seeking accessible multi-asset trading with professional regulation.",
    faqs: [
      {
        question: "Is Skilling regulated?",
        answer: "Skilling is regulated by CySEC and FSA, ensuring comprehensive regulatory oversight for multi-asset trading."
      },
      {
        question: "What is the minimum deposit for Skilling?",
        answer: "Skilling has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes Skilling special?",
        answer: "Skilling offers user-friendly proprietary platform with strong regulation and comprehensive multi-asset trading."
      }
    ]
  },
  "Moomoo": {
    id: "c9000000-0000-0000-0000-000000000890",
    name: "Moomoo",
    slug: "moomoo",
    logo: "/images/brokers/moomoo.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["Moomoo Platform", "Moomoo Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Commission-free trading", "Advanced analytics", "Social features"],
    cons: ["Limited international markets", "No mutual funds", "Account restrictions"],
    url: "https://www.moomoo.com",
    country: "USA",
    established: "2018",
    feature: "Social Analytics Trading",
    description: "Moomoo is a US-based commission-free broker offering advanced analytics with social trading features and comprehensive market data for informed decision making. Key features include SEC, FINRA regulation, $0 min deposit, advanced analytics. Particularly suitable for data-driven traders seeking commission-free trading with advanced analytics and social features. Updated May 2023.",
    headline: "Moomoo is an innovative commission-free broker renowned for its advanced analytics and social trading features. With comprehensive market data and intuitive tools, Moomoo serves data-driven traders seeking informed decision-making with commission-free execution.",
    faqs: [
      {
        question: "Is Moomoo regulated?",
        answer: "Moomoo is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for Moomoo?",
        answer: "Moomoo has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Moomoo special?",
        answer: "Moomoo offers commission-free trading with advanced analytics and social trading features for data-driven decisions."
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

// Create broker pages for Batch 12 brokers
const brokersToCreate = ["Webull", "FXDD", "Lightspeed", "Dorman Trading", "Firstrade", "TradeZero", "AMarkets ECN", "Windsor Brokers", "Skilling", "Moomoo"];

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

console.log('🎉 Batch 12 broker pages created successfully!');
