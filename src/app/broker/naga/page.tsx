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
    title: "NAGA Review 2025 | Expert Analysis of Social Trading Platform & Fees",
    description: "Comprehensive NAGA review. Discover trading fees, available markets, platform features, social trading, and customer service quality. Updated for 2025.",
    keywords: ["NAGA review", "NAGA trading fees", "NAGA platforms", "social trading", "forex broker review", "CFD trading", "stock trading"],
    openGraph: {
      title: "NAGA Review 2025 | Expert Analysis of Social Trading Platform & Fees",
      description: "Comprehensive NAGA review. Discover trading fees, available markets, platform features, social trading, and customer service quality. Updated for 2025.",
      url: "https://brokeranalysis.com/broker/naga",
      type: "article",
    },
  };
}

export default async function NAGAReviewPage() {
  // NAGA broker data
  const broker = {
    id: "naga-001",
    name: "NAGA",
    logo_url: "/images/brokers/naga.png",
    description: "NAGA is a German fintech company offering social trading and investment services across forex, CFDs, and stocks. Key features include CySEC regulation, €250 min deposit, social trading platform. Particularly suitable for social trading enthusiasts and European traders. Updated May 2023.",
    min_deposit: 250,
    max_leverage: "1:500",
    regulations: "CySEC, BaFin",
    trading_platforms: "NAGA Trader, NAGA Mobile, MT4",
    spreads_from: "0.8 pips",
    account_types: ["Standard", "Professional"],
    country: "Germany",
    established: "2015",
    overall_rating: 4.1,
    pros: [
      "Social trading and copy trading features",
      "Multi-asset platform with stocks, forex, and CFDs",
      "User-friendly mobile application",
      "European regulation and oversight",
      "Competitive spreads and fees"
    ],
    cons: [
      "Limited educational resources compared to competitors",
      "Higher minimum deposit than some alternatives",
      "Limited cryptocurrency offerings"
    ],
    educational_resources: true,
    feature: "Social Trading",
    website_url: "https://www.naga.com",
    published_date: "2023-05-15",
    last_updated: "2023-05-15",
    faqs: [
      {
        question: "Is NAGA regulated?",
        answer: "NAGA is regulated by CySEC (Cyprus Securities and Exchange Commission) and supervised by BaFin in Germany, ensuring safety and transparency in financial standards."
      },
      {
        question: "What is the minimum deposit for NAGA?",
        answer: "The minimum deposit for NAGA is €250."
      },
      {
        question: "What trading platforms does NAGA offer?",
        answer: "NAGA offers its proprietary NAGA Trader platform, NAGA Mobile app, and MetaTrader 4 (MT4)."
      },
      {
        question: "Does NAGA offer social trading?",
        answer: "Yes, NAGA offers comprehensive social trading features allowing users to copy successful traders and share trading strategies."
      }
    ]
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
      key_feature: "Leading social trading platform",
      website_url: "https://www.etoro.com",
      spreads_from: "1.0 pips"
    },
    {
      id: "plus500",
      name: "Plus500",
      logo_url: "/images/brokers/plus500.png",
      overall_rating: 4.4,
      min_deposit: 100,
      max_leverage: "1:300",
      regulations: "FCA, CySEC, ASIC",
      key_feature: "Simple CFD trading platform",
      website_url: "https://www.plus500.com",
      spreads_from: "Variable"
    },
    {
      id: "capital-com",
      name: "Capital.com",
      logo_url: "/images/brokers/capital-com.png",
      overall_rating: 4.5,
      min_deposit: 20,
      max_leverage: "1:200",
      regulations: "FCA, CySEC, ASIC",
      key_feature: "AI-powered trading insights",
      website_url: "https://www.capital.com",
      spreads_from: "0.6 pips"
    }
  ];

  // Generate headline for the broker
  const headline = "NAGA is a German fintech company offering social trading and investment services across multiple asset classes including forex, CFDs, and stocks. With its innovative social trading features, users can follow and copy successful traders while building their own investment portfolios.";

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
                      <span className="ml-2 font-semibold">3.8/5</span>
                      <Badge variant="outline" className="ml-3 bg-background">Education Rating</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">
                    {broker.name} provides educational resources focused on social trading and multi-asset investing, including platform tutorials and market insights to help traders improve their skills.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
                      <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700 dark:text-green-400">
                        <CheckCircle className="h-5 w-5 mr-2" /> Strengths
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Social trading education and tutorials",
                          "Platform-specific training materials",
                          "Market analysis and insights",
                          "Community-driven learning environment"
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
                          "Limited comprehensive educational courses",
                          "Focus mainly on platform features",
                          "Less extensive than dedicated education providers"
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
