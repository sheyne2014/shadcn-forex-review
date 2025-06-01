import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroBrokerSection } from "@/components/broker-review/HeroBrokerSection";
import { BrokerOverviewSection } from "@/components/broker-review/BrokerOverviewSection";
import { BrokerTradingConditions } from "@/components/broker-review/BrokerTradingConditions";
import { PlatformsSection } from "@/components/broker-review/PlatformsSection";
import { EducationSection } from "@/components/broker-review/EducationSection";
import { ReviewsSection } from "@/components/broker-review/ReviewsSection";
import { BrokerAnalysisWidget } from "@/components/broker-review/BrokerAnalysisWidget";
import { DynamicFAQSection } from "@/components/broker-review/DynamicFAQSection";
import { SimilarBrokersSection } from "@/components/broker-review/SimilarBrokersSection";
import { BrokerPageNavigation, BrokerInternalLinks, BrokerBreadcrumbs } from "@/components/broker-review/BrokerPageNavigation";
import { BrokerReviewSEO } from "@/components/seo/BrokerReviewSEO";
import { Separator } from "@/components/ui/separator";
import { Context7Provider } from "@/components/Context7Provider";
import { RokuAIWrapper } from "@/components/RokuAIWrapper";
import { ClientSideSidebar } from "@/components/broker-review/ClientSideSidebar";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { TrustSignals } from "@/components/trust/TrustSignals";

// eToro-specific components
import { EtoroExecutiveSummary } from "@/components/broker-review/EtoroExecutiveSummary";
import { EtoroTradingConditionsAnalysis } from "@/components/broker-review/EtoroTradingConditionsAnalysis";
import { EtoroSocialFeatures } from "@/components/broker-review/EtoroSocialFeatures";
import { EtoroCompanyBackground } from "@/components/broker-review/EtoroCompanyBackground";
import { EtoroExpertVerdict } from "@/components/broker-review/EtoroExpertVerdict";

interface Props {
  params: { slug: string };
}

// Section definitions for sidebar navigation
const sections = [
  "executive-summary",
  "company-background",
  "social-features",
  "trading-conditions",
  "platforms",
  "education",
  "reviews",
  "expert-verdict",
  "faq",
  "similar-brokers"
];

