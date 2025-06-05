import { Metadata } from "next";
import { EnhancedHeroBrokerSection } from "@/components/broker-review/EnhancedHeroBrokerSection";
import { TableOfContents } from "@/components/broker-review/TableOfContents";
import { ProfessionalImageGallery, etoroImages } from "@/components/broker-review/ProfessionalImageGallery";
import { SEOStructuredData } from "@/components/broker-review/SEOStructuredData";
import { BrokerOverviewSection } from "@/components/broker-review/BrokerOverviewSection";

import { PlatformsSection } from "@/components/broker-review/PlatformsSection";
import { ReviewsSection } from "@/components/broker-review/ReviewsSection";
import { BrokerAnalysisWidget } from "@/components/broker-review/BrokerAnalysisWidget";
import { DynamicFAQSection } from "@/components/broker-review/DynamicFAQSection";
import { SimilarBrokersSection } from "@/components/broker-review/SimilarBrokersSection";
import { EtoroExecutiveSummary } from "@/components/broker-review/EtoroExecutiveSummary";
import { EtoroExpertVerdict } from "@/components/broker-review/EtoroExpertVerdict";
import { EtoroCompanyBackground } from "@/components/broker-review/EtoroCompanyBackground";
import { EtoroRegulationSafety } from "@/components/broker-review/EtoroRegulationSafety";
import { EtoroSocialTradingAnalysis } from "@/components/broker-review/EtoroSocialTradingAnalysis";
import { EtoroPlatformTechnologyAnalysis } from "@/components/broker-review/EtoroPlatformTechnologyAnalysis";
import { EtoroCustomerServiceAnalysis } from "@/components/broker-review/EtoroCustomerServiceAnalysis";
import { EtoroDetailedFeesAnalysis } from "@/components/broker-review/EtoroDetailedFeesAnalysis";
import { EtoroFeeComparison } from "@/components/broker-review/EtoroFeeComparison";
import { PerformanceOptimization } from "@/components/broker-review/PerformanceOptimization";
import { InternalLinkingWidget } from "@/components/broker-review/InternalLinkingWidget";
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
    "beginner trading platform",
    "eToro trading platform",
    "social investment network",
    "copy trading platform",
    "multi-asset broker"
  ],
  openGraph: {
    title: "eToro Review 2025 | World's Leading Social Trading Platform",
    description: "Expert review of eToro's social trading platform. 30M+ users, copy trading, multi-asset portfolios. CySEC regulated with innovative social features.",
    type: "article",
    url: "/broker/etoro",
    images: [
      {
        url: "https://altcoinsbox.com/wp-content/uploads/2023/04/full-etoro-logo.png",
        width: 1200,
        height: 630,
        alt: "eToro Review 2025 - Social Trading Platform"
      }
    ]
  },
  alternates: {
    canonical: "/broker/etoro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
        answer: "eToro is primarily a social trading platform rather than a traditional forex broker. It focuses on copy trading, social features, and multi-asset portfolios, making it ideal for beginners who want to learn from experienced traders. The platform combines social networking with trading, allowing users to follow, interact with, and copy successful traders."
      },
      {
        question: "Is eToro suitable for professional forex traders?",
        answer: "eToro is better suited for beginner to intermediate traders. Professional traders may find the spreads too high and the lack of advanced tools limiting. Traditional ECN brokers offer better conditions for professional trading. However, eToro's social trading features can provide valuable market insights even for experienced traders."
      },
      {
        question: "How does eToro's copy trading work?",
        answer: "Copy trading allows you to automatically replicate the trades of successful traders. You can browse trader profiles, see their performance history, risk scores, and allocate funds to copy their strategies proportionally. When the copied trader opens or closes a position, the same action is executed in your account based on your allocated amount."
      },
      {
        question: "What are eToro's main regulatory licenses?",
        answer: "eToro is regulated by CySEC (Cyprus) license 109/10, FCA (UK) license 583263, ASIC (Australia) license 491139, and FinCEN (USA) registration 31000031. Different entities serve different regions with appropriate regulatory coverage and investor protection schemes."
      },
      {
        question: "Are eToro's spreads competitive?",
        answer: "eToro's spreads are higher than traditional ECN brokers but reasonable for a social trading platform. EUR/USD spreads start from 1.0 pips, which includes the social trading features and platform costs. The spreads reflect the additional value provided through social trading functionality."
      },
      {
        question: "What is the minimum deposit required to start trading on eToro?",
        answer: "The minimum deposit on eToro is $50 for most countries, making it accessible for beginners. However, minimum deposits may vary by region and payment method. Some countries may have higher minimum deposit requirements due to local regulations."
      },
      {
        question: "Does eToro offer a demo account?",
        answer: "Yes, eToro provides a free demo account with $100,000 virtual money. The demo account includes all platform features, social trading functionality, and access to the same markets as the live account, making it perfect for learning and testing strategies."
      },
      {
        question: "What assets can I trade on eToro?",
        answer: "eToro offers multi-asset trading including stocks, ETFs, cryptocurrencies, forex pairs, commodities, and indices. You can trade real assets (stocks and ETFs) or CFDs, depending on your preference and regulatory restrictions in your region."
      },
      {
        question: "How safe are my funds with eToro?",
        answer: "eToro maintains high safety standards with segregated client accounts, multiple regulatory licenses, and investor compensation schemes. Client funds are held separately from company funds with tier-1 banks, and compensation schemes protect up to €20,000 (EU), £85,000 (UK), or AU$250,000 (Australia)."
      },
      {
        question: "What are eToro's withdrawal fees and processing times?",
        answer: "eToro charges a $5 withdrawal fee regardless of the amount. Processing times vary by payment method: bank transfers take 4-7 business days, while e-wallets typically process within 1 business day. Minimum withdrawal amount is $30."
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
      {/* SEO Structured Data */}
      <SEOStructuredData broker={broker} />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Table of Contents - Mobile Only (Non-sticky) */}
        <div className="lg:hidden mb-8">
          <TableOfContents items={[
            { id: 'hero', title: 'eToro Overview', level: 1, estimatedTime: '2' },
            { id: 'executive-summary', title: 'Executive Summary', level: 1, estimatedTime: '3' },
            { id: 'company-background', title: 'Company Background', level: 1, estimatedTime: '4' },
            { id: 'regulation-safety', title: 'Regulation & Safety', level: 1, estimatedTime: '5' },
            { id: 'social-trading', title: 'Social Trading Features', level: 1, estimatedTime: '6' },
            { id: 'platform-technology', title: 'Platform & Technology', level: 1, estimatedTime: '4' },
            { id: 'customer-service', title: 'Customer Service', level: 1, estimatedTime: '3' },
            { id: 'detailed-fees', title: 'Comprehensive Fee & Trading Analysis', level: 1, estimatedTime: '10' },
            { id: 'fee-comparison', title: 'Fee Comparison vs Competitors', level: 1, estimatedTime: '5' },
            { id: 'platforms', title: 'Trading Platforms', level: 1, estimatedTime: '3' },
            { id: 'reviews', title: 'User Reviews', level: 1, estimatedTime: '2' },
            { id: 'analysis', title: 'Broker Analysis', level: 1, estimatedTime: '4' },
            { id: 'expert-verdict', title: 'Expert Verdict', level: 1, estimatedTime: '3' },
            { id: 'similar', title: 'Similar Brokers', level: 1, estimatedTime: '2' },
            { id: 'faq', title: 'Frequently Asked Questions', level: 1, estimatedTime: '3' },
          ]} />
        </div>

        {/* Main Content with Sidebar Layout for Desktop */}
        <div className="lg:flex lg:gap-8 xl:gap-12">
          {/* Main Content Area */}
          <div className="lg:flex-1 lg:max-w-none xl:max-w-4xl">
            {/* Enhanced Hero Section with professional images */}
            <EnhancedHeroBrokerSection broker={broker} />

            {/* Professional Image Gallery */}
            <Separator className="my-8 sm:my-12" />
            <section id="image-gallery" className="scroll-mt-20">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl font-bold">eToro Visual Overview</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore eToro's headquarters, leadership team, trading platforms, and regulatory credentials
                  through our comprehensive image gallery.
                </p>
              </div>
              <ProfessionalImageGallery images={etoroImages} />
            </section>

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
              <EtoroRegulationSafety broker={broker} />
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

            {/* Detailed Fee Analysis */}
            <section id="detailed-fees" className="scroll-mt-20">
              <EtoroDetailedFeesAnalysis broker={broker} />
            </section>

            <Separator className="my-8 sm:my-12" />

            {/* Fee Comparison with Competitors */}
            <section id="fee-comparison" className="scroll-mt-20">
              <EtoroFeeComparison />
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

            {/* Internal Linking Widget */}
            <section id="related-resources" className="scroll-mt-20">
              <InternalLinkingWidget currentBroker={broker.name} />
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

          {/* Desktop Sidebar TOC - Sticky */}
          <div className="hidden lg:block lg:w-80 xl:w-96 lg:flex-shrink-0">
            <div className="sticky top-4">
              <TableOfContents items={[
                { id: 'hero', title: 'eToro Overview', level: 1, estimatedTime: '2' },
                { id: 'executive-summary', title: 'Executive Summary', level: 1, estimatedTime: '3' },
                { id: 'company-background', title: 'Company Background', level: 1, estimatedTime: '4' },
                { id: 'regulation-safety', title: 'Regulation & Safety', level: 1, estimatedTime: '5' },
                { id: 'social-trading', title: 'Social Trading Features', level: 1, estimatedTime: '6' },
                { id: 'platform-technology', title: 'Platform & Technology', level: 1, estimatedTime: '4' },
                { id: 'customer-service', title: 'Customer Service', level: 1, estimatedTime: '3' },
                { id: 'detailed-fees', title: 'Comprehensive Fee & Trading Analysis', level: 1, estimatedTime: '10' },
                { id: 'fee-comparison', title: 'Fee Comparison vs Competitors', level: 1, estimatedTime: '5' },
                { id: 'platforms', title: 'Trading Platforms', level: 1, estimatedTime: '3' },
                { id: 'reviews', title: 'User Reviews', level: 1, estimatedTime: '2' },
                { id: 'analysis', title: 'Broker Analysis', level: 1, estimatedTime: '4' },
                { id: 'expert-verdict', title: 'Expert Verdict', level: 1, estimatedTime: '3' },
                { id: 'similar', title: 'Similar Brokers', level: 1, estimatedTime: '2' },
                { id: 'faq', title: 'Frequently Asked Questions', level: 1, estimatedTime: '3' },
              ]} />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Optimization Component */}
      <PerformanceOptimization brokerSlug={broker.slug} />
    </>
  );
}
