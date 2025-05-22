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
    title: "eToro Review 2025 | Expert Analysis of Social Trading Platform & Fees",
    description: "Comprehensive eToro review. Discover trading fees, available markets, platform features, copy trading, and customer service quality. Updated for 2025.",
    keywords: ["eToro review", "eToro trading fees", "eToro platforms", "social trading", "copy trading", "forex broker review", "CFD trading", "cryptocurrency trading"],
    openGraph: {
      title: "eToro Review 2025 | Expert Analysis of Social Trading Platform & Fees",
      description: "Comprehensive eToro review. Discover trading fees, available markets, platform features, copy trading, and customer service quality. Updated for 2025.",
      url: "https://brokeranalysis.com/broker/etoro",
      type: "article",
    },
  };
}

export default async function EToroReviewPage() {
  // eToro broker data
  const broker = {
    id: "etoro",
    name: "eToro",
    logo_url: "/images/brokers/etoro.png",
    description: "eToro is a multi-asset platform offering trading services in forex and other financial instruments. Key features include FCA, CySEC, ASIC regulation, $50 min deposit, 1:30 leverage. Particularly suitable for social trading enthusiasts and beginners. Updated May 2023.",
    min_deposit: 50,
    max_leverage: "1:30",
    regulations: "FCA, CySEC, ASIC",
    trading_platforms: "eToro Platform & Mobile",
    spreads_from: "1.0 pips",
    account_types: ["Retail", "Professional"],
    country: "Israel",
    established: "2007",
    overall_rating: 4.5,
    pros: [
      "Reputation for reputable financial activities",
      "Competitive spreads starting from 1.0 pips",
      "Multiple trading platforms available",
      "Comprehensive educational resources",
      "Fast customer support"
    ],
    cons: [
      "Higher premium deposit for popular accounts",
      "Limited copy-trading options",
      "Weekend support limited"
    ],
    educational_resources: true,
    feature: "Social Trading",
    website_url: "https://www.etoro.com",
    published_date: "2023-05-15",
    last_updated: "2023-05-15",
    faqs: [
      {
        question: "Is eToro regulated?",
        answer: "eToro is regulated by FCA, CySEC, ASIC, ensuring safety and transparency in financial standards."
      },
      {
        question: "What is the minimum deposit for eToro?",
        answer: "The minimum deposit for eToro is $50."
      },
      {
        question: "What trading platforms does eToro offer?",
        answer: "eToro offers its proprietary eToro Platform and Mobile app."
      }
    ]
  };

  // Similar brokers for recommendation
  const similarBrokers = [
    {
      id: "simplefx",
      name: "SimpleFX",
      logo_url: "/images/brokers/simplefx.png",
      overall_rating: 4.1,
      min_deposit: 10,
      max_leverage: "1:500",
      regulations: "Regulated",
      key_feature: "High leverage trading"
    },
    {
      id: "xm",
      name: "XM",
      logo_url: "/images/brokers/xm.png",
      overall_rating: 4.3,
      min_deposit: 5,
      max_leverage: "1:888",
      regulations: "CySEC",
      key_feature: "Low minimum deposit"
    },
    {
      id: "pepperstone",
      name: "Pepperstone",
      logo_url: "/images/brokers/pepperstone.png",
      overall_rating: 4.7,
      min_deposit: 200,
      max_leverage: "1:500",
      regulations: "FCA, ASIC",
      key_feature: "Fast execution speeds"
    }
  ];

  // Generate headline for the broker
  const headline = "eToro is a leading social trading platform offering a wide range of financial instruments including forex, stocks, cryptocurrencies, and more. With its innovative CopyTrader feature, users can automatically copy the trades of successful investors.";

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
        <div className="lg:hidden mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2 min-w-max">
            <a href="#trading-conditions" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Trading Conditions</a>
            <a href="#platforms" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Platforms</a>
            <a href="#education" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Education</a>
            <a href="#reviews" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Reviews</a>
            <a href="#similar" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Similar Brokers</a>
            <a href="#faq" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">FAQ</a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10 sm:space-y-12">
            {/* Trading Conditions */}
            <section id="trading-conditions">
              <BrokerTradingConditions broker={broker} />
            </section>

            {/* Trading Platforms */}
            <section id="platforms">
              <PlatformsSection broker={broker} />
            </section>

            {/* Educational Resources */}
            <section id="education">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Educational Resources</CardTitle>
                      <CardDescription>
                        Learning materials and resources offered by {broker.name}
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        <span className="ml-1 font-medium">4.2/5</span>
                      </div>
                      <Badge variant="outline" className="ml-2">Education Rating</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {broker.name} offers a variety of educational resources designed to help traders at different skill levels improve their trading knowledge and skills. The resources include articles, videos, and comprehensive guides.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> Strengths
                      </h3>
                      <ul className="space-y-2">
                        {[
                          "Comprehensive learning materials for all trader levels",
                          "Free access to basic educational content",
                          "Social trading learning opportunities",
                          "Mobile-friendly educational platform"
                        ].map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" /> Considerations
                      </h3>
                      <ul className="space-y-2">
                        {[
                          "Advanced content may require premium account",
                          "Limited one-on-one coaching options",
                          "Some content may not be available in all languages"
                        ].map((weakness, index) => (
                          <li key={index} className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
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
            <section id="reviews">
              <ReviewsSection broker={broker} />
            </section>
          </div>

          <div className="space-y-8">
            {/* Broker Analysis Widget */}
            <section id="analysis">
              <BrokerAnalysisWidget broker={broker} />
            </section>
          </div>
        </div>

        <Separator className="my-8 sm:my-12" />

        {/* Similar Brokers Section - Full Width */}
        <section id="similar" className="mt-8 sm:mt-12 mb-12">
          <SimilarBrokersSection brokers={similarBrokers} currentBroker={broker.name} />
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* FAQ Section */}
        <section id="faq" className="mt-8 sm:mt-12">
          <DynamicFAQSection broker={broker} additionalFaqs={broker.faqs} />
        </section>
      </div>
    </>
  );
}
