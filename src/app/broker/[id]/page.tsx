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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { getBrokerBySlug, getSimilarBrokers } from "@/lib/brokers";
import { getBrokerById } from "@/lib/supabase/broker-client";
import { getHeadlineForBroker } from "@/lib/seo-utils";
import { siteConfig } from "@/config/site";
import { getAllBrokerIds } from "@/lib/route-generation";
import { generateBrokerMetadata } from "@/lib/broker-metadata";


interface BrokerPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all broker pages
export async function generateStaticParams() {
  const brokerIds = await getAllBrokerIds();

  return brokerIds.map(id => ({
    id,
  }));
}

export async function generateMetadata(props: BrokerPageProps): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;

  // Check if the ID is a UUID or a slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  // Get broker data using the appropriate method with error handling
  let broker = null;
  try {
    if (isUUID) {
      // Use getBrokerById for UUIDs
      const result = await getBrokerById(id);
      if (result && !result.error) {
        broker = result.data;
      } else {
        // If database fails, try to get mock data based on the ID
        console.warn("Database unavailable for metadata, falling back to mock data for UUID:", id);
        broker = await getBrokerBySlug(id); // This will fall back to mock data
      }
    } else {
      // Use getBrokerBySlug for slugs
      broker = await getBrokerBySlug(id);
    }
  } catch (error) {
    console.error("Error fetching broker for metadata:", error);
    // Try one more fallback to mock data
    try {
      broker = await getBrokerBySlug(id);
    } catch (fallbackError) {
      console.error("Metadata fallback also failed:", fallbackError);
    }
  }

  if (!broker) {
    return {
      title: "Broker Review | BrokerAnalysis",
      description: "Professional broker review and analysis. Compare trading fees, platforms, and features."
    };
  }

  return generateBrokerMetadata(broker);
}

export default async function BrokerReviewPage(props: BrokerPageProps) {
  const params = await props.params;
  const id = params.id;

  // Check if the ID is a UUID or a slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  // Get broker data using the appropriate method with error handling
  let broker = null;
  try {
    if (isUUID) {
      // Use getBrokerById for UUIDs with comprehensive error handling
      try {
        const result = await getBrokerById(id);
        if (result && !result.error && result.data) {
          broker = result.data;
        } else {
          console.warn("Database query returned no data or error for UUID:", id, result?.error);
          // If database fails, try to get mock data based on the ID
          broker = await getBrokerBySlug(id); // This will fall back to mock data
        }
      } catch (dbError) {
        console.error("Database error for UUID:", id, dbError);
        // Fallback to mock data
        broker = await getBrokerBySlug(id);
      }
    } else {
      // Use getBrokerBySlug for slugs
      broker = await getBrokerBySlug(id);
    }
  } catch (error) {
    console.error("Error fetching broker data:", error);
    // Try one more fallback to mock data
    try {
      broker = await getBrokerBySlug(id);
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
    }
  }

  // If broker is not found, return 404
  if (!broker) {
    notFound();
  }

  // Get similar brokers for recommendation
  const similarBrokers = await getSimilarBrokers(broker.id, 4);

  // Generate headline for the broker
  const headline = getHeadlineForBroker(broker);

  // Define the type for the JSON-LD object
  const jsonLd: {
    "@context": string;
    "@type": string;
    itemReviewed: {
      "@type": string;
      name: string;
      description: string;
      url: string;
      logo: string;
    };
    reviewRating: {
      "@type": string;
      ratingValue: string | number;
      bestRating: string;
      worstRating: string;
    };
    author: {
      "@type": string;
      name: string;
    };
    publisher: {
      "@type": string;
      name: string;
      logo: {
        "@type": string;
        url: string;
      };
    };
    headline: string;
    datePublished: string;
    dateModified: string;
    mainEntity?: any;
  } = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "FinancialService",
      "name": broker.name,
      "description": broker.description || `${broker.name} forex broker review.`,
      "url": broker.website_url || "",
      "logo": broker.logo_url || "/images/default-broker-logo.png"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": broker.overall_rating || broker.rating || "4.0",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": siteConfig.name
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/logo.png`
      }
    },
    "headline": headline,
    "datePublished": broker.published_date || broker.created_at || new Date().toISOString().split('T')[0],
    "dateModified": broker.last_updated || broker.updated_at || new Date().toISOString().split('T')[0]
  };

  // Add FAQ schema if available
  if (broker.faqs && broker.faqs.length > 0) {
    jsonLd.mainEntity = {
      "@type": "FAQPage",
      "mainEntity": broker.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Section with broker overview */}
        <HeroBrokerSection broker={broker} />

        <div className="mt-8 sm:mt-12">
          <BrokerOverviewSection broker={broker} headline={headline} />
        </div>

        {/* eToro Executive Summary START */}

        <Separator className="my-8 sm:my-12" />

        {/* Enhanced Mobile Navigation for sections */}
        <div className="lg:hidden mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent sticky top-16 z-20 bg-background/95 backdrop-blur-sm pb-2 pt-2 -mx-4 px-4 shadow-sm border-b border-border/50">
          <div className="flex space-x-3 min-w-max">
            <a href="#trading-conditions" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">
              Trading Conditions
            </a>
            <a href="#platforms" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Platforms</a>
            <a href="#reviews" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Reviews</a>
            <a href="#similar" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">Similar Brokers</a>
            <a href="#faq" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">FAQ</a>
          </div>
        </div>

        {/* Enhanced 4-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-12">
            {/* Trading Conditions - Enhanced for eToro */}
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

            {/* Enhanced Educational Resources Section */}
            {/* User Reviews */}
            <section id="reviews" className="scroll-mt-20">
              <div className="rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <ReviewsSection broker={broker} />
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
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
