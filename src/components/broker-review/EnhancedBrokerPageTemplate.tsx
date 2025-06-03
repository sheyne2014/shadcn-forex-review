'use client';

import { Metadata } from "next";
import { HeroBrokerSection } from "@/components/broker-review/HeroBrokerSection";
import { BrokerOverviewSection } from "@/components/broker-review/BrokerOverviewSection";
import { BrokerTradingConditions } from "@/components/broker-review/BrokerTradingConditions";
import { PlatformsSection } from "@/components/broker-review/PlatformsSection";
import { ReviewsSection } from "@/components/broker-review/ReviewsSection";
import { BrokerAnalysisWidget } from "@/components/broker-review/BrokerAnalysisWidget";
import { DynamicFAQSection } from "@/components/broker-review/DynamicFAQSection";
import { SimilarBrokersSection } from "@/components/broker-review/SimilarBrokersSection";
import { BrokerPageNavigation, BrokerInternalLinks, BrokerBreadcrumbs } from "@/components/broker-review/BrokerPageNavigation";
import { BrokerSchema, BreadcrumbSchema, BrokerSEOData } from "@/components/seo/BrokerReviewSEO";
import { Separator } from "@/components/ui/separator";

export interface BrokerPageData extends BrokerSEOData {
  id: string;
  pros?: string[];
  cons?: string[];
  educational_resources?: boolean;
  feature?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  account_types?: string[];
  trading_platforms?: string;
  spreads_from?: string;
  max_leverage?: string;
}

export interface SimilarBroker {
  id: string;
  name: string;
  logo_url?: string;
  overall_rating?: number;
  min_deposit?: number;
  max_leverage?: string;
  regulations?: string;
  key_feature?: string;
  website_url?: string;
  spreads_from?: string;
}

interface EnhancedBrokerPageTemplateProps {
  broker: BrokerPageData;
  similarBrokers: SimilarBroker[];
  headline?: string;
}

/**
 * Enhanced broker page template with comprehensive SEO optimizations
 * Implements all audit recommendations for improved search rankings
 */
export function EnhancedBrokerPageTemplate({
  broker,
  similarBrokers,
  headline
}: EnhancedBrokerPageTemplateProps) {
  const defaultHeadline = headline || 
    `${broker.name} is a ${broker.regulations ? 'regulated' : ''} broker ${
      broker.feature ? `known for ${broker.feature.toLowerCase()}` : ''
    }. ${broker.min_deposit !== undefined ? `With ${broker.min_deposit === 0 ? 'no minimum deposit' : `$${broker.min_deposit} minimum deposit`}` : ''} and ${
      broker.max_leverage ? `leverage up to ${broker.max_leverage}` : 'competitive leverage'
    }, ${broker.name} serves traders ${broker.country ? `primarily in ${broker.country}` : 'worldwide'}.`;

  return (
    <>
      {/* SEO Schema Markup */}
      <BrokerSchema broker={broker} headline={defaultHeadline} />
      <BreadcrumbSchema broker={broker} />

      {/* Enhanced Navigation */}
      <BrokerPageNavigation currentBroker={broker.name} />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <BrokerBreadcrumbs 
          brokerName={broker.name} 
          brokerSlug={broker.slug} 
          className="mb-6"
        />

        {/* Hero Section with broker overview */}
        <HeroBrokerSection broker={broker} />

        <div className="mt-8 sm:mt-12">
          <BrokerOverviewSection broker={broker} headline={defaultHeadline} />
        </div>

        <Separator className="my-8 sm:my-12" />

        {/* Mobile Navigation for sections */}
        <div className="lg:hidden mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent sticky top-16 z-20 bg-background/95 backdrop-blur-sm pb-2 pt-2 -mx-4 px-4 shadow-sm border-b border-border/50">
          <div className="flex space-x-3 min-w-max">
            <a href="#trading-conditions" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">
              Trading Conditions
            </a>
            <a href="#platforms" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">
              Platforms
            </a>
            <a href="#reviews" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">
              Reviews
            </a>
            <a href="#similar" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">
              Similar Brokers
            </a>
            <a href="#faq" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap">
              FAQ
            </a>
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

            {/* Internal Links for SEO */}
            <BrokerInternalLinks 
              currentBroker={broker.name}
              brokerSlug={broker.slug}
            />
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

/**
 * Utility function to validate broker data completeness for SEO
 */
export function validateBrokerSEOData(broker: BrokerPageData): {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
} {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check required fields
  if (!broker.name) warnings.push("Broker name is required");
  if (!broker.slug) warnings.push("Broker slug is required");
  if (!broker.description) warnings.push("Broker description is missing");
  if (!broker.logo_url) warnings.push("Broker logo URL is missing");
  if (!broker.overall_rating) warnings.push("Overall rating is missing");

  // Check SEO optimization
  if (broker.description && broker.description.length < 120) {
    suggestions.push("Description should be at least 120 characters for better SEO");
  }
  if (broker.description && broker.description.length > 160) {
    suggestions.push("Description should be under 160 characters for meta description");
  }

  // Check image alt text requirements
  if (!broker.logo_url?.includes('alt=')) {
    suggestions.push("Consider adding descriptive alt text to images");
  }

  // Check internal linking opportunities
  if (!broker.faqs || broker.faqs.length === 0) {
    suggestions.push("Add FAQ section for better user engagement and SEO");
  }

  const isValid = warnings.length === 0;

  return {
    isValid,
    warnings,
    suggestions
  };
}
