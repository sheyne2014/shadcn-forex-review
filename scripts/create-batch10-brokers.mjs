import fs from 'fs';
import path from 'path';

// Broker data from BROKER_DATABASE - BATCH 10
const brokerData = {
  "FXOpen": {
    id: "a0000000-0000-0000-0000-000000000600",
    name: "FXOpen",
    slug: "fxopen",
    logo: "/images/brokers/fxopen.png",
    rating: 4.4,
    minDeposit: 1,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "FXOpen Platform"],
    regulation: ["FCA", "CySEC", "ASIC"],
    pros: ["Ultra-low minimum deposit", "ECN execution", "Strong regulation", "Multiple platforms"],
    cons: ["Commission-based accounts", "Complex fee structure", "Limited educational content"],
    url: "https://www.fxopen.com",
    country: "UK",
    established: "2005",
    feature: "Ultra-Accessible ECN Trading",
    description: "FXOpen is a UK-based multi-asset broker offering ultra-low minimum deposits with ECN execution and strong regulatory oversight. Key features include FCA, CySEC regulation, $1 min deposit, ECN execution. Particularly suitable for traders seeking accessible professional trading with ECN conditions. Updated May 2023.",
    headline: "FXOpen is a trusted multi-asset broker renowned for its ultra-low minimum deposits and ECN execution quality. With strong regulatory oversight and professional trading conditions, FXOpen serves traders seeking accessible entry to institutional-grade trading.",
    faqs: [
      {
        question: "Is FXOpen regulated?",
        answer: "FXOpen is regulated by FCA, CySEC, and ASIC, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for FXOpen?",
        answer: "FXOpen has a minimum deposit of just $1, making professional trading accessible to everyone."
      },
      {
        question: "What makes FXOpen special?",
        answer: "FXOpen offers ultra-low minimum deposits with ECN execution and strong regulatory compliance."
      }
    ]
  },
  "Dukascopy": {
    id: "a1000000-0000-0000-0000-000000000610",
    name: "Dukascopy",
    slug: "dukascopy",
    logo: "/images/brokers/dukascopy.png",
    rating: 4.4,
    minDeposit: 100,
    spread: "From 0.1 pips",
    platforms: ["JForex", "MT4", "Dukascopy Mobile"],
    regulation: ["FINMA", "JFSC"],
    pros: ["Swiss banking heritage", "ECN execution", "Advanced technology", "Transparent pricing"],
    cons: ["Higher minimum deposit", "Complex platform", "Limited crypto options"],
    url: "https://www.dukascopy.com",
    country: "Switzerland",
    established: "1998",
    feature: "Swiss Banking Excellence",
    description: "Dukascopy is a Swiss-based ECN broker offering institutional-grade trading with Swiss banking heritage and advanced technology. Key features include FINMA regulation, $100 min deposit, ECN execution. Particularly suitable for professional traders seeking Swiss quality and transparent pricing. Updated May 2023.",
    headline: "Dukascopy is a premier Swiss ECN broker renowned for its institutional-grade trading technology and Swiss banking heritage. With transparent pricing and advanced execution, Dukascopy serves professional traders who demand the highest quality and reliability.",
    faqs: [
      {
        question: "Is Dukascopy regulated?",
        answer: "Dukascopy is regulated by FINMA (Swiss Financial Market Supervisory Authority) and JFSC, ensuring the highest regulatory standards."
      },
      {
        question: "What is the minimum deposit for Dukascopy?",
        answer: "Dukascopy has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes Dukascopy special?",
        answer: "Dukascopy offers Swiss banking heritage with ECN execution and institutional-grade technology."
      }
    ]
  },
  "BlackBull Markets": {
    id: "a2000000-0000-0000-0000-000000000620",
    name: "BlackBull Markets",
    slug: "blackbull-markets",
    logo: "/images/brokers/blackbull-markets.png",
    rating: 4.4,
    minDeposit: 10,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "BlackBull Mobile"],
    regulation: ["FMA", "ASIC"],
    pros: ["Very low minimum deposit", "ECN execution", "Competitive spreads", "Copy trading"],
    cons: ["Limited regulation", "New Zealand focus", "Limited educational content"],
    url: "https://www.blackbull.com",
    country: "New Zealand",
    established: "2014",
    feature: "Low-Cost ECN Access",
    description: "BlackBull Markets is a New Zealand-based ECN broker offering very low minimum deposits with competitive spreads and copy trading. Key features include FMA, ASIC regulation, $10 min deposit, ECN execution. Particularly suitable for traders seeking affordable ECN access with professional conditions. Updated May 2023.",
    headline: "BlackBull Markets is a trusted ECN broker renowned for its very low minimum deposits and competitive spreads. With professional execution and copy trading features, BlackBull serves traders seeking affordable access to institutional-grade trading conditions.",
    faqs: [
      {
        question: "Is BlackBull Markets regulated?",
        answer: "BlackBull Markets is regulated by FMA (New Zealand) and ASIC (Australia), ensuring comprehensive regulatory oversight."
      },
      {
        question: "What is the minimum deposit for BlackBull Markets?",
        answer: "BlackBull Markets has a minimum deposit of just $10 for ECN trading accounts."
      },
      {
        question: "What makes BlackBull Markets special?",
        answer: "BlackBull Markets offers very low minimum deposits with ECN execution and competitive spreads."
      }
    ]
  },
  "Merrill Edge": {
    id: "a3000000-0000-0000-0000-000000000630",
    name: "Merrill Edge",
    slug: "merrill-edge",
    logo: "/images/brokers/merrill-edge.png",
    rating: 4.4,
    minDeposit: 0,
    spread: "$0 commissions",
    platforms: ["Merrill Edge Platform", "Merrill Edge Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["No minimum deposit", "Bank of America integration", "Research tools", "Commission-free trading"],
    cons: ["Limited international markets", "Basic platform features", "Account fees"],
    url: "https://www.merrilledge.com",
    country: "USA",
    established: "2010",
    feature: "Bank Integration Specialist",
    description: "Merrill Edge is Bank of America's investment platform offering commission-free trading with seamless banking integration. Key features include SEC, FINRA regulation, $0 min deposit, banking integration. Particularly suitable for Bank of America customers seeking integrated investing with research tools. Updated May 2023.",
    headline: "Merrill Edge is Bank of America's premier investment platform, offering commission-free trading with seamless banking integration and professional research tools. With strong regulatory oversight and institutional backing, Merrill Edge serves investors seeking comprehensive financial services.",
    faqs: [
      {
        question: "Is Merrill Edge regulated?",
        answer: "Merrill Edge is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for Merrill Edge?",
        answer: "Merrill Edge has no minimum deposit requirement for most investment accounts."
      },
      {
        question: "What makes Merrill Edge special?",
        answer: "Merrill Edge offers seamless Bank of America integration with professional research and commission-free trading."
      }
    ]
  },
  "Trading 212": {
    id: "a4000000-0000-0000-0000-000000000640",
    name: "Trading 212",
    slug: "trading-212",
    logo: "/images/brokers/trading-212.png",
    rating: 4.4,
    minDeposit: 1,
    spread: "$0 commissions",
    platforms: ["Trading 212 Platform", "Trading 212 Mobile"],
    regulation: ["FCA", "CySEC"],
    pros: ["Ultra-low minimum deposit", "Commission-free trading", "Fractional shares", "User-friendly platform"],
    cons: ["Limited advanced tools", "European focus", "Account restrictions"],
    url: "https://www.trading212.com",
    country: "UK",
    established: "2004",
    feature: "Commission-Free Pioneer",
    description: "Trading 212 is a UK-based commission-free broker offering ultra-low minimum deposits with fractional shares and user-friendly platform. Key features include FCA, CySEC regulation, $1 min deposit, commission-free trading. Particularly suitable for beginner investors seeking accessible commission-free investing. Updated May 2023.",
    headline: "Trading 212 is a pioneering commission-free broker renowned for its ultra-low minimum deposits and user-friendly platform. With fractional shares and strong regulatory oversight, Trading 212 serves modern investors seeking accessible and affordable investing.",
    faqs: [
      {
        question: "Is Trading 212 regulated?",
        answer: "Trading 212 is regulated by FCA and CySEC, ensuring comprehensive regulatory oversight across European markets."
      },
      {
        question: "What is the minimum deposit for Trading 212?",
        answer: "Trading 212 has a minimum deposit of just $1, making investing accessible to everyone."
      },
      {
        question: "What makes Trading 212 special?",
        answer: "Trading 212 offers commission-free trading with fractional shares and ultra-low minimum deposits."
      }
    ]
  },
  "M1 Finance": {
    id: "a5000000-0000-0000-0000-000000000650",
    name: "M1 Finance",
    slug: "m1-finance",
    logo: "/images/brokers/m1-finance.png",
    rating: 4.4,
    minDeposit: 100,
    spread: "$0 commissions",
    platforms: ["M1 Finance Platform", "M1 Finance Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: ["Automated investing", "Fractional shares", "No management fees", "Portfolio optimization"],
    cons: ["Limited trading options", "No options trading", "Account minimums"],
    url: "https://www.m1finance.com",
    country: "USA",
    established: "2015",
    feature: "Automated Portfolio Management",
    description: "M1 Finance is a US-based automated investing platform offering commission-free trading with portfolio optimization and fractional shares. Key features include SEC, FINRA regulation, $100 min deposit, automated investing. Particularly suitable for long-term investors seeking automated portfolio management with low fees. Updated May 2023.",
    headline: "M1 Finance is an innovative automated investing platform renowned for its portfolio optimization and commission-free trading. With fractional shares and intelligent automation, M1 Finance serves long-term investors seeking hands-off portfolio management with professional optimization.",
    faqs: [
      {
        question: "Is M1 Finance regulated?",
        answer: "M1 Finance is regulated by SEC, FINRA, and provides SIPC protection up to $500,000 per account."
      },
      {
        question: "What is the minimum deposit for M1 Finance?",
        answer: "M1 Finance has a minimum deposit of $100 for most investment accounts."
      },
      {
        question: "What makes M1 Finance special?",
        answer: "M1 Finance offers automated portfolio management with fractional shares and intelligent rebalancing."
      }
    ]
  },
  "Kotak Securities": {
    id: "a6000000-0000-0000-0000-000000000660",
    name: "Kotak Securities",
    slug: "kotak-securities",
    logo: "/images/brokers/kotak-securities.png",
    rating: 4.4,
    minDeposit: 0,
    spread: "Low brokerage",
    platforms: ["Kotak Platform", "Kotak Mobile", "Kotak Pro"],
    regulation: ["SEBI", "NSE", "BSE"],
    pros: ["No minimum deposit", "Indian market expertise", "Low brokerage fees", "Comprehensive services"],
    cons: ["India-focused", "Limited international markets", "Complex fee structure"],
    url: "https://www.kotaksecurities.com",
    country: "India",
    established: "1994",
    feature: "Indian Market Specialist",
    description: "Kotak Securities is India's leading full-service broker offering comprehensive trading and investment services with deep Indian market expertise. Key features include SEBI regulation, $0 min deposit, comprehensive services. Particularly suitable for Indian investors seeking full-service brokerage with market expertise. Updated May 2023.",
    headline: "Kotak Securities is India's premier full-service broker renowned for its comprehensive trading services and deep market expertise. With strong regulatory oversight and extensive offerings, Kotak Securities serves Indian investors seeking professional investment solutions.",
    faqs: [
      {
        question: "Is Kotak Securities regulated?",
        answer: "Kotak Securities is regulated by SEBI and is a member of NSE and BSE, ensuring comprehensive oversight in Indian markets."
      },
      {
        question: "What is the minimum deposit for Kotak Securities?",
        answer: "Kotak Securities has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Kotak Securities special?",
        answer: "Kotak Securities offers comprehensive full-service brokerage with deep Indian market expertise and research."
      }
    ]
  },
  "Optimus Futures": {
    id: "a7000000-0000-0000-0000-000000000670",
    name: "Optimus Futures",
    slug: "optimus-futures",
    logo: "/images/brokers/optimus-futures.png",
    rating: 4.4,
    minDeposit: 500,
    spread: "From $0.85 per contract",
    platforms: ["NinjaTrader", "Sierra Chart", "TradingView"],
    regulation: ["CFTC", "NFA"],
    pros: ["Professional platforms", "Low commissions", "Advanced tools", "Futures expertise"],
    cons: ["Futures only", "Higher minimum deposit", "Complex for beginners"],
    url: "https://www.optimusfutures.com",
    country: "USA",
    established: "2005",
    feature: "Professional Futures Trading",
    description: "Optimus Futures is a US-based futures broker offering professional trading platforms with low commissions and advanced tools for futures traders. Key features include CFTC, NFA regulation, $500 min deposit, professional platforms. Particularly suitable for serious futures traders seeking professional tools and competitive pricing. Updated May 2023.",
    headline: "Optimus Futures is a professional futures broker renowned for its advanced trading platforms and competitive commissions. With comprehensive futures expertise and professional tools, Optimus Futures serves serious traders who demand institutional-quality futures trading.",
    faqs: [
      {
        question: "Is Optimus Futures regulated?",
        answer: "Optimus Futures is regulated by CFTC and NFA, ensuring comprehensive oversight for futures trading."
      },
      {
        question: "What is the minimum deposit for Optimus Futures?",
        answer: "Optimus Futures has a minimum deposit of $500 for futures trading accounts."
      },
      {
        question: "What makes Optimus Futures special?",
        answer: "Optimus Futures offers professional futures trading platforms with competitive commissions and advanced tools."
      }
    ]
  },
  "FXCM": {
    id: "a8000000-0000-0000-0000-000000000680",
    name: "FXCM",
    slug: "fxcm",
    logo: "/images/brokers/fxcm.png",
    rating: 4.3,
    minDeposit: 50,
    spread: "From 1.2 pips",
    platforms: ["Trading Station", "MT4", "FXCM Mobile"],
    regulation: ["FCA", "ASIC", "FSCA"],
    pros: ["Established reputation", "Advanced charting", "Educational resources", "Global presence"],
    cons: ["Higher spreads", "Limited crypto options", "Account fees"],
    url: "https://www.fxcm.com",
    country: "UK",
    established: "1999",
    feature: "Established Forex Pioneer",
    description: "FXCM is a well-established forex broker offering comprehensive trading services with advanced charting and educational resources. Key features include FCA, ASIC regulation, $50 min deposit, Trading Station. Particularly suitable for forex traders seeking established reputation with advanced tools and education. Updated May 2023.",
    headline: "FXCM is a pioneering forex broker with over two decades of experience, offering advanced trading technology and comprehensive educational resources. With strong regulatory oversight and global presence, FXCM serves forex traders seeking reliability and professional trading solutions.",
    faqs: [
      {
        question: "Is FXCM regulated?",
        answer: "FXCM is regulated by FCA, ASIC, and FSCA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for FXCM?",
        answer: "FXCM has a minimum deposit of $50 for most trading accounts."
      },
      {
        question: "What makes FXCM special?",
        answer: "FXCM offers over 20 years of forex expertise with advanced Trading Station platform and comprehensive education."
      }
    ]
  },
  "ThinkMarkets": {
    id: "a9000000-0000-0000-0000-000000000690",
    name: "ThinkMarkets",
    slug: "thinkmarkets",
    logo: "/images/brokers/thinkmarkets.png",
    rating: 4.3,
    minDeposit: 250,
    spread: "From 0.4 pips",
    platforms: ["ThinkTrader", "MT4", "MT5"],
    regulation: ["FCA", "ASIC", "FSCA"],
    pros: ["Proprietary platform", "Competitive spreads", "Strong regulation", "Advanced tools"],
    cons: ["Higher minimum deposit", "Limited educational content", "Complex fee structure"],
    url: "https://www.thinkmarkets.com",
    country: "UK",
    established: "2010",
    feature: "Proprietary Platform Innovation",
    description: "ThinkMarkets is a UK-based multi-asset broker offering proprietary ThinkTrader platform with competitive spreads and advanced tools. Key features include FCA, ASIC regulation, $250 min deposit, ThinkTrader platform. Particularly suitable for traders seeking innovative platform technology with competitive conditions. Updated May 2023.",
    headline: "ThinkMarkets is an innovative multi-asset broker renowned for its proprietary ThinkTrader platform and competitive spreads. With strong regulatory oversight and advanced technology, ThinkMarkets serves traders seeking cutting-edge platform innovation with professional trading conditions.",
    faqs: [
      {
        question: "Is ThinkMarkets regulated?",
        answer: "ThinkMarkets is regulated by FCA, ASIC, and FSCA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for ThinkMarkets?",
        answer: "ThinkMarkets has a minimum deposit of $250 for most trading accounts."
      },
      {
        question: "What makes ThinkMarkets special?",
        answer: "ThinkMarkets offers proprietary ThinkTrader platform with competitive spreads and advanced trading technology."
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

// Create broker pages for Batch 10 brokers
const brokersToCreate = ["FXOpen", "Dukascopy", "BlackBull Markets", "Merrill Edge", "Trading 212", "M1 Finance", "Kotak Securities", "Optimus Futures", "FXCM", "ThinkMarkets"];

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

console.log('🎉 Batch 10 broker pages created successfully!');
