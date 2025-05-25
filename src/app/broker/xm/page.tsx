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
    title: "XM Review 2025 | Expert Analysis of Trading Platform & Low Minimum Deposit",
    description: "Comprehensive XM review. Discover trading fees, MT4/MT5 platforms, $5 minimum deposit, and multi-language support. Updated for 2025.",
    keywords: ["XM review", "XM trading fees", "XM platforms", "MT4", "MT5", "forex broker review", "low minimum deposit", "multi-language support"],
    openGraph: {
      title: "XM Review 2025 | Expert Analysis of Trading Platform & Low Minimum Deposit",
      description: "Comprehensive XM review. Discover trading fees, MT4/MT5 platforms, $5 minimum deposit, and multi-language support. Updated for 2025.",
      url: "https://brokeranalysis.com/broker/xm",
      type: "article",
    },
  };
}

export default async function XMReviewPage() {
  // XM broker data
  const broker = {
    id: "b2000000-0000-0000-0000-000000000020",
    name: "XM",
    logo_url: "/images/brokers/xm.png",
    description: "XM is a global forex and CFD broker offering trading services with MT4 and MT5 platforms. Key features include CySEC, ASIC, IFSC regulation, $5 min deposit, 1:888 leverage. Particularly suitable for beginners and traders seeking extensive educational resources. Updated May 2023.",
    min_deposit: 5,
    max_leverage: "1:888",
    regulations: "CySEC, ASIC, IFSC",
    trading_platforms: "MT4, MT5",
    spreads_from: "1.0 pips",
    account_types: ["Micro", "Standard", "XM Zero"],
    country: "Cyprus",
    established: "2009",
    overall_rating: 4.7,
    pros: [
      "Very low minimum deposit of $5",
      "Extensive educational resources and webinars",
      "Multi-language customer support",
      "No deposit or withdrawal fees",
      "Regulated by multiple authorities"
    ],
    cons: [
      "Higher spreads compared to some competitors",
      "No cryptocurrency trading available",
      "Limited advanced trading tools"
    ],
    educational_resources: true,
    feature: "Educational Excellence",
    website_url: "https://www.xm.com",
    published_date: "2023-05-15",
    last_updated: "2023-05-15",
    faqs: [
      {
        question: "Is XM regulated?",
        answer: "XM is regulated by CySEC, ASIC, and IFSC, ensuring safety and transparency in financial standards."
      },
      {
        question: "What is the minimum deposit for XM?",
        answer: "The minimum deposit for XM is only $5, making it accessible for beginners."
      },
      {
        question: "What trading platforms does XM offer?",
        answer: "XM offers MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms for desktop, web, and mobile."
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
      key_feature: "Social trading platform",
      website_url: "https://www.etoro.com",
      spreads_from: "1.0 pips"
    },
    {
      id: "plus500",
      name: "Plus500",
      logo_url: "/images/brokers/plus500.png",
      overall_rating: 4.4,
      min_deposit: 100,
      max_leverage: "1:30",
      regulations: "FCA, CySEC, ASIC",
      key_feature: "Simple CFD trading",
      website_url: "https://www.plus500.com",
      spreads_from: "Variable"
    },
    {
      id: "capital-com",
      name: "Capital.com",
      logo_url: "/images/brokers/capital-com.png",
      overall_rating: 4.5,
      min_deposit: 20,
      max_leverage: "1:30",
      regulations: "FCA, CySEC, ASIC",
      key_feature: "AI-powered insights",
      website_url: "https://www.capital.com",
      spreads_from: "0.6 pips"
    }
  ];

  // Generate headline for the broker
  const headline = "XM is a well-established forex and CFD broker known for its exceptional educational resources and very low minimum deposit requirement. With comprehensive multi-language support and regulated operations across multiple jurisdictions, XM caters particularly well to beginner traders.";

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
                      <span className="ml-2 font-semibold">4.8/5</span>
                      <Badge variant="outline" className="ml-3 bg-background">Education Rating</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">
                    {broker.name} is renowned for its comprehensive educational program, offering one of the most extensive collections of learning materials in the industry. The broker provides free webinars, trading courses, and market analysis to help traders improve their skills.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
                      <h3 className="text-lg font-semibold mb-3 flex items-center text-green-700 dark:text-green-400">
                        <CheckCircle className="h-5 w-5 mr-2" /> Strengths
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Daily free webinars with market experts",
                          "Comprehensive trading courses for all levels",
                          "Multi-language educational content",
                          "Personal account managers for guidance",
                          "Economic calendar and market analysis"
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
                          "Some advanced courses require account funding",
                          "Webinar times may not suit all time zones",
                          "Content primarily focused on forex trading"
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
