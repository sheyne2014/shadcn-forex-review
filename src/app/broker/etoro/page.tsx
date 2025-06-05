import { Metadata } from "next";
import { HeroBrokerSection } from "@/components/broker-review/HeroBrokerSection";
import { BrokerOverviewSection } from "@/components/broker-review/BrokerOverviewSection";
import { BrokerTradingConditions } from "@/components/broker-review/BrokerTradingConditions";
import { PlatformsSection } from "@/components/broker-review/PlatformsSection";
import { ReviewsSection } from "@/components/broker-review/ReviewsSection";
import { BrokerAnalysisWidget } from "@/components/broker-review/BrokerAnalysisWidget";
import { DynamicFAQSection } from "@/components/broker-review/DynamicFAQSection";
import { SimilarBrokersSection } from "@/components/broker-review/SimilarBrokersSection";
import { EtoroExecutiveSummary } from "@/components/broker-review/EtoroExecutiveSummary";
import { EtoroExpertVerdict } from "@/components/broker-review/EtoroExpertVerdict";
import { EtoroCompanyBackground } from "@/components/broker-review/EtoroCompanyBackground";
// import { EtoroRegulationSafety } from "@/components/broker-review/EtoroRegulationSafety";
import { EtoroSocialTradingAnalysis } from "@/components/broker-review/EtoroSocialTradingAnalysis";
import { EtoroPlatformTechnologyAnalysis } from "@/components/broker-review/EtoroPlatformTechnologyAnalysis";
import { EtoroCustomerServiceAnalysis } from "@/components/broker-review/EtoroCustomerServiceAnalysis";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { generateBrokerMetadata } from "@/lib/broker-metadata";

export const metadata: Metadata = {
  title: "eToro Review 2025 | Social Trading Platform | BrokerAnalysis",
  description: "Comprehensive eToro review 2025. Discover why eToro leads social trading with 30M+ users, copy trading features, and multi-asset portfolios. Read our expert analysis of costs, regulation, and platform features.",
  keywords: [
    "eToro review 2025",
    "social trading platform",
    "copy trading",
    "eToro forex broker",
    "social trading network",
    "multi-asset trading",
    "CySEC regulated broker",
    "beginner trading platform"
  ],
  openGraph: {
    title: "eToro Review 2025 | World's Leading Social Trading Platform",
    description: "Expert review of eToro's social trading platform. 30M+ users, copy trading, multi-asset portfolios. CySEC regulated with innovative social features.",
    type: "article",
    url: "/broker/etoro",
  },
  alternates: {
    canonical: "/broker/etoro",
  },
};

