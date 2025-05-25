import { Metadata } from "next";
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
    title: "Stake Review 2025 | Expert Analysis of Commission-Free Stock Trading Platform",
    description: "Comprehensive Stake review. Discover commission-free trading, US stock markets, ETF investing, and mobile platform features. Updated for 2025.",
    keywords: ["Stake review", "commission-free trading", "US stocks", "ETF trading", "mobile trading platform", "Australian broker"],
    openGraph: {
      title: "Stake Review 2025 | Expert Analysis of Commission-Free Stock Trading Platform",
      description: "Comprehensive Stake review. Discover commission-free trading, US stock markets, ETF investing, and mobile platform features. Updated for 2025.",
      url: "https://brokeranalysis.com/broker/stake",
      type: "article",
    },
  };
}

export default async function StakeReviewPage() {
  // Stake broker data
  const broker = {
    id: "stake-001",
    name: "Stake",
    logo_url: "/images/brokers/stake.png",
    description: "Stake is an Australian-based brokerage platform offering commission-free trading in US stocks and ETFs with a mobile-first approach. Key features include ASIC regulation, $0 min deposit, commission-free trades. Particularly suitable for millennial investors and mobile-first traders. Updated May 2023.",
    min_deposit: 0,
    max_leverage: "1:1",
    regulations: "ASIC, AUSTRAC",
    trading_platforms: "Stake Mobile App, Stake Web Platform",
    spreads_from: "$0 commissions",
    account_types: ["Individual", "Joint", "SMSF"],
    country: "Australia",
    established: "2017",
    overall_rating: 4.1,
    pros: [
      "Commission-free US stock and ETF trading",
      "User-friendly mobile-first platform",
      "No minimum deposit requirement",
      "Access to US markets from Australia",
      "Social features and community insights"
    ],
    cons: [
      "Limited to US markets only",
      "No options or derivatives trading",
      "Limited research and analysis tools"
    ],
    educational_resources: true,
    feature: "Commission-Free Trading",
    website_url: "https://www.stake.com.au",
    published_date: "2023-05-15",
    last_updated: "2023-05-15",
    faqs: [
      {
        question: "Is Stake regulated?",
        answer: "Stake is regulated by ASIC (Australian Securities and Investments Commission) and is registered with AUSTRAC, ensuring compliance with Australian financial regulations."
      },
      {
        question: "What is the minimum deposit for Stake?",
        answer: "Stake has no minimum deposit requirement, allowing you to start investing with any amount."
      },
      {
        question: "What markets can I trade with Stake?",
        answer: "Stake provides access to US stock markets, including NYSE and NASDAQ, with thousands of stocks and ETFs available for trading."
      },
      {
        question: "Are there any trading fees?",
        answer: "Stake offers commission-free trading on US stocks and ETFs, though currency conversion fees may apply for Australian investors."
      }
    ]
  };

  // Similar brokers for recommendation
  const similarBrokers = [
    {
      id: "robinhood",
      name: "Robinhood",
      logo_url: "/images/brokers/robinhood.png",
      overall_rating: 4.2,
      min_deposit: 0,
      max_leverage: "1:1",
      regulations: "SEC, FINRA, SIPC",
      key_feature: "Commission-free mobile trading",
      website_url: "https://www.robinhood.com",
      spreads_from: "$0 commissions"
    },
    {
      id: "webull",
      name: "Webull",
      logo_url: "/images/brokers/webull.png",
      overall_rating: 4.3,
      min_deposit: 0,
      max_leverage: "1:4",
      regulations: "SEC, FINRA, SIPC",
      key_feature: "Advanced mobile trading tools",
      website_url: "https://www.webull.com",
      spreads_from: "$0 commissions"
    },
    {
      id: "freetrade",
      name: "Freetrade",
      logo_url: "/images/brokers/freetrade.png",
      overall_rating: 4.0,
      min_deposit: 0,
      max_leverage: "1:1",
      regulations: "FCA",
      key_feature: "Commission-free UK and US stocks",
      website_url: "https://www.freetrade.io",
      spreads_from: "$0 commissions"
    }
  ];

  // Generate headline for the broker
  const headline = "Stake is an Australian brokerage platform that democratizes access to US stock markets through commission-free trading and a mobile-first approach. Designed for the next generation of investors seeking simple, cost-effective access to American equities and ETFs.";

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
            <a href="#education" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Education</a>
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

            {/* Educational Resources */}
            <section id="education" className="scroll-mt-20">
              <Card className="overflow-hidden border-border/80 hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                        Educational Resources
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        Learning materials and resources offered by {broker.name}
                      </CardDescription>
                    </div>
                    <div className="flex items-center bg-background/80 px-4 py-2 rounded-full border">
                      <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                      <span className="ml-2 font-semibold">4.0/5</span>
                      <Badge variant="outline" className="ml-3 bg-background">Education Rating</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">
                    {broker.name} provides educational resources designed for new investors, including market insights, investment guides, and community-driven learning through social features.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
                      <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700 dark:text-green-400">
                        <CheckCircle className="h-5 w-5 mr-2" /> Strengths
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Beginner-friendly investment guides",
                          "Market news and insights",
                          "Social learning through community features",
                          "Simple and accessible educational content"
                        ].map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                      <h3 className="text-lg font-semibold mb-3 flex items-center text-amber-700 dark:text-amber-400">
                        <AlertTriangle className="h-5 w-5 mr-2" /> Considerations
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Limited advanced trading education",
                          "Focus mainly on basic investing concepts",
                          "Less comprehensive than dedicated education platforms"
                        ].map((weakness, index) => (
                          <li key={index} className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
}
