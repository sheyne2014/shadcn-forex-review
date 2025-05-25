import fs from 'fs';
import path from 'path';

// Broker data from BROKER_DATABASE - BATCH 14
const brokerData = {
  "Bittrex": {
    id: "e0000000-0000-0000-0000-000000001000",
    name: "Bittrex",
    slug: "bittrex",
    logo: "/images/brokers/bittrex.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "0.25% trading fee",
    platforms: ["Bittrex Platform", "Bittrex Mobile", "Bittrex API"],
    regulation: ["FinCEN", "State Licenses"],
    pros: ["No minimum deposit", "Strong security", "Wide crypto selection", "US compliance"],
    cons: ["Limited fiat options", "Higher fees", "No advanced trading tools"],
    url: "https://www.bittrex.com",
    country: "USA",
    established: "2014",
    feature: "Secure US Crypto Exchange",
    description: "Bittrex is a US-based secure cryptocurrency exchange offering wide crypto selection with strong security measures and US regulatory compliance for safe crypto trading. Key features include FinCEN, State Licenses regulation, $0 min deposit, strong security. Particularly suitable for US crypto traders seeking secure exchange with regulatory compliance and wide crypto selection. Updated May 2023.",
    headline: "Bittrex is a secure US cryptocurrency exchange renowned for its strong security measures and wide crypto selection. With comprehensive US regulatory compliance and robust security infrastructure, Bittrex serves US crypto traders seeking safe and compliant cryptocurrency trading.",
    faqs: [
      {
        question: "Is Bittrex regulated?",
        answer: "Bittrex is regulated by FinCEN and holds various state licenses, ensuring comprehensive US regulatory compliance for cryptocurrency trading."
      },
      {
        question: "What is the minimum deposit for Bittrex?",
        answer: "Bittrex has no minimum deposit requirement for cryptocurrency trading accounts."
      },
      {
        question: "What makes Bittrex special?",
        answer: "Bittrex offers strong security measures with wide crypto selection and comprehensive US regulatory compliance."
      }
    ]
  },
  "Dough Finance": {
    id: "e1000000-0000-0000-0000-000000001010",
    name: "Dough Finance",
    slug: "dough-finance",
    logo: "/images/brokers/dough-finance.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["Dough Platform", "Dough Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Commission-free trading", "Options focus", "User-friendly interface"],
    cons: ["Limited research tools", "No mutual funds", "Limited international markets"],
    url: "https://www.dough.com",
    country: "USA",
    established: "2019",
    feature: "Commission-Free Options Trading",
    description: "Dough Finance is a US-based commission-free broker specializing in options trading with user-friendly interface and educational resources for options traders. Key features include SEC, FINRA regulation, $0 min deposit, options focus. Particularly suitable for options traders seeking commission-free trading with user-friendly interface and educational support. Updated May 2023.",
    headline: "Dough Finance is a commission-free options specialist renowned for its user-friendly interface and educational resources. With strong regulatory oversight and options-focused features, Dough Finance serves options traders seeking commission-free trading with comprehensive educational support.",
    faqs: [
      {
        question: "Is Dough Finance regulated?",
        answer: "Dough Finance is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for Dough Finance?",
        answer: "Dough Finance has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Dough Finance special?",
        answer: "Dough Finance offers commission-free options trading with user-friendly interface and comprehensive educational resources."
      }
    ]
  },
  "eToro USA": {
    id: "e2000000-0000-0000-0000-000000001020",
    name: "eToro USA",
    slug: "etoro-usa",
    logo: "/images/brokers/etoro-usa.png",
    rating: 4.2,
    minDeposit: 50,
    spread: "$0 commissions",
    platforms: ["eToro USA Platform", "eToro USA Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["Social trading features", "Commission-free stocks", "Crypto trading", "User-friendly platform"],
    cons: ["Limited asset selection", "No CFDs", "Account fees"],
    url: "https://www.etoro.com/us",
    country: "USA",
    established: "2018",
    feature: "Social Trading for US Investors",
    description: "eToro USA is a US-based social trading platform offering commission-free stocks and crypto trading with social features for US investors seeking community-driven investing. Key features include SEC, FINRA regulation, $50 min deposit, social trading. Particularly suitable for US investors seeking social trading with commission-free stocks and crypto access. Updated May 2023.",
    headline: "eToro USA is a social trading platform renowned for its community-driven investing and commission-free trading. With innovative social features and strong regulatory oversight, eToro USA serves US investors seeking social trading with commission-free stocks and crypto access.",
    faqs: [
      {
        question: "Is eToro USA regulated?",
        answer: "eToro USA is regulated by SEC, FINRA, and provides SIPC protection for US trading accounts."
      },
      {
        question: "What is the minimum deposit for eToro USA?",
        answer: "eToro USA has a minimum deposit of $50 for most trading accounts."
      },
      {
        question: "What makes eToro USA special?",
        answer: "eToro USA offers social trading features with commission-free stocks and crypto trading for US investors."
      }
    ]
  },
  "ICM Capital": {
    id: "e3000000-0000-0000-0000-000000001030",
    name: "ICM Capital",
    slug: "icm-capital",
    logo: "/images/brokers/icm-capital.png",
    rating: 4.2,
    minDeposit: 200,
    spread: "From 0.9 pips",
    platforms: ["MT4", "MT5", "ICM Mobile"],
    regulation: ["FCA", "CySEC"],
    pros: ["FCA regulation", "Multiple asset classes", "Educational resources", "Competitive spreads"],
    cons: ["Higher minimum deposit", "Complex fee structure", "Limited crypto options"],
    url: "https://www.icmcapital.co.uk",
    country: "UK",
    established: "2009",
    feature: "FCA-Regulated Multi-Asset Trading",
    description: "ICM Capital is a UK-based FCA-regulated broker offering competitive spreads across forex, CFDs, and crypto with comprehensive educational resources and strong regulatory oversight. Key features include FCA, CySEC regulation, $200 min deposit, multi-asset trading. Particularly suitable for traders seeking FCA regulation with multi-asset trading and educational support. Updated May 2023.",
    headline: "ICM Capital is an FCA-regulated multi-asset broker renowned for its competitive spreads and comprehensive educational resources. With strong regulatory oversight and diverse asset coverage, ICM Capital serves traders seeking FCA regulation with professional multi-asset trading capabilities.",
    faqs: [
      {
        question: "Is ICM Capital regulated?",
        answer: "ICM Capital is regulated by FCA (Financial Conduct Authority) and CySEC, ensuring comprehensive regulatory oversight for multi-asset trading."
      },
      {
        question: "What is the minimum deposit for ICM Capital?",
        answer: "ICM Capital has a minimum deposit of $200 for most trading accounts."
      },
      {
        question: "What makes ICM Capital special?",
        answer: "ICM Capital offers FCA regulation with competitive spreads across multiple asset classes and comprehensive educational resources."
      }
    ]
  },
  "Just2Trade": {
    id: "e4000000-0000-0000-0000-000000001040",
    name: "Just2Trade",
    slug: "just2trade",
    logo: "/images/brokers/just2trade.png",
    rating: 4.2,
    minDeposit: 100,
    spread: "$2.50 per trade",
    platforms: ["Just2Trade Platform", "Just2Trade Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["Low commissions", "Multiple asset classes", "Professional tools", "Direct market access"],
    cons: ["Minimum deposit required", "Complex for beginners", "Limited research"],
    url: "https://www.just2trade.com",
    country: "USA",
    established: "2006",
    feature: "Low-Cost Multi-Asset Trading",
    description: "Just2Trade is a US-based low-cost broker offering competitive commissions across stocks, options, and futures with professional tools and direct market access. Key features include SEC, FINRA regulation, $100 min deposit, low commissions. Particularly suitable for active traders seeking low-cost multi-asset trading with professional tools and direct market access. Updated May 2023.",
    headline: "Just2Trade is a low-cost multi-asset broker renowned for its competitive commissions and professional trading tools. With direct market access and strong regulatory oversight, Just2Trade serves active traders seeking affordable multi-asset trading with professional-grade execution.",
    faqs: [
      {
        question: "Is Just2Trade regulated?",
        answer: "Just2Trade is regulated by SEC, FINRA, and provides SIPC protection for trading accounts."
      },
      {
        question: "What is the minimum deposit for Just2Trade?",
        answer: "Just2Trade has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes Just2Trade special?",
        answer: "Just2Trade offers low-cost multi-asset trading with professional tools and direct market access."
      }
    ]
  },
  "M4Markets": {
    id: "e5000000-0000-0000-0000-000000001050",
    name: "M4Markets",
    slug: "m4markets",
    logo: "/images/brokers/m4markets.png",
    rating: 4.2,
    minDeposit: 100,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "M4Markets Mobile"],
    regulation: ["FSA", "VFSC"],
    pros: ["Raw spreads", "Multiple account types", "Copy trading", "Educational resources"],
    cons: ["Offshore regulation", "Limited crypto options", "Commission-based accounts"],
    url: "https://www.m4markets.com",
    country: "Seychelles",
    established: "2018",
    feature: "Raw Spreads Multi-Asset Trading",
    description: "M4Markets is a Seychelles-based broker offering raw spreads from 0.0 pips with copy trading features across forex, CFDs, and crypto for diverse trading strategies. Key features include FSA, VFSC regulation, $100 min deposit, raw spreads. Particularly suitable for traders seeking raw spreads with copy trading and multi-asset access across diverse markets. Updated May 2023.",
    headline: "M4Markets is a raw spreads specialist renowned for its copy trading features and multi-asset access. With competitive pricing and diverse trading options, M4Markets serves traders seeking raw spreads with copy trading capabilities across multiple asset classes.",
    faqs: [
      {
        question: "Is M4Markets regulated?",
        answer: "M4Markets is regulated by FSA (Seychelles) and VFSC, ensuring regulatory oversight for multi-asset trading operations."
      },
      {
        question: "What is the minimum deposit for M4Markets?",
        answer: "M4Markets has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes M4Markets special?",
        answer: "M4Markets offers raw spreads from 0.0 pips with copy trading features and multi-asset access."
      }
    ]
  },
  "SMC Global": {
    id: "e6000000-0000-0000-0000-000000001060",
    name: "SMC Global",
    slug: "smc-global",
    logo: "/images/brokers/smc-global.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "From 0.5 pips",
    platforms: ["SMC Platform", "SMC Mobile", "MT4"],
    regulation: ["SEBI", "BSE", "NSE"],
    pros: ["No minimum deposit", "Indian market expertise", "Multiple asset classes", "Local support"],
    cons: ["India-focused", "Limited international markets", "Complex fee structure"],
    url: "https://www.smcindiaonline.com",
    country: "India",
    established: "1994",
    feature: "Indian Multi-Asset Trading Specialist",
    description: "SMC Global is an India-based SEBI-regulated broker offering comprehensive Indian market access across stocks, commodities, and forex with local expertise and support. Key features include SEBI, BSE, NSE regulation, $0 min deposit, Indian expertise. Particularly suitable for Indian traders seeking comprehensive local market access with regulatory compliance and local support. Updated May 2023.",
    headline: "SMC Global is an Indian multi-asset specialist renowned for its comprehensive local market access and regulatory compliance. With deep Indian market expertise and SEBI regulation, SMC Global serves Indian traders seeking professional access to local markets with comprehensive support.",
    faqs: [
      {
        question: "Is SMC Global regulated?",
        answer: "SMC Global is regulated by SEBI, BSE, and NSE, ensuring comprehensive regulatory oversight for Indian market trading."
      },
      {
        question: "What is the minimum deposit for SMC Global?",
        answer: "SMC Global has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes SMC Global special?",
        answer: "SMC Global offers comprehensive Indian market access with SEBI regulation and deep local market expertise."
      }
    ]
  },
  "SMC Global Pro": {
    id: "e7000000-0000-0000-0000-000000001070",
    name: "SMC Global Pro",
    slug: "smc-global-pro",
    logo: "/images/brokers/smc-global-pro.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "From 0.3 pips",
    platforms: ["SMC Pro Platform", "SMC Pro Mobile", "Advanced Tools"],
    regulation: ["SEBI", "BSE", "NSE"],
    pros: ["No minimum deposit", "Advanced tools", "Professional features", "Indian market expertise"],
    cons: ["India-focused", "Complex platform", "Higher fees for advanced features"],
    url: "https://www.smcindiaonline.com/pro",
    country: "India",
    established: "1994",
    feature: "Professional Indian Trading Platform",
    description: "SMC Global Pro is an India-based professional trading platform offering advanced tools and features for serious Indian market traders with SEBI regulation and professional support. Key features include SEBI regulation, $0 min deposit, advanced tools. Particularly suitable for professional Indian traders seeking advanced tools with comprehensive market access and professional features. Updated May 2023.",
    headline: "SMC Global Pro is a professional Indian trading platform renowned for its advanced tools and comprehensive market access. With sophisticated features and SEBI regulation, SMC Global Pro serves professional Indian traders seeking advanced trading capabilities with regulatory compliance.",
    faqs: [
      {
        question: "Is SMC Global Pro regulated?",
        answer: "SMC Global Pro is regulated by SEBI, BSE, and NSE, ensuring comprehensive regulatory oversight for professional Indian trading."
      },
      {
        question: "What is the minimum deposit for SMC Global Pro?",
        answer: "SMC Global Pro has no minimum deposit requirement for professional trading accounts."
      },
      {
        question: "What makes SMC Global Pro special?",
        answer: "SMC Global Pro offers advanced professional tools with comprehensive Indian market access and SEBI regulation."
      }
    ]
  },
  "Tradier": {
    id: "e8000000-0000-0000-0000-000000001080",
    name: "Tradier",
    slug: "tradier",
    logo: "/images/brokers/tradier.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "$0.35 per contract",
    platforms: ["Tradier Platform", "Tradier Mobile", "API Access"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Low options commissions", "API access", "Developer-friendly"],
    cons: ["Limited research tools", "No mutual funds", "Basic platform features"],
    url: "https://www.tradier.com",
    country: "USA",
    established: "2012",
    feature: "Developer-Friendly Options Trading",
    description: "Tradier is a US-based developer-friendly broker offering low options commissions with API access and modern technology for tech-savvy options traders. Key features include SEC, FINRA regulation, $0 min deposit, API access. Particularly suitable for tech-savvy options traders seeking low commissions with API access and developer-friendly features. Updated May 2023.",
    headline: "Tradier is a developer-friendly options broker renowned for its API access and modern technology. With low options commissions and comprehensive API capabilities, Tradier serves tech-savvy options traders seeking modern trading infrastructure with developer tools.",
    faqs: [
      {
        question: "Is Tradier regulated?",
        answer: "Tradier is regulated by SEC, FINRA, and provides SIPC protection for trading accounts."
      },
      {
        question: "What is the minimum deposit for Tradier?",
        answer: "Tradier has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Tradier special?",
        answer: "Tradier offers developer-friendly options trading with API access and low commissions for tech-savvy traders."
      }
    ]
  },
  "Vantagepoint AI": {
    id: "e9000000-0000-0000-0000-000000001090",
    name: "Vantagepoint AI",
    slug: "vantagepoint-ai",
    logo: "/images/brokers/vantagepoint-ai.png",
    rating: 4.2,
    minDeposit: 25,
    spread: "From 1.0 pips",
    platforms: ["MT4", "MT5", "Vantagepoint AI Mobile"],
    regulation: ["ASIC", "VFSC"],
    pros: ["Very low minimum deposit", "AI-powered tools", "ASIC regulation", "Educational resources"],
    cons: ["Higher spreads", "Limited advanced tools", "AI features may be complex"],
    url: "https://www.vantagepointai.com",
    country: "Australia",
    established: "2009",
    feature: "AI-Powered ASIC-Regulated Trading",
    description: "Vantagepoint AI is an Australia-based ASIC-regulated broker offering AI-powered trading tools with very low minimum deposits for accessible intelligent trading. Key features include ASIC, VFSC regulation, $25 min deposit, AI tools. Particularly suitable for traders seeking AI-powered tools with ASIC regulation and very low entry barriers for intelligent trading. Updated May 2023.",
    headline: "Vantagepoint AI is an AI-powered trading platform renowned for its intelligent trading tools and ASIC regulation. With very low minimum deposits and advanced AI capabilities, Vantagepoint AI serves traders seeking intelligent trading with regulatory compliance and accessible entry requirements.",
    faqs: [
      {
        question: "Is Vantagepoint AI regulated?",
        answer: "Vantagepoint AI is regulated by ASIC (Australian Securities and Investments Commission) and VFSC, ensuring comprehensive regulatory oversight."
      },
      {
        question: "What is the minimum deposit for Vantagepoint AI?",
        answer: "Vantagepoint AI has a very low minimum deposit of $25 for most trading accounts."
      },
      {
        question: "What makes Vantagepoint AI special?",
        answer: "Vantagepoint AI offers AI-powered trading tools with ASIC regulation and very low minimum deposits for accessible intelligent trading."
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

// Create broker pages for Batch 14 brokers
const brokersToCreate = ["Bittrex", "Dough Finance", "eToro USA", "ICM Capital", "Just2Trade", "M4Markets", "SMC Global", "SMC Global Pro", "Tradier", "Vantagepoint AI"];

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

console.log('🎉 Batch 14 broker pages created successfully!');