// Generate metadata for the eToro review page
export async function generateMetadata({ params: _ }: Props): Promise<Metadata> {
  const broker = getEtoroBrokerData();

  if (!broker) {
    return {
      title: "Broker Not Found",
      description: "The requested broker review could not be found."
    };
  }

  return {
    title: `${broker.name} Review 2024 - Social Trading Platform Analysis | BrokerAnalysis`,
    description: `Comprehensive ${broker.name} review covering social trading features, costs, regulation, and platform analysis. Is eToro right for your trading needs?`,
    keywords: [
      "eToro review",
      "eToro broker",
      "social trading",
      "copy trading",
      "eToro fees",
      "eToro regulation",
      "forex broker review",
      "trading platform review"
    ].join(", "),
    openGraph: {
      title: `${broker.name} Review 2024 - Social Trading Platform Analysis`,
      description: `Comprehensive ${broker.name} review covering social trading features, costs, regulation, and platform analysis. Is eToro right for your trading needs?`,
      type: "article",
      url: `https://yoursite.com/brokers/etoro`,
      images: [
        {
          url: broker.logo_url || "/images/brokers/etoro.png",
          width: 1200,
          height: 630,
          alt: `${broker.name} Logo`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${broker.name} Review 2024 - Social Trading Platform Analysis`,
      description: `Comprehensive ${broker.name} review covering social trading features, costs, regulation, and platform analysis.`,
      images: [broker.logo_url || "/images/brokers/etoro.png"]
    }
  };
}

// eToro broker data with comprehensive information
function getEtoroBrokerData() {
  return {
    id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
    name: "eToro",
    slug: "etoro",
    logo_url: "/images/brokers/etoro.png",
    website_url: "https://www.etoro.com",
    description: "eToro is the world's leading social trading platform, revolutionizing how people trade and invest through innovative copy trading technology and a community of over 30 million users.",
    min_deposit: 50,
    max_leverage: "1:30 (EU), 1:400 (Non-EU)",
    regulations: "FCA (UK), CySEC (Cyprus), ASIC (Australia), FINRA (USA)",
    regulators: ["FCA", "CySEC", "ASIC", "FINRA"],
    trading_platforms: "eToro Platform, eToro Mobile App",
    spreads_from: "From 1.0 pips",
    account_types: ["Retail", "Professional", "eToro Club"],
    country: "Cyprus",
    established: "2007",
    overall_rating: 4.5,
    security_features: ["Two-Factor Authentication", "SSL Encryption", "Negative Balance Protection"],
    published_date: "2024-01-15",
    last_updated: new Date().toISOString(),
    summary: `eToro stands as the world's premier social trading platform, fundamentally different from traditional forex brokers. 
    Founded in 2007, this Cyprus-based fintech giant has revolutionized retail trading by combining social networking with financial markets.

    With over 30 million users globally, eToro's revolutionary CopyTrader feature allows beginners to automatically replicate the trades of successful investors, 
    democratizing access to professional trading strategies. The platform offers commission-free stock trading, cryptocurrency investments, and CFD trading across multiple asset classes.

    However, eToro's social trading focus comes with trade-offs. Forex spreads start from 1.0 pips, significantly higher than ECN brokers, and the platform 
    operates primarily on a CFD model rather than spot forex. The proprietary platform, while user-friendly, lacks advanced charting tools and doesn't support MetaTrader.

    eToro excels for beginner to intermediate traders seeking social learning and copy trading features, but may not suit professional traders requiring 
    tight spreads and institutional-grade execution.`,
    pros: [
      "Revolutionary social trading and copy trading features",
      "Massive community of 30+ million users",
      "Commission-free stock trading",
      "Multi-asset platform (stocks, crypto, commodities, forex)",
      "Strong regulatory coverage (FCA, CySEC, ASIC)",
      "User-friendly interface perfect for beginners",
      "Comprehensive educational resources",
      "Mobile-first design with excellent app",
      "Transparent trader performance statistics",
      "Demo account with virtual $100,000"
    ],
    cons: [
      "Higher forex spreads compared to ECN brokers",
      "No MetaTrader 4 or 5 support",
      "$5 withdrawal fee on all withdrawals",
      "Limited advanced charting and analysis tools",
      "CFD-based trading model, not spot forex",
      "Inactivity fees after 12 months",
      "Limited customer support hours",
      "No scalping or high-frequency trading allowed",
      "Currency conversion fees on non-USD deposits",
      "Professional account requirements are strict"
    ],
    educational_resources: true,
    feature: "Social Trading & Copy Trading",
    faqs: [
      {
        id: "1",
        broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
        question: "What makes eToro different from other forex brokers?",
        answer: "eToro is primarily a social trading platform rather than a traditional forex broker. Its main differentiator is the ability to copy other traders' strategies automatically, access to a large community of traders, and a focus on user-friendly interfaces for beginners."
      },
      {
        id: "2",
        broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
        question: "Are eToro's spreads competitive for forex trading?",
        answer: "eToro's forex spreads start from 1.0 pips, which is higher than many ECN brokers. However, the platform's value lies in its social trading features rather than competitive spreads, making it more suitable for social traders than scalpers or high-frequency traders."
      },
      {
        id: "3",
        broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
        question: "Is eToro regulated and safe?",
        answer: "Yes, eToro is regulated by multiple top-tier authorities including FCA (UK), CySEC (Cyprus), and ASIC (Australia). Client funds are segregated and the platform offers negative balance protection."
      },
      {
        id: "4",
        broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
        question: "Can I use MT4 or MT5 with eToro?",
        answer: "No, eToro does not support MetaTrader platforms. The broker uses its proprietary eToro platform and mobile app, which are designed specifically for social trading features."
      }
    ]
  };
}

export default async function EtoroReviewPage({ params: _ }: Props) {
  // Get the eToro broker data
  const broker = getEtoroBrokerData();

  // If broker is not found, return 404
  if (!broker) {
    notFound();
  }

  // Similar brokers for recommendation
  const similarBrokers = [
    {
      id: "ic-markets",
      name: "IC Markets",
      logo_url: "/images/brokers/ic-markets.png",
      overall_rating: 4.9,
      min_deposit: 200,
      max_leverage: "1:1000",
      regulations: "ASIC, CySEC, FSA",
      key_feature: "Ultra-low spreads from 0.0 pips",
      website_url: "https://www.icmarkets.com",
      spreads_from: "0.0 pips"
    },
    {
      id: "xtb",
      name: "XTB",
      logo_url: "/images/brokers/xtb.png",
      overall_rating: 4.7,
      min_deposit: 250,
      max_leverage: "1:500",
      regulations: "FCA, KNF, CySEC",
      key_feature: "Advanced trading platform",
      website_url: "https://www.xtb.com",
      spreads_from: "0.5 pips"
    },
    {
      id: "pepperstone",
      name: "Pepperstone",
      logo_url: "/images/brokers/pepperstone.png",
      overall_rating: 4.8,
      min_deposit: 200,
      max_leverage: "1:500",
      regulations: "FCA, ASIC, CySEC",
      key_feature: "Fast execution speeds",
      website_url: "https://www.pepperstone.com",
      spreads_from: "0.0 pips"
    }
  ];

  // Context7 configuration for SEO optimization
  const context7Config = {
    title: `${broker.name} Review 2024 - Social Trading Platform Analysis`,
    description: `Comprehensive ${broker.name} review covering social trading features, costs, regulation, and platform analysis. Is eToro right for your trading needs?`,
    keywords: ["eToro", "social trading", "copy trading", "forex broker", "CFD trading", "investment platform"],
    openGraph: {
      title: `${broker.name} Review 2024 - Social Trading Platform Analysis`,
      description: `Comprehensive ${broker.name} review covering social trading features, costs, regulation, and platform analysis.`,
      siteName: "BrokerAnalysis",
      images: [
        {
          url: broker.logo_url || "/images/brokers/etoro.png",
          width: 1200,
          height: 630,
          alt: `${broker.name} Logo`,
        },
      ],
      type: "article",
    },
    twitter: {
      cardType: "summary_large_image" as const,
      title: `${broker.name} Review 2024 - Social Trading Platform Analysis`,
      description: `Comprehensive ${broker.name} review covering social trading features, costs, regulation, and platform analysis.`,
    },
    canonical: `https://yoursite.com/brokers/etoro`,
  };

  // Generate headline for the broker
  const headline = "eToro is the world's leading social trading platform, fundamentally different from traditional forex brokers. With over 30 million users and revolutionary copy trading features, eToro democratizes access to financial markets through social networking and automated investing.";

  return (
    <Context7Provider config={context7Config}>
      {/* SEO Optimization */}
      <BrokerReviewSEO broker={broker} />

      {/* Performance Monitoring */}
      <PerformanceMonitor
        reportTo="/api/performance-metrics"
        debug={process.env.NODE_ENV === 'development'}
      />
      
      <div className="min-h-screen bg-background" style={{ scrollBehavior: 'smooth' }}>
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Navigation */}
          <BrokerBreadcrumbs 
            items={[
              { name: "Home", href: "/" },
              { name: "Brokers", href: "/brokers" },
              { name: broker.name, href: `/brokers/${broker.slug}` }
            ]} 
          />

          {/* Hero Section */}
          <HeroBrokerSection 
            broker={broker} 
            legitimacyData={{
              isLegitimate: true,
              regulatoryStatus: "FCA, CySEC, ASIC, FINRA",
              warningFlags: []
            }}
          />

          {/* Trust Signals & Security */}
          <div className="mt-8">
            <TrustSignals broker={{
              name: broker.name,
              regulators: broker.regulators,
              isSecure: true,
              trustScore: broker.overall_rating,
              securityFeatures: broker.security_features,
              isScamBroker: false
            }} />
          </div>

          <div className="mt-8 sm:mt-12">
            <BrokerOverviewSection broker={broker} headline={headline} />
          </div>

          <Separator className="my-8" />

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-8 overflow-x-auto">
            <div className="flex space-x-4 pb-2 min-w-max">
              <a href="#executive-summary" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Executive Summary</a>
              <a href="#company-background" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Company Background</a>
              <a href="#social-features" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Social Features</a>
              <a href="#trading-conditions" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Trading Conditions</a>
              <a href="#platforms" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Platforms</a>
              <a href="#education" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Education</a>
              <a href="#reviews" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Reviews</a>
              <a href="#expert-verdict" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Expert Verdict</a>
              <a href="#faq" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">FAQ</a>
            </div>
          </div>

          {/* Main Content Grid with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sticky Sidebar */}
            <ClientSideSidebar sections={sections} />

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Executive Summary - eToro Specific */}
              <section id="executive-summary" className="scroll-mt-20">
                <EtoroExecutiveSummary broker={broker} />
              </section>

              {/* Company Background - eToro Specific */}
              <section id="company-background" className="scroll-mt-20">
                <EtoroCompanyBackground broker={broker} />
              </section>

              {/* Social Trading Features - eToro Specific */}
              <section id="social-features" className="scroll-mt-20">
                <EtoroSocialFeatures broker={broker} />
              </section>

              {/* Trading Conditions - eToro Specific */}
              <section id="trading-conditions" className="scroll-mt-20">
                <EtoroTradingConditionsAnalysis broker={broker} />
              </section>

              {/* Platforms Section */}
              <section id="platforms" className="scroll-mt-20">
                <PlatformsSection broker={broker} />
              </section>

              {/* Education Section */}
              <section id="education" className="scroll-mt-20">
                <EducationSection broker={broker} />
              </section>

              {/* Reviews Section */}
              <section id="reviews" className="scroll-mt-20">
                <ReviewsSection broker={broker} />
              </section>
              
              {/* Expert Verdict Section - eToro Specific */}
              <section id="expert-verdict" className="scroll-mt-20">
                <EtoroExpertVerdict broker={broker} />
              </section>

              {/* Similar Brokers */}
              <section id="similar-brokers" className="scroll-mt-20">
                <SimilarBrokersSection brokers={similarBrokers} currentBroker="etoro" />
              </section>
            </div>
          </div>

          {/* FAQ Section */}
          <section id="faq" className="mt-12">
            <DynamicFAQSection broker={broker} additionalFaqs={broker.faqs} />
          </section>

          {/* Internal Links */}
          <div className="mt-12">
            <BrokerInternalLinks broker={broker} />
          </div>
        </div>

        {/* AI Assistant */}
        <RokuAIWrapper />
      </div>
    </Context7Provider>
  );
}