export default async function EtoroReviewPage() {
  // eToro broker data with comprehensive details
  const broker = {
    id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
    name: "eToro",
    slug: "etoro",
    logo_url: "https://altcoinsbox.com/wp-content/uploads/2023/04/full-etoro-logo.png",
    description: "eToro is the world's leading social trading platform with 30+ million users, offering copy trading, multi-asset portfolios, and innovative social features for beginner to intermediate traders.",
    min_deposit: 50,
    max_leverage: "1:30 (EU), 1:400 (Non-EU)",
    regulations: "CySEC, FCA, ASIC, FinCEN",
    trading_platforms: "eToro Platform, eToro Mobile App",
    spreads_from: "1.0 pips (EUR/USD)",
    account_types: ["Retail", "Professional", "Islamic"],
    country: "Cyprus",
    established: "2007",
    overall_rating: 4.5,
    website_url: "https://www.etoro.com",
    pros: [
      "Revolutionary social trading and copy trading features",
      "User-friendly platform perfect for beginners",
      "Multi-asset trading (stocks, crypto, commodities, forex)",
      "Strong regulatory coverage (CySEC, FCA, ASIC)",
      "Large community of 30+ million users",
      "Commission-free stock trading",
      "Innovative CopyPortfolios feature",
      "Comprehensive educational resources"
    ],
    cons: [
      "Higher spreads compared to ECN brokers",
      "Limited advanced charting tools",
      "No MetaTrader platform support",
      "Withdrawal fees apply",
      "Limited customer support hours",
      "CFD-focused rather than direct market access"
    ],
    educational_resources: true,
    feature: "Social Trading & Copy Trading",
    faqs: [
      {
        question: "What makes eToro different from traditional forex brokers?",
        answer: "eToro is primarily a social trading platform rather than a traditional forex broker. It focuses on copy trading, social features, and multi-asset portfolios, making it ideal for beginners who want to learn from experienced traders."
      },
      {
        question: "Is eToro suitable for professional forex traders?",
        answer: "eToro is better suited for beginner to intermediate traders. Professional traders may find the spreads too high and the lack of advanced tools limiting. Traditional ECN brokers offer better conditions for professional trading."
      },
      {
        question: "How does eToro's copy trading work?",
        answer: "Copy trading allows you to automatically replicate the trades of successful traders. You can browse trader profiles, see their performance history, and allocate funds to copy their strategies proportionally."
      },
      {
        question: "What are eToro's main regulatory licenses?",
        answer: "eToro is regulated by CySEC (Cyprus), FCA (UK), ASIC (Australia), and FinCEN (USA). Different entities serve different regions with appropriate regulatory coverage."
      },
      {
        question: "Are eToro's spreads competitive?",
        answer: "eToro's spreads are higher than traditional ECN brokers but reasonable for a social trading platform. EUR/USD spreads start from 1.0 pips, which includes the social trading features and platform costs."
      }
    ]
  };

  // Similar brokers data
  const similarBrokers = [
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
    },
    {
      id: "pepperstone",
      name: "Pepperstone",
      logo_url: "/images/brokers/pepperstone.png",
      overall_rating: 4.8,
      min_deposit: 200,
      max_leverage: "1:500",
      regulations: "FCA, ASIC, CySEC",
      key_feature: "Fast execution",
      website_url: "https://www.pepperstone.com",
      spreads_from: "0.0 pips"
    },
    {
      id: "avatrade",
      name: "AvaTrade",
      logo_url: "/images/brokers/avatrade.png",
      overall_rating: 4.6,
      min_deposit: 100,
      max_leverage: "1:400",
      regulations: "CySEC, ASIC, FSA",
      key_feature: "Social trading",
      website_url: "https://www.avatrade.com",
      spreads_from: "0.9 pips"
    }
  ];

  // Generate headline for the broker
  const headline = "eToro revolutionizes trading through social features and copy trading, serving 30+ million users worldwide. With CySEC, FCA, and ASIC regulation and established operations since 2007, eToro serves traders seeking social trading innovation and multi-asset portfolios.";

  return (
    <>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Section with broker overview */}
        <HeroBrokerSection broker={broker} />

        <div className="mt-8 sm:mt-12">
          <BrokerOverviewSection broker={broker} headline={headline} />
        </div>

        {/* eToro Executive Summary START */}
        <Separator className="my-8 sm:my-12" />
        
        <section id="executive-summary" className="scroll-mt-20">
          <EtoroExecutiveSummary broker={broker} />
        </section>

        {/* eToro Executive Summary END */}

        <Separator className="my-8 sm:my-12" />

        {/* Company Background & Business Model Deep Dive */}
        <section id="company-background" className="scroll-mt-20">
          <EtoroCompanyBackground broker={broker} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Regulation & Safety Deep Analysis */}
        <section id="regulation-safety" className="scroll-mt-20">
          {/* <EtoroRegulationSafety broker={broker} /> */}
          <div className="text-center py-8">
            <p className="text-muted-foreground">Regulation & Safety section temporarily disabled</p>
          </div>
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Social Trading Features Analysis */}
        <section id="social-trading" className="scroll-mt-20">
          <EtoroSocialTradingAnalysis broker={broker} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Platform Technology Analysis */}
        <section id="platform-technology" className="scroll-mt-20">
          <EtoroPlatformTechnologyAnalysis broker={broker} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Customer Service Analysis */}
        <section id="customer-service" className="scroll-mt-20">
          <EtoroCustomerServiceAnalysis broker={broker} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Trading Conditions */}
        <section id="trading-conditions" className="scroll-mt-20">
          <BrokerTradingConditions broker={broker} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Platforms Section */}
        <section id="platforms" className="scroll-mt-20">
          <PlatformsSection broker={broker} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Reviews Section */}
        <section id="reviews" className="scroll-mt-20">
          <ReviewsSection brokerId={broker.id} brokerName={broker.name} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Broker Analysis Widget */}
        <section id="analysis" className="scroll-mt-20">
          <BrokerAnalysisWidget broker={broker} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* Expert Verdict Section */}
        <section id="expert-verdict" className="scroll-mt-20">
          <EtoroExpertVerdict broker={broker} />
        </section>

        <Separator className="my-12 sm:my-16" />

        {/* Full-width Similar Brokers Section with gradient background */}
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
}
