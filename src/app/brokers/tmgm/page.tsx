import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrokerBySlug, getSimilarBrokers } from "@/lib/brokers";
import { HeroBrokerSection } from "@/components/broker-review/HeroBrokerSection";
import { BrokerOverviewSection } from "@/components/broker-review/BrokerOverviewSection";
import { BrokerTradingConditions } from "@/components/broker-review/BrokerTradingConditions";
import { PlatformsSection } from "@/components/broker-review/PlatformsSection";
import { EducationSection } from "@/components/broker-review/EducationSection";
import { ReviewsSection } from "@/components/broker-review/ReviewsSection";
import { BrokerAnalysisWidget } from "@/components/broker-review/BrokerAnalysisWidget";
import { DynamicFAQSection } from "@/components/broker-review/DynamicFAQSection";
import { SimilarBrokersSection } from "@/components/broker-review/SimilarBrokersSection";
import { Separator } from "@/components/ui/separator";
import { getHeadlineForBroker, getBrokerSeo } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ slug: string }>
}

// Generate metadata for the broker review page
export async function generateMetadata({ params: _ }: Props): Promise<Metadata> {
  // Get the broker data using the slug from params
  const broker = await getBrokerBySlug('tmgm');

  if (!broker) {
    return {
      title: "Broker Not Found",
      description: "The requested broker review could not be found."
    };
  }

  const seoData = getBrokerSeo(broker);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: "article",
      url: `https://yoursite.com/brokers/tmgm`,
      images: [
        {
          url: broker.logo_url || "/images/default-broker-logo.png",
          width: 1200,
          height: 630,
          alt: `${broker.name} Logo`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: [broker.logo_url || "/images/default-broker-logo.png"]
    }
  };
}

export default async function BrokerReviewPage({ params: _ }: Props) {
  // Get the broker data using the slug from params
  const broker = await getBrokerBySlug('tmgm');

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
    mainEntity?: any; // Add optional mainEntity property
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
      "ratingValue": broker.overall_rating || "4.0",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Your Site Name"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Site Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yoursite.com/logo.png"
      }
    },
    "headline": headline,
    "datePublished": broker.published_date || new Date().toISOString().split('T')[0],
    "dateModified": broker.last_updated || new Date().toISOString().split('T')[0]
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

        <Separator className="my-8 sm:my-12" />

        {/* Mobile Navigation for sections */}
        <div className="lg:hidden mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2 min-w-max">
            <a href="#trading-conditions" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Trading Conditions</a>
            <a href="#platforms" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Platforms</a>
            {broker.educational_resources && (
              <a href="#education" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Education</a>
            )}
            <a href="#reviews" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Reviews</a>
            <a href="#analysis" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Analysis</a>
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
            {broker.educational_resources && (
              <section id="education">
                <EducationSection broker={broker} />
              </section>
            )}

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

            {/* Similar Brokers Recommendation */}
            <section id="similar">
              <SimilarBrokersSection brokers={similarBrokers} currentBroker={broker.name} />
            </section>
          </div>
        </div>

        <Separator className="my-8 sm:my-12" />

        {/* FAQ Section */}
        <section id="faq" className="mt-8 sm:mt-12">
          <DynamicFAQSection broker={broker} additionalFaqs={broker.faqs} />
        </section>
      </div>
    </>
  );
}