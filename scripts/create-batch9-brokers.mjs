import fs from 'fs';
import path from 'path';

// Broker data from BROKER_DATABASE - BATCH 9
const brokerData = {
  "Capital.com": {
    id: "g0000000-0000-0000-0000-000000000500",
    name: "Capital.com",
    slug: "capitalcom",
    logo: "/images/brokers/capital-com.png",
    rating: 4.5,
    minDeposit: 20,
    spread: "From 0.6 pips",
    platforms: ["Capital.com Platform", "Capital.com Mobile", "MT4"],
    regulation: ["FCA", "CySEC", "ASIC"],
    pros: ["Low minimum deposit", "AI-powered insights", "Strong regulation", "Wide asset range"],
    cons: ["Limited advanced tools", "Withdrawal fees", "Complex fee structure"],
    url: "https://www.capital.com",
    country: "UK",
    established: "2016",
    feature: "AI-Powered Trading Platform",
    description: "Capital.com is a UK-based multi-asset broker offering AI-powered trading insights across forex, stocks, crypto, and indices. Key features include FCA, CySEC regulation, $20 min deposit, AI insights. Particularly suitable for traders seeking intelligent market analysis with comprehensive asset coverage. Updated May 2023.",
    headline: "Capital.com is an innovative multi-asset broker renowned for its AI-powered trading insights and comprehensive market coverage. With strong regulatory oversight and intelligent trading tools, Capital.com serves modern traders who demand smart technology and diverse asset access.",
    faqs: [
      {
        question: "Is Capital.com regulated?",
        answer: "Capital.com is regulated by FCA, CySEC, and ASIC, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for Capital.com?",
        answer: "Capital.com has a minimum deposit of $20, making trading accessible to most investors."
      },
      {
        question: "What makes Capital.com special?",
        answer: "Capital.com offers AI-powered trading insights and comprehensive coverage of forex, stocks, crypto, and indices."
      }
    ]
  },
  "Tradovate Futures": {
    id: "g1000000-0000-0000-0000-000000000510",
    name: "Tradovate Futures",
    slug: "tradovate-futures",
    logo: "/images/brokers/tradovate-futures.png",
    rating: 4.5,
    minDeposit: 0,
    spread: "From $0.85 per contract",
    platforms: ["Tradovate Platform", "Tradovate Mobile", "Tradovate API"],
    regulation: ["CFTC", "NFA"],
    pros: ["Cloud-based platform", "Low commissions", "Advanced tools", "Mobile-first design"],
    cons: ["Futures only", "Limited educational content", "New platform"],
    url: "https://www.tradovate.com",
    country: "USA",
    established: "2014",
    feature: "Cloud-Based Futures Platform",
    description: "Tradovate Futures is a modern cloud-based futures trading platform offering low commissions and advanced tools for professional futures traders. Key features include CFTC, NFA regulation, $0 min deposit, cloud technology. Particularly suitable for futures traders seeking cutting-edge technology and competitive pricing. Updated May 2023.",
    headline: "Tradovate Futures is a cutting-edge cloud-based futures trading platform designed for the modern trader, offering competitive commissions and advanced technology. With mobile-first design and sophisticated tools, Tradovate serves futures traders who demand innovation and flexibility.",
    faqs: [
      {
        question: "Is Tradovate Futures regulated?",
        answer: "Tradovate Futures is regulated by CFTC and NFA, ensuring comprehensive oversight for futures trading."
      },
      {
        question: "What is the minimum deposit for Tradovate Futures?",
        answer: "Tradovate Futures has no minimum deposit requirement for futures trading accounts."
      },
      {
        question: "What makes Tradovate Futures special?",
        answer: "Tradovate Futures offers a modern cloud-based platform with mobile-first design and competitive futures trading commissions."
      }
    ]
  },
  "HotForex ECN": {
    id: "g2000000-0000-0000-0000-000000000520",
    name: "HotForex ECN",
    slug: "hotforex-ecn",
    logo: "/images/brokers/hotforex-ecn.png",
    rating: 4.5,
    minDeposit: 50,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "HotForex Mobile"],
    regulation: ["CySEC", "FCA", "DFSA"],
    pros: ["ECN execution", "Tight spreads", "Strong regulation", "Professional tools"],
    cons: ["Commission-based", "Higher minimum deposit", "Complex for beginners"],
    url: "https://www.hotforex.com",
    country: "Cyprus",
    established: "2010",
    feature: "ECN Trading Specialist",
    description: "HotForex ECN is a professional ECN broker offering institutional-grade execution with tight spreads and transparent pricing. Key features include CySEC, FCA regulation, $50 min deposit, ECN execution. Particularly suitable for professional traders seeking institutional-quality execution and transparent pricing. Updated May 2023.",
    headline: "HotForex ECN is a professional ECN broker renowned for its institutional-grade execution and transparent pricing model. With tight spreads and direct market access, HotForex ECN serves professional traders who demand the highest execution quality and market transparency.",
    faqs: [
      {
        question: "Is HotForex ECN regulated?",
        answer: "HotForex ECN is regulated by CySEC, FCA, and DFSA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for HotForex ECN?",
        answer: "HotForex ECN has a minimum deposit of $50 for ECN trading accounts."
      },
      {
        question: "What makes HotForex ECN special?",
        answer: "HotForex ECN offers true ECN execution with direct market access and institutional-grade trading conditions."
      }
    ]
  },
  "Forex.com": {
    id: "g3000000-0000-0000-0000-000000000530",
    name: "Forex.com",
    slug: "forexcom",
    logo: "/images/brokers/forex-com.png",
    rating: 4.4,
    minDeposit: 100,
    spread: "From 1.2 pips",
    platforms: ["MT4", "MT5", "Forex.com Platform", "Forex.com Mobile"],
    regulation: ["CFTC", "NFA", "FCA"],
    pros: ["Strong regulation", "Comprehensive education", "Advanced charting", "Global presence"],
    cons: ["Higher spreads", "Inactivity fees", "Limited crypto options"],
    url: "https://www.forex.com",
    country: "USA",
    established: "1999",
    feature: "Established Forex Leader",
    description: "Forex.com is a well-established forex broker offering comprehensive trading services with strong regulation and educational resources. Key features include CFTC, NFA regulation, $100 min deposit, educational focus. Particularly suitable for forex traders seeking established reputation with comprehensive support and education. Updated May 2023.",
    headline: "Forex.com is a trusted forex industry leader with over two decades of experience, offering comprehensive trading services and educational resources. With strong regulatory oversight and global presence, Forex.com serves traders seeking reliability and professional forex trading solutions.",
    faqs: [
      {
        question: "Is Forex.com regulated?",
        answer: "Forex.com is regulated by CFTC, NFA, and FCA, ensuring comprehensive regulatory oversight across major jurisdictions."
      },
      {
        question: "What is the minimum deposit for Forex.com?",
        answer: "Forex.com has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes Forex.com special?",
        answer: "Forex.com offers over 20 years of forex expertise with comprehensive education and strong regulatory compliance."
      }
    ]
  },
  "HYCM": {
    id: "g4000000-0000-0000-0000-000000000540",
    name: "HYCM",
    slug: "hycm",
    logo: "/images/brokers/hycm.png",
    rating: 4.4,
    minDeposit: 100,
    spread: "From 1.0 pips",
    platforms: ["MT4", "MT5", "HYCM Platform"],
    regulation: ["FCA", "CySEC", "DFSA"],
    pros: ["Strong regulation", "Competitive spreads", "Professional service", "Global presence"],
    cons: ["Higher minimum deposit", "Limited educational content", "Withdrawal fees"],
    url: "https://www.hycm.com",
    country: "UK",
    established: "1977",
    feature: "Established Global Broker",
    description: "HYCM is a well-established global broker offering forex, CFDs, and commodities trading with strong regulation and professional service. Key features include FCA, CySEC regulation, $100 min deposit, global presence. Particularly suitable for traders seeking established reputation with professional trading conditions. Updated May 2023.",
    headline: "HYCM is a trusted global broker with over 40 years of experience, offering professional trading services across forex, CFDs, and commodities. With strong regulatory oversight and established reputation, HYCM serves traders seeking reliability and institutional-quality service.",
    faqs: [
      {
        question: "Is HYCM regulated?",
        answer: "HYCM is regulated by FCA, CySEC, and DFSA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for HYCM?",
        answer: "HYCM has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes HYCM special?",
        answer: "HYCM offers over 40 years of trading expertise with strong regulation and professional service quality."
      }
    ]
  },
  "Monex": {
    id: "g5000000-0000-0000-0000-000000000550",
    name: "Monex",
    slug: "monex",
    logo: "/images/brokers/monex.png",
    rating: 4.4,
    minDeposit: 0,
    spread: "Competitive fees",
    platforms: ["Monex Platform", "Monex Mobile", "Monex Pro"],
    regulation: ["JFSA", "FSA"],
    pros: ["No minimum deposit", "Japanese market expertise", "Comprehensive services", "Strong regulation"],
    cons: ["Limited international access", "Language barriers", "Complex fee structure"],
    url: "https://www.monex.com",
    country: "Japan",
    established: "1999",
    feature: "Japanese Market Leader",
    description: "Monex is a leading Japanese financial services company offering comprehensive trading solutions across stocks, forex, and futures. Key features include JFSA regulation, $0 min deposit, Japanese expertise. Particularly suitable for investors seeking Japanese market access and comprehensive financial services. Updated May 2023.",
    headline: "Monex is a premier Japanese financial services company renowned for its comprehensive trading solutions and deep market expertise. With strong regulatory oversight and innovative technology, Monex serves investors seeking professional Japanese market access and diverse investment options.",
    faqs: [
      {
        question: "Is Monex regulated?",
        answer: "Monex is regulated by the JFSA (Japan Financial Services Agency) and operates under strict Japanese financial regulations."
      },
      {
        question: "What is the minimum deposit for Monex?",
        answer: "Monex has no minimum deposit requirement for most trading accounts."
      },
      {
        question: "What makes Monex special?",
        answer: "Monex offers deep Japanese market expertise with comprehensive financial services and innovative trading technology."
      }
    ]
  },
  "FXTM": {
    id: "g6000000-0000-0000-0000-000000000560",
    name: "FXTM",
    slug: "fxtm",
    logo: "/images/brokers/fxtm.png",
    rating: 4.4,
    minDeposit: 200,
    spread: "From 1.3 pips",
    platforms: ["MT4", "MT5", "FXTM Mobile"],
    regulation: ["CySEC", "FCA", "FSCA"],
    pros: ["Strong regulation", "Educational resources", "Multiple account types", "Global presence"],
    cons: ["Higher minimum deposit", "Limited crypto options", "Withdrawal fees"],
    url: "https://www.forextime.com",
    country: "Cyprus",
    established: "2011",
    feature: "Educational Focus Broker",
    description: "FXTM is a Cyprus-based multi-asset broker offering forex, CFDs, and stocks trading with strong educational focus and regulatory oversight. Key features include CySEC, FCA regulation, $200 min deposit, educational resources. Particularly suitable for traders seeking comprehensive education with professional trading conditions. Updated May 2023.",
    headline: "FXTM is a trusted multi-asset broker renowned for its comprehensive educational resources and strong regulatory oversight. With diverse trading options and professional support, FXTM serves traders seeking knowledge-driven trading with reliable market access.",
    faqs: [
      {
        question: "Is FXTM regulated?",
        answer: "FXTM is regulated by CySEC, FCA, and FSCA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for FXTM?",
        answer: "FXTM has a minimum deposit of $200 for most trading accounts."
      },
      {
        question: "What makes FXTM special?",
        answer: "FXTM offers comprehensive educational resources and strong regulatory compliance with diverse trading options."
      }
    ]
  },
  "Axi": {
    id: "g7000000-0000-0000-0000-000000000570",
    name: "Axi",
    slug: "axi",
    logo: "/images/brokers/axi.png",
    rating: 4.4,
    minDeposit: 1,
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "Axi Mobile"],
    regulation: ["ASIC", "FCA", "DFSA"],
    pros: ["Very low minimum deposit", "Tight spreads", "Strong regulation", "Professional tools"],
    cons: ["Commission-based accounts", "Limited educational content", "Complex for beginners"],
    url: "https://www.axi.com",
    country: "Australia",
    established: "2007",
    feature: "Ultra-Low Entry Barrier",
    description: "Axi is an Australian-based multi-asset broker offering forex, CFDs, and stocks trading with ultra-low minimum deposits and tight spreads. Key features include ASIC, FCA regulation, $1 min deposit, tight spreads. Particularly suitable for traders seeking accessible entry with professional trading conditions. Updated May 2023.",
    headline: "Axi is a trusted Australian broker renowned for its ultra-low entry barriers and tight spreads, offering professional trading conditions with strong regulatory oversight. With accessible pricing and advanced tools, Axi serves traders seeking quality execution without high capital requirements.",
    faqs: [
      {
        question: "Is Axi regulated?",
        answer: "Axi is regulated by ASIC, FCA, and DFSA, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for Axi?",
        answer: "Axi has a minimum deposit of just $1, making trading accessible to everyone."
      },
      {
        question: "What makes Axi special?",
        answer: "Axi offers ultra-low minimum deposits with tight spreads and professional trading conditions."
      }
    ]
  },
  "Huobi": {
    id: "g8000000-0000-0000-0000-000000000580",
    name: "Huobi",
    slug: "huobi",
    logo: "/images/brokers/huobi.png",
    rating: 4.4,
    minDeposit: 0,
    spread: "0.2% trading fee",
    platforms: ["Huobi Platform", "Huobi Pro", "Huobi Mobile"],
    regulation: ["Various jurisdictions", "Compliance programs"],
    pros: ["No minimum deposit", "High liquidity", "Wide crypto selection", "Advanced features"],
    cons: ["Regulatory uncertainties", "Complex for beginners", "Limited fiat options"],
    url: "https://www.huobi.com",
    country: "Seychelles",
    established: "2013",
    feature: "High Liquidity Exchange",
    description: "Huobi is a leading cryptocurrency exchange offering high liquidity trading across a wide selection of digital assets with advanced features. Key features include high liquidity, wide selection, advanced trading. Particularly suitable for crypto traders seeking deep liquidity and comprehensive digital asset access. Updated May 2023.",
    headline: "Huobi is a premier cryptocurrency exchange renowned for its high liquidity and comprehensive digital asset selection. With advanced trading features and deep market access, Huobi serves crypto traders who demand institutional-grade liquidity and diverse cryptocurrency options.",
    faqs: [
      {
        question: "Is Huobi regulated?",
        answer: "Huobi operates under various regulatory frameworks and maintains compliance programs in multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for Huobi?",
        answer: "Huobi has no minimum deposit requirement for cryptocurrency trading."
      },
      {
        question: "What makes Huobi special?",
        answer: "Huobi offers high liquidity trading with a comprehensive selection of cryptocurrencies and advanced trading features."
      }
    ]
  },
  "ATFX": {
    id: "g9000000-0000-0000-0000-000000000590",
    name: "ATFX",
    slug: "atfx",
    logo: "/images/brokers/atfx.png",
    rating: 4.4,
    minDeposit: 100,
    spread: "From 1.8 pips",
    platforms: ["MT4", "MT5", "ATFX Mobile"],
    regulation: ["FCA", "CySEC", "ASIC"],
    pros: ["Strong regulation", "Global presence", "Educational resources", "Professional service"],
    cons: ["Higher spreads", "Limited advanced tools", "Withdrawal fees"],
    url: "https://www.atfx.com",
    country: "UK",
    established: "2017",
    feature: "Global Multi-Asset Broker",
    description: "ATFX is a UK-based global multi-asset broker offering forex, CFDs, and crypto trading with strong regulation and professional service. Key features include FCA, CySEC regulation, $100 min deposit, global presence. Particularly suitable for traders seeking regulated global access with professional support and educational resources. Updated May 2023.",
    headline: "ATFX is a trusted global multi-asset broker renowned for its strong regulatory oversight and professional trading services. With comprehensive market access and educational support, ATFX serves traders seeking reliable global trading with institutional-quality service.",
    faqs: [
      {
        question: "Is ATFX regulated?",
        answer: "ATFX is regulated by FCA, CySEC, and ASIC, ensuring comprehensive regulatory oversight across multiple jurisdictions."
      },
      {
        question: "What is the minimum deposit for ATFX?",
        answer: "ATFX has a minimum deposit of $100 for most trading accounts."
      },
      {
        question: "What makes ATFX special?",
        answer: "ATFX offers strong global regulation with comprehensive multi-asset trading and professional educational resources."
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

// Create broker pages for Batch 9 brokers
const brokersToCreate = ["Capital.com", "Tradovate Futures", "HotForex ECN", "Forex.com", "HYCM", "Monex", "FXTM", "Axi", "Huobi", "ATFX"];

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

console.log('🎉 Batch 9 broker pages created successfully!');
