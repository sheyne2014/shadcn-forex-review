import fs from 'fs';
import path from 'path';

// Broker data from BROKER_DATABASE - BATCH 15
const brokerData = {
  "Daniels Futures": {
    id: "f0000000-0000-0000-0000-000000001100",
    name: "Daniels Futures",
    slug: "daniels-futures",
    logo: "/images/brokers/daniels-futures.png",
    rating: 4.2,
    minDeposit: 500,
    spread: "$1.25 per contract",
    platforms: ["CQG", "TT Platform", "Daniels Mobile"],
    regulation: ["CFTC", "NFA"],
    pros: ["Futures expertise", "Competitive rates", "Professional platforms", "Personal service"],
    cons: ["Futures only", "Higher minimum deposit", "Complex for beginners"],
    url: "https://www.danielsfutures.com",
    country: "USA",
    established: "1995",
    feature: "Professional Futures Trading Specialist",
    description: "Daniels Futures is a US-based professional futures broker offering competitive rates with advanced platforms and personal service for serious futures traders. Key features include CFTC, NFA regulation, $500 min deposit, futures expertise. Particularly suitable for professional futures traders seeking competitive rates with personal service and advanced platforms. Updated May 2023.",
    headline: "Daniels Futures is a professional futures specialist renowned for its competitive rates and personal service. With advanced platforms and deep futures expertise, Daniels Futures serves serious futures traders seeking professional execution with personalized support.",
    faqs: [
      {
        question: "Is Daniels Futures regulated?",
        answer: "Daniels Futures is regulated by CFTC and NFA, ensuring comprehensive oversight for futures trading operations."
      },
      {
        question: "What is the minimum deposit for Daniels Futures?",
        answer: "Daniels Futures has a minimum deposit of $500 for futures trading accounts."
      },
      {
        question: "What makes Daniels Futures special?",
        answer: "Daniels Futures offers professional futures expertise with competitive rates and personal service for serious traders."
      }
    ]
  },
  "Daniels Trading": {
    id: "f1000000-0000-0000-0000-000000001110",
    name: "Daniels Trading",
    slug: "daniels-trading",
    logo: "/images/brokers/daniels-trading.png",
    rating: 4.2,
    minDeposit: 500,
    spread: "$1.50 per contract",
    platforms: ["CQG", "TT Platform", "Daniels Mobile"],
    regulation: ["CFTC", "NFA"],
    pros: ["Established reputation", "Professional platforms", "Educational resources", "Personal service"],
    cons: ["Futures only", "Higher minimum deposit", "Complex platform"],
    url: "https://www.danielstrading.com",
    country: "USA",
    established: "1995",
    feature: "Established Futures Trading Platform",
    description: "Daniels Trading is a US-based established futures broker offering professional platforms with educational resources and personal service for futures traders. Key features include CFTC, NFA regulation, $500 min deposit, established reputation. Particularly suitable for futures traders seeking established platform with educational resources and professional service. Updated May 2023.",
    headline: "Daniels Trading is an established futures platform renowned for its professional service and educational resources. With comprehensive futures expertise and personalized support, Daniels Trading serves futures traders seeking established reputation with educational guidance.",
    faqs: [
      {
        question: "Is Daniels Trading regulated?",
        answer: "Daniels Trading is regulated by CFTC and NFA, ensuring comprehensive oversight for futures trading operations."
      },
      {
        question: "What is the minimum deposit for Daniels Trading?",
        answer: "Daniels Trading has a minimum deposit of $500 for futures trading accounts."
      },
      {
        question: "What makes Daniels Trading special?",
        answer: "Daniels Trading offers established futures expertise with professional platforms and comprehensive educational resources."
      }
    ]
  },
  "dough": {
    id: "f2000000-0000-0000-0000-000000001120",
    name: "dough",
    slug: "dough",
    logo: "/images/brokers/dough.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["dough Platform", "dough Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Commission-free trading", "Simple interface", "Options focus"],
    cons: ["Limited research tools", "No mutual funds", "Basic features"],
    url: "https://www.dough.com",
    country: "USA",
    established: "2019",
    feature: "Simple Commission-Free Options Trading",
    description: "dough is a US-based commission-free broker offering simple options trading with user-friendly interface and educational resources for accessible options trading. Key features include SEC, FINRA regulation, $0 min deposit, simple interface. Particularly suitable for beginner options traders seeking commission-free trading with simple interface and educational support. Updated May 2023.",
    headline: "dough is a simple commission-free options platform renowned for its user-friendly interface and accessible trading. With straightforward design and educational focus, dough serves beginner options traders seeking commission-free trading with simplified experience.",
    faqs: [
      {
        question: "Is dough regulated?",
        answer: "dough is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for dough?",
        answer: "dough has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes dough special?",
        answer: "dough offers simple commission-free options trading with user-friendly interface and educational resources."
      }
    ]
  },
  "NBHM": {
    id: "f3000000-0000-0000-0000-000000001130",
    name: "NBHM",
    slug: "nbhm",
    logo: "/images/brokers/nbhm.png",
    rating: 4.1,
    minDeposit: 100,
    spread: "From 1.0 pips",
    platforms: ["MT4", "MT5", "NBHM Mobile"],
    regulation: ["FCA", "CySEC"],
    pros: ["FCA regulation", "Multiple asset classes", "Educational resources", "Competitive spreads"],
    cons: ["Higher minimum deposit", "Limited crypto options", "Complex fee structure"],
    url: "https://www.nbhm.com",
    country: "UK",
    established: "2015",
    feature: "FCA-Regulated Multi-Asset Platform",
    description: "NBHM is a UK-based FCA-regulated broker offering multi-asset trading across forex, CFDs, and crypto with educational resources and competitive spreads. Key features include FCA, CySEC regulation, $100 min deposit, multi-asset trading. Particularly suitable for traders seeking FCA regulation with multi-asset access and educational support. Updated May 2023.",
    headline: "NBHM is an FCA-regulated multi-asset platform renowned for its educational resources and competitive spreads. With strong regulatory oversight and diverse asset coverage, NBHM serves traders seeking FCA regulation with comprehensive multi-asset trading capabilities.",
    faqs: [
      {
        question: "Is NBHM regulated?",
        answer: "NBHM is regulated by FCA (Financial Conduct Authority) and CySEC, ensuring comprehensive regulatory oversight for multi-asset trading."
      },
      {
        question: "What is the minimum deposit for NBHM?",
        answer: "NBHM has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes NBHM special?",
        answer: "NBHM offers FCA regulation with multi-asset trading and comprehensive educational resources."
      }
    ]
  },
  "Robinhood": {
    id: "f4000000-0000-0000-0000-000000001140",
    name: "Robinhood",
    slug: "robinhood",
    logo: "/images/brokers/robinhood.png",
    rating: 4.1,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["Robinhood App", "Robinhood Web"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Commission-free trading", "User-friendly app", "Crypto trading"],
    cons: ["Limited research tools", "No mutual funds", "Basic platform features"],
    url: "https://www.robinhood.com",
    country: "USA",
    established: "2013",
    feature: "Mobile-First Commission-Free Trading",
    description: "Robinhood is a US-based mobile-first commission-free broker offering stocks, ETFs, and crypto trading with user-friendly app interface for accessible investing. Key features include SEC, FINRA regulation, $0 min deposit, mobile-first design. Particularly suitable for mobile-first investors seeking commission-free trading with user-friendly app interface. Updated May 2023.",
    headline: "Robinhood is a mobile-first commission-free platform renowned for its user-friendly app and accessible investing. With intuitive design and zero commissions, Robinhood serves mobile-first investors seeking simple commission-free trading with crypto access.",
    faqs: [
      {
        question: "Is Robinhood regulated?",
        answer: "Robinhood is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for Robinhood?",
        answer: "Robinhood has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Robinhood special?",
        answer: "Robinhood offers mobile-first commission-free trading with user-friendly app interface and crypto access."
      }
    ]
  },
  "NBHM Pro": {
    id: "f5000000-0000-0000-0000-000000001150",
    name: "NBHM Pro",
    slug: "nbhm-pro",
    logo: "/images/brokers/nbhm-pro.png",
    rating: 4.1,
    minDeposit: 100,
    spread: "From 0.5 pips",
    platforms: ["MT4", "MT5", "NBHM Pro Mobile"],
    regulation: ["FCA", "CySEC"],
    pros: ["FCA regulation", "Professional features", "Advanced tools", "Competitive spreads"],
    cons: ["Higher minimum deposit", "Complex platform", "Limited crypto options"],
    url: "https://www.nbhm.com/pro",
    country: "UK",
    established: "2015",
    feature: "Professional FCA-Regulated Trading Platform",
    description: "NBHM Pro is a UK-based professional FCA-regulated platform offering advanced tools and features for serious traders with competitive spreads and professional service. Key features include FCA, CySEC regulation, $100 min deposit, professional features. Particularly suitable for professional traders seeking FCA regulation with advanced tools and competitive spreads. Updated May 2023.",
    headline: "NBHM Pro is a professional FCA-regulated platform renowned for its advanced tools and competitive spreads. With sophisticated features and strong regulatory oversight, NBHM Pro serves professional traders seeking FCA regulation with advanced trading capabilities.",
    faqs: [
      {
        question: "Is NBHM Pro regulated?",
        answer: "NBHM Pro is regulated by FCA (Financial Conduct Authority) and CySEC, ensuring comprehensive regulatory oversight for professional trading."
      },
      {
        question: "What is the minimum deposit for NBHM Pro?",
        answer: "NBHM Pro has a minimum deposit of $100 for professional trading accounts."
      },
      {
        question: "What makes NBHM Pro special?",
        answer: "NBHM Pro offers professional FCA regulation with advanced tools and competitive spreads for serious traders."
      }
    ]
  },
  "JustForex": {
    id: "f6000000-0000-0000-0000-000000001160",
    name: "JustForex",
    slug: "justforex",
    logo: "/images/brokers/justforex.png",
    rating: 4.1,
    minDeposit: 1,
    spread: "From 0.7 pips",
    platforms: ["MT4", "MT5", "JustForex Mobile"],
    regulation: ["VFSC", "FSC"],
    pros: ["Ultra-low minimum deposit", "Multiple account types", "Educational resources", "Copy trading"],
    cons: ["Offshore regulation", "Limited advanced tools", "Higher spreads"],
    url: "https://www.justforex.com",
    country: "Saint Vincent",
    established: "2012",
    feature: "Ultra-Accessible Multi-Asset Trading",
    description: "JustForex is a Saint Vincent-based broker offering ultra-low minimum deposits with multi-asset trading across forex, CFDs, and crypto for accessible trading. Key features include VFSC, FSC regulation, $1 min deposit, ultra-accessible. Particularly suitable for beginner traders seeking ultra-low barriers with multi-asset access and educational support. Updated May 2023.",
    headline: "JustForex is an ultra-accessible multi-asset broker renowned for its $1 minimum deposit and educational resources. With extremely low barriers and comprehensive asset coverage, JustForex serves beginner traders seeking affordable entry to multi-asset trading.",
    faqs: [
      {
        question: "Is JustForex regulated?",
        answer: "JustForex is regulated by VFSC (Vanuatu Financial Services Commission) and FSC, ensuring regulatory oversight for multi-asset trading."
      },
      {
        question: "What is the minimum deposit for JustForex?",
        answer: "JustForex has an ultra-low minimum deposit of just $1 for most trading accounts."
      },
      {
        question: "What makes JustForex special?",
        answer: "JustForex offers ultra-accessible trading with $1 minimum deposit and comprehensive educational resources."
      }
    ]
  },
  "Coincheck": {
    id: "f7000000-0000-0000-0000-000000001170",
    name: "Coincheck",
    slug: "coincheck",
    logo: "/images/brokers/coincheck.png",
    rating: 4.1,
    minDeposit: 0,
    spread: "0.1% trading fee",
    platforms: ["Coincheck Platform", "Coincheck Mobile", "Coincheck API"],
    regulation: ["JFSA", "FSA"],
    pros: ["No minimum deposit", "Japanese regulation", "User-friendly interface", "Wide crypto selection"],
    cons: ["Japan-focused", "Limited international access", "Higher fees"],
    url: "https://www.coincheck.com",
    country: "Japan",
    established: "2012",
    feature: "Japanese-Regulated Crypto Exchange",
    description: "Coincheck is a Japan-based JFSA-regulated cryptocurrency exchange offering user-friendly interface with wide crypto selection and strong Japanese regulatory oversight. Key features include JFSA, FSA regulation, $0 min deposit, Japanese regulation. Particularly suitable for Japanese crypto traders seeking regulated exchange with user-friendly interface and wide crypto selection. Updated May 2023.",
    headline: "Coincheck is a Japanese-regulated crypto exchange renowned for its user-friendly interface and strong regulatory oversight. With comprehensive JFSA regulation and wide crypto selection, Coincheck serves Japanese crypto traders seeking regulated exchange with professional compliance.",
    faqs: [
      {
        question: "Is Coincheck regulated?",
        answer: "Coincheck is regulated by JFSA (Japan Financial Services Agency) and FSA, ensuring comprehensive Japanese regulatory oversight for cryptocurrency trading."
      },
      {
        question: "What is the minimum deposit for Coincheck?",
        answer: "Coincheck has no minimum deposit requirement for cryptocurrency trading accounts."
      },
      {
        question: "What makes Coincheck special?",
        answer: "Coincheck offers Japanese JFSA regulation with user-friendly interface and wide crypto selection for regulated trading."
      }
    ]
  },
  "Crypto.com": {
    id: "f8000000-0000-0000-0000-000000001180",
    name: "Crypto.com",
    slug: "cryptocom",
    logo: "/images/brokers/cryptocom.png",
    rating: 4.1,
    minDeposit: 1,
    spread: "0.4% trading fee",
    platforms: ["Crypto.com App", "Crypto.com Exchange", "Crypto.com API"],
    regulation: ["Various jurisdictions", "Compliance programs"],
    pros: ["Very low minimum deposit", "Wide crypto selection", "Visa card integration", "Staking rewards"],
    cons: ["Complex fee structure", "Limited fiat options", "Regulatory uncertainty"],
    url: "https://www.crypto.com",
    country: "Singapore",
    established: "2016",
    feature: "Comprehensive Crypto Ecosystem",
    description: "Crypto.com is a Singapore-based comprehensive crypto platform offering wide crypto selection with Visa card integration and staking rewards for complete crypto ecosystem. Key features include comprehensive ecosystem, $1 min deposit, Visa integration. Particularly suitable for crypto enthusiasts seeking comprehensive ecosystem with Visa card integration and staking rewards. Updated May 2023.",
    headline: "Crypto.com is a comprehensive crypto ecosystem renowned for its Visa card integration and staking rewards. With wide crypto selection and innovative features, Crypto.com serves crypto enthusiasts seeking complete ecosystem with real-world utility.",
    faqs: [
      {
        question: "Is Crypto.com regulated?",
        answer: "Crypto.com operates under various jurisdictions with comprehensive compliance programs for cryptocurrency services."
      },
      {
        question: "What is the minimum deposit for Crypto.com?",
        answer: "Crypto.com has a very low minimum deposit of $1 for most cryptocurrency accounts."
      },
      {
        question: "What makes Crypto.com special?",
        answer: "Crypto.com offers comprehensive crypto ecosystem with Visa card integration and staking rewards for complete crypto experience."
      }
    ]
  },
  "CFD Master": {
    id: "f9000000-0000-0000-0000-000000001190",
    name: "CFD Master",
    slug: "cfd-master",
    logo: "/images/brokers/cfd-master.png",
    rating: 4.1,
    minDeposit: 200,
    spread: "From 0.8 pips",
    platforms: ["MT4", "MT5", "CFD Master Mobile"],
    regulation: ["FCA", "CySEC"],
    pros: ["FCA regulation", "CFD specialization", "Educational resources", "Professional tools"],
    cons: ["Higher minimum deposit", "CFD focus only", "Complex for beginners"],
    url: "https://www.cfdmaster.com",
    country: "UK",
    established: "2018",
    feature: "FCA-Regulated CFD Specialist",
    description: "CFD Master is a UK-based FCA-regulated CFD specialist offering professional tools and educational resources for serious CFD traders with strong regulatory oversight. Key features include FCA, CySEC regulation, $200 min deposit, CFD specialization. Particularly suitable for CFD traders seeking FCA regulation with specialized tools and educational resources. Updated May 2023.",
    headline: "CFD Master is an FCA-regulated CFD specialist renowned for its professional tools and educational resources. With strong regulatory oversight and CFD expertise, CFD Master serves serious CFD traders seeking specialized platform with regulatory compliance.",
    faqs: [
      {
        question: "Is CFD Master regulated?",
        answer: "CFD Master is regulated by FCA (Financial Conduct Authority) and CySEC, ensuring comprehensive regulatory oversight for CFD trading."
      },
      {
        question: "What is the minimum deposit for CFD Master?",
        answer: "CFD Master has a minimum deposit of $200 for CFD trading accounts."
      },
      {
        question: "What makes CFD Master special?",
        answer: "CFD Master offers FCA regulation with specialized CFD tools and comprehensive educational resources for serious CFD traders."
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

// Create broker pages for Batch 15 brokers
const brokersToCreate = ["Daniels Futures", "Daniels Trading", "dough", "NBHM", "Robinhood", "NBHM Pro", "JustForex", "Coincheck", "Crypto.com", "CFD Master"];

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

console.log('🎉 Batch 15 broker pages created successfully!');
