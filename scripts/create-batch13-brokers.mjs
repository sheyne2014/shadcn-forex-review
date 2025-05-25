import fs from 'fs';
import path from 'path';

// Broker data from BROKER_DATABASE - BATCH 13
const brokerData = {
  "Alpha Trading": {
    id: "d0000000-0000-0000-0000-000000000900",
    name: "Alpha Trading",
    slug: "alpha-trading",
    logo: "/images/brokers/alpha-trading.png",
    rating: 4.2,
    minDeposit: 200,
    spread: "From 0.8 pips",
    platforms: ["MT4", "MT5", "Alpha Mobile"],
    regulation: ["ASIC", "VFSC"],
    pros: ["ASIC regulation", "Competitive spreads", "Multiple asset classes", "Educational resources"],
    cons: ["Higher minimum deposit", "Limited crypto options", "Complex fee structure"],
    url: "https://www.alphatrading.com.au",
    country: "Australia",
    established: "2010",
    feature: "ASIC-Regulated Multi-Asset Trading",
    description: "Alpha Trading is an Australia-based ASIC-regulated broker offering competitive spreads across forex, commodities, and indices with comprehensive educational resources. Key features include ASIC, VFSC regulation, $200 min deposit, multi-asset trading. Particularly suitable for traders seeking ASIC-regulated multi-asset trading with educational support. Updated May 2023.",
    headline: "Alpha Trading is an ASIC-regulated multi-asset specialist renowned for its competitive spreads and comprehensive educational resources. With strong regulatory oversight and diverse asset coverage, Alpha Trading serves traders seeking reliable multi-asset trading with professional regulation.",
    faqs: [
      {
        question: "Is Alpha Trading regulated?",
        answer: "Alpha Trading is regulated by ASIC (Australian Securities and Investments Commission) and VFSC, ensuring comprehensive regulatory oversight."
      },
      {
        question: "What is the minimum deposit for Alpha Trading?",
        answer: "Alpha Trading has a minimum deposit of $200 for most trading accounts."
      },
      {
        question: "What makes Alpha Trading special?",
        answer: "Alpha Trading offers ASIC regulation with competitive spreads across multiple asset classes and comprehensive educational resources."
      }
    ]
  },
  "Darwinex": {
    id: "d1000000-0000-0000-0000-000000000910",
    name: "Darwinex",
    slug: "darwinex",
    logo: "/images/brokers/darwinex.png",
    rating: 4.2,
    minDeposit: 500,
    spread: "From 0.7 pips",
    platforms: ["MT4", "MT5", "Darwinex Mobile"],
    regulation: ["FCA", "CySEC"],
    pros: ["FCA regulation", "Unique DARWIN concept", "Copy trading", "Transparent performance"],
    cons: ["Higher minimum deposit", "Complex platform", "Limited asset classes"],
    url: "https://www.darwinex.com",
    country: "UK",
    established: "2012",
    feature: "Innovative DARWIN Copy Trading",
    description: "Darwinex is a UK-based FCA-regulated broker offering innovative DARWIN copy trading with transparent performance tracking across forex, indices, and commodities. Key features include FCA, CySEC regulation, $500 min deposit, DARWIN concept. Particularly suitable for traders seeking innovative copy trading with FCA regulation and transparent performance. Updated May 2023.",
    headline: "Darwinex is an innovative FCA-regulated broker renowned for its unique DARWIN copy trading concept and transparent performance tracking. With cutting-edge technology and strong regulatory oversight, Darwinex serves traders seeking innovative copy trading solutions with professional regulation.",
    faqs: [
      {
        question: "Is Darwinex regulated?",
        answer: "Darwinex is regulated by FCA (Financial Conduct Authority) and CySEC, ensuring comprehensive regulatory oversight for innovative trading solutions."
      },
      {
        question: "What is the minimum deposit for Darwinex?",
        answer: "Darwinex has a minimum deposit of $500 for most trading accounts."
      },
      {
        question: "What makes Darwinex special?",
        answer: "Darwinex offers innovative DARWIN copy trading concept with transparent performance tracking and FCA regulation."
      }
    ]
  },
  "FIBO Group": {
    id: "d2000000-0000-0000-0000-000000000920",
    name: "FIBO Group",
    slug: "fibo-group",
    logo: "/images/brokers/fibo-group.png",
    rating: 4.2,
    minDeposit: 300,
    spread: "From 0.9 pips",
    platforms: ["MT4", "MT5", "FIBO Mobile"],
    regulation: ["CySEC", "IFSC"],
    pros: ["CySEC regulation", "Multiple account types", "Educational resources", "Competitive spreads"],
    cons: ["Higher minimum deposit", "Limited crypto options", "Complex fee structure"],
    url: "https://www.fibogroup.com",
    country: "Cyprus",
    established: "1998",
    feature: "Established Forex & Metals Specialist",
    description: "FIBO Group is a Cyprus-based CySEC-regulated broker offering competitive spreads across forex, metals, and indices with over 25 years of experience and comprehensive educational resources. Key features include CySEC, IFSC regulation, $300 min deposit, forex expertise. Particularly suitable for forex traders seeking established broker with CySEC regulation and educational support. Updated May 2023.",
    headline: "FIBO Group is an established forex and metals specialist with over 25 years of experience, offering competitive spreads and comprehensive educational resources. With strong CySEC regulation and deep market expertise, FIBO Group serves forex traders seeking reliability and professional education.",
    faqs: [
      {
        question: "Is FIBO Group regulated?",
        answer: "FIBO Group is regulated by CySEC and IFSC, ensuring comprehensive regulatory oversight for forex and metals trading."
      },
      {
        question: "What is the minimum deposit for FIBO Group?",
        answer: "FIBO Group has a minimum deposit of $300 for most trading accounts."
      },
      {
        question: "What makes FIBO Group special?",
        answer: "FIBO Group offers over 25 years of forex expertise with CySEC regulation and comprehensive educational resources."
      }
    ]
  },
  "BitMax": {
    id: "d3000000-0000-0000-0000-000000000930",
    name: "BitMax",
    slug: "bitmax",
    logo: "/images/brokers/bitmax.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "0.1% trading fee",
    platforms: ["BitMax Platform", "BitMax Mobile", "BitMax API"],
    regulation: ["Various jurisdictions", "Compliance programs"],
    pros: ["No minimum deposit", "Advanced trading features", "High liquidity", "Institutional services"],
    cons: ["Complex for beginners", "Regulatory uncertainty", "Limited fiat options"],
    url: "https://www.bitmax.io",
    country: "Singapore",
    established: "2018",
    feature: "Advanced Crypto Exchange",
    description: "BitMax is a Singapore-based advanced cryptocurrency exchange offering high liquidity and institutional-grade services with sophisticated trading features for professional crypto traders. Key features include advanced trading, high liquidity, $0 min deposit. Particularly suitable for professional crypto traders seeking advanced features with high liquidity and institutional services. Updated May 2023.",
    headline: "BitMax is an advanced cryptocurrency exchange renowned for its high liquidity and institutional-grade services. With sophisticated trading features and professional infrastructure, BitMax serves serious crypto traders seeking advanced trading capabilities with institutional-quality execution.",
    faqs: [
      {
        question: "Is BitMax regulated?",
        answer: "BitMax operates under various jurisdictions with compliance programs, ensuring operational oversight for cryptocurrency trading."
      },
      {
        question: "What is the minimum deposit for BitMax?",
        answer: "BitMax has no minimum deposit requirement for cryptocurrency trading accounts."
      },
      {
        question: "What makes BitMax special?",
        answer: "BitMax offers advanced cryptocurrency trading with high liquidity and institutional-grade services for professional traders."
      }
    ]
  },
  "EightCap": {
    id: "d4000000-0000-0000-0000-000000000940",
    name: "EightCap",
    slug: "eightcap",
    logo: "/images/brokers/eightcap.png",
    rating: 4.2,
    minDeposit: 100,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "EightCap Mobile"],
    regulation: ["ASIC", "SCB"],
    pros: ["ASIC regulation", "Raw spreads", "Fast execution", "Multiple asset classes"],
    cons: ["Commission-based accounts", "Limited educational resources", "Higher minimum for some accounts"],
    url: "https://www.eightcap.com",
    country: "Australia",
    established: "2009",
    feature: "ASIC-Regulated Raw Spreads",
    description: "EightCap is an Australia-based ASIC-regulated broker offering raw spreads from 0.0 pips with fast execution across forex, CFDs, and crypto. Key features include ASIC, SCB regulation, $100 min deposit, raw spreads. Particularly suitable for traders seeking ASIC-regulated raw spreads with fast execution and multi-asset trading. Updated May 2023.",
    headline: "EightCap is an ASIC-regulated broker renowned for its raw spreads from 0.0 pips and fast execution technology. With strong regulatory oversight and competitive pricing, EightCap serves traders seeking professional execution with transparent pricing across multiple asset classes.",
    faqs: [
      {
        question: "Is EightCap regulated?",
        answer: "EightCap is regulated by ASIC (Australian Securities and Investments Commission) and SCB, ensuring comprehensive regulatory oversight."
      },
      {
        question: "What is the minimum deposit for EightCap?",
        answer: "EightCap has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes EightCap special?",
        answer: "EightCap offers ASIC regulation with raw spreads from 0.0 pips and fast execution across multiple asset classes."
      }
    ]
  },
  "FXFlat Pro": {
    id: "d5000000-0000-0000-0000-000000000950",
    name: "FXFlat Pro",
    slug: "fxflat-pro",
    logo: "/images/brokers/fxflat-pro.png",
    rating: 4.2,
    minDeposit: 500,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "FXFlat Mobile"],
    regulation: ["BaFin", "CySEC"],
    pros: ["German BaFin regulation", "Raw spreads", "Professional platform", "European focus"],
    cons: ["Higher minimum deposit", "Complex for beginners", "Limited crypto options"],
    url: "https://www.fxflat.com",
    country: "Germany",
    established: "2008",
    feature: "German BaFin-Regulated Professional Trading",
    description: "FXFlat Pro is a Germany-based BaFin-regulated professional broker offering raw spreads from 0.0 pips with advanced platforms for serious European traders. Key features include BaFin, CySEC regulation, $500 min deposit, professional trading. Particularly suitable for professional European traders seeking BaFin regulation with raw spreads and advanced platforms. Updated May 2023.",
    headline: "FXFlat Pro is a German BaFin-regulated professional broker renowned for its raw spreads and advanced trading platforms. With strong European regulatory oversight and professional-grade features, FXFlat Pro serves serious European traders seeking regulatory excellence with competitive pricing.",
    faqs: [
      {
        question: "Is FXFlat Pro regulated?",
        answer: "FXFlat Pro is regulated by BaFin (German Federal Financial Supervisory Authority) and CySEC, ensuring comprehensive European regulatory oversight."
      },
      {
        question: "What is the minimum deposit for FXFlat Pro?",
        answer: "FXFlat Pro has a minimum deposit of $500 for professional trading accounts."
      },
      {
        question: "What makes FXFlat Pro special?",
        answer: "FXFlat Pro offers German BaFin regulation with raw spreads from 0.0 pips and professional-grade trading platforms."
      }
    ]
  },
  "BitMEX": {
    id: "d6000000-0000-0000-0000-000000000960",
    name: "BitMEX",
    slug: "bitmex",
    logo: "/images/brokers/bitmex.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "0.075% maker fee",
    platforms: ["BitMEX Platform", "BitMEX Mobile", "BitMEX API"],
    regulation: ["Seychelles FSA", "Compliance programs"],
    pros: ["No minimum deposit", "High leverage", "Advanced derivatives", "Deep liquidity"],
    cons: ["Complex for beginners", "High risk products", "Regulatory restrictions"],
    url: "https://www.bitmex.com",
    country: "Seychelles",
    established: "2014",
    feature: "Advanced Crypto Derivatives",
    description: "BitMEX is a Seychelles-based advanced cryptocurrency derivatives exchange offering high leverage and deep liquidity for professional crypto derivatives trading. Key features include advanced derivatives, high leverage, $0 min deposit. Particularly suitable for professional crypto traders seeking advanced derivatives with high leverage and deep liquidity. Updated May 2023.",
    headline: "BitMEX is a leading cryptocurrency derivatives exchange renowned for its advanced trading features and deep liquidity. With high leverage options and sophisticated derivatives products, BitMEX serves professional crypto traders seeking advanced derivatives trading capabilities.",
    faqs: [
      {
        question: "Is BitMEX regulated?",
        answer: "BitMEX is regulated by Seychelles FSA with comprehensive compliance programs for cryptocurrency derivatives trading."
      },
      {
        question: "What is the minimum deposit for BitMEX?",
        answer: "BitMEX has no minimum deposit requirement for cryptocurrency derivatives trading."
      },
      {
        question: "What makes BitMEX special?",
        answer: "BitMEX offers advanced cryptocurrency derivatives with high leverage and deep liquidity for professional traders."
      }
    ]
  },
  "SoFi Invest": {
    id: "d7000000-0000-0000-0000-000000000970",
    name: "SoFi Invest",
    slug: "sofi-invest",
    logo: "/images/brokers/sofi-invest.png",
    rating: 4.2,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["SoFi Invest App", "SoFi Web Platform"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Commission-free trading", "User-friendly interface", "Educational resources"],
    cons: ["Limited advanced tools", "No mutual funds", "Limited international markets"],
    url: "https://www.sofi.com/invest",
    country: "USA",
    established: "2011",
    feature: "User-Friendly Commission-Free Investing",
    description: "SoFi Invest is a US-based commission-free investment platform offering user-friendly interface with educational resources for stocks, ETFs, and crypto trading. Key features include SEC, FINRA regulation, $0 min deposit, user-friendly platform. Particularly suitable for beginner investors seeking commission-free investing with educational support and user-friendly interface. Updated May 2023.",
    headline: "SoFi Invest is a user-friendly commission-free investment platform renowned for its intuitive interface and comprehensive educational resources. With strong regulatory oversight and accessible investing, SoFi Invest serves beginner investors seeking simple, commission-free investing with educational support.",
    faqs: [
      {
        question: "Is SoFi Invest regulated?",
        answer: "SoFi Invest is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for SoFi Invest?",
        answer: "SoFi Invest has no minimum deposit requirement for most investment accounts."
      },
      {
        question: "What makes SoFi Invest special?",
        answer: "SoFi Invest offers user-friendly commission-free investing with comprehensive educational resources for beginners."
      }
    ]
  },
  "FXFlat": {
    id: "d8000000-0000-0000-0000-000000000980",
    name: "FXFlat",
    slug: "fxflat",
    logo: "/images/brokers/fxflat.png",
    rating: 4.2,
    minDeposit: 500,
    spread: "From 1.2 pips",
    platforms: ["MT4", "MT5", "FXFlat Trader"],
    regulation: ["BaFin", "CySEC"],
    pros: ["German BaFin regulation", "European focus", "Multiple platforms", "Educational resources"],
    cons: ["Higher minimum deposit", "Higher spreads", "Limited crypto options"],
    url: "https://www.fxflat.com",
    country: "Germany",
    established: "2008",
    feature: "German BaFin-Regulated European Trading",
    description: "FXFlat is a Germany-based BaFin-regulated broker offering European-focused trading with multiple platforms and comprehensive educational resources for European traders. Key features include BaFin, CySEC regulation, $500 min deposit, European focus. Particularly suitable for European traders seeking BaFin regulation with comprehensive educational resources and European market focus. Updated May 2023.",
    headline: "FXFlat is a German BaFin-regulated broker renowned for its European market focus and comprehensive educational resources. With strong regulatory oversight and European expertise, FXFlat serves European traders seeking regulatory excellence with educational support.",
    faqs: [
      {
        question: "Is FXFlat regulated?",
        answer: "FXFlat is regulated by BaFin (German Federal Financial Supervisory Authority) and CySEC, ensuring comprehensive European regulatory oversight."
      },
      {
        question: "What is the minimum deposit for FXFlat?",
        answer: "FXFlat has a minimum deposit of $500 for most trading accounts."
      },
      {
        question: "What makes FXFlat special?",
        answer: "FXFlat offers German BaFin regulation with European market focus and comprehensive educational resources."
      }
    ]
  },
  "Vantagepoint": {
    id: "d9000000-0000-0000-0000-000000000990",
    name: "Vantagepoint",
    slug: "vantagepoint",
    logo: "/images/brokers/vantagepoint.png",
    rating: 4.2,
    minDeposit: 25,
    spread: "From 1.0 pips",
    platforms: ["MT4", "MT5", "Vantagepoint Mobile"],
    regulation: ["ASIC", "VFSC"],
    pros: ["Very low minimum deposit", "ASIC regulation", "Multiple asset classes", "Educational resources"],
    cons: ["Higher spreads", "Limited advanced tools", "Complex fee structure"],
    url: "https://www.vantagepointtrading.com",
    country: "Australia",
    established: "2009",
    feature: "Accessible ASIC-Regulated Multi-Asset Trading",
    description: "Vantagepoint is an Australia-based ASIC-regulated broker offering very low minimum deposits with multi-asset trading across forex, CFDs, and crypto. Key features include ASIC, VFSC regulation, $25 min deposit, accessible trading. Particularly suitable for beginner traders seeking ASIC-regulated multi-asset trading with very low entry barriers. Updated May 2023.",
    headline: "Vantagepoint is an accessible ASIC-regulated broker renowned for its very low minimum deposits and multi-asset trading capabilities. With strong regulatory oversight and beginner-friendly approach, Vantagepoint serves new traders seeking ASIC regulation with affordable entry requirements.",
    faqs: [
      {
        question: "Is Vantagepoint regulated?",
        answer: "Vantagepoint is regulated by ASIC (Australian Securities and Investments Commission) and VFSC, ensuring comprehensive regulatory oversight."
      },
      {
        question: "What is the minimum deposit for Vantagepoint?",
        answer: "Vantagepoint has a very low minimum deposit of $25 for most trading accounts."
      },
      {
        question: "What makes Vantagepoint special?",
        answer: "Vantagepoint offers ASIC regulation with very low minimum deposits and accessible multi-asset trading for beginners."
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

// Create broker pages for Batch 13 brokers
const brokersToCreate = ["Alpha Trading", "Darwinex", "FIBO Group", "BitMax", "EightCap", "FXFlat Pro", "BitMEX", "SoFi Invest", "FXFlat", "Vantagepoint"];

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

console.log('🎉 Batch 13 broker pages created successfully!');
