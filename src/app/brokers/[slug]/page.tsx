import { getBrokerBySlug, getSimilarBrokers } from "@/lib/brokers";
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
import { BrokerExecutiveSummary } from "@/components/broker-review/BrokerExecutiveSummary";
import { SocialTradingSection } from "@/components/broker-review/SocialTradingSection";
import { AccountTypesSection } from "@/components/broker-review/AccountTypesSection";
import { CustomerSupportSection } from "@/components/broker-review/CustomerSupportSection";
import { RegulationSection } from "@/components/broker-review/RegulationSection";
import { ClientSideSidebar } from "@/components/broker-review/ClientSideSidebar";
import { Separator } from "@/components/ui/separator";
import { getHeadlineForBroker, getBrokerSeo } from "@/lib/seo-utils";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BrokerReviewSEO } from "@/components/seo/BrokerReviewSEO";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { TrustSignals } from "@/components/trust/TrustSignals";
import { MobileResponsivenessOptimizer } from "@/components/optimization/MobileResponsivenessOptimizer";

type Props = {
  params: { slug: string }
}

const sections = [
  "trading-conditions",
  "social-trading",
  "platforms",
  "accounts",
  "regulation",
  "education",
  "support",
  "reviews",
  "analysis",
  "faq"
];

export default async function BrokerReviewPage({ params }: Props) {
  const { slug } = await params;
  const broker = await getBrokerBySlug(slug);

  // If broker is not found, return 404
  if (!broker) {
    notFound();
  }

  // Get similar brokers for recommendation
  const similarBrokers = await getSimilarBrokers(broker.id, 4);

  // Generate headline for the broker
  const headline = getHeadlineForBroker(broker);

  // Prepare broker data for SEO component
  const seoData = {
    name: broker.name,
    slug: broker.slug,
    description: broker.description || `Comprehensive review of ${broker.name} forex broker`,
    website_url: broker.website_url || '',
    logo_url: broker.logo_url || '',
    overall_rating: broker.overall_rating || 0,
    published_date: broker.published_date || new Date().toISOString().split('T')[0],
    last_updated: broker.last_updated || new Date().toISOString().split('T')[0],
    faqs: broker.faqs,
    address: broker.address,
    aggregateRating: broker.aggregateRating,
    offers: broker.offers
  };

  // Prepare eToro executive summary data
  const etoroExecutiveSummaryData = {
    text: `eToro uniquely positions itself in the forex market, not as a conventional broker, but as a leading social trading platform. Established in 2007 and headquartered in Cyprus, its core distinction lies in its vibrant community of over 30 million users and its innovative CopyTrader™ system, which allows individuals to mirror the trades of successful investors—a far cry from traditional forex offerings. Key strengths include this powerful social trading capability, an exceptionally user-friendly interface tailored for beginner to intermediate traders, and robust regulation under authorities like CySEC, FCA, and ASIC. However, eToro is not without limitations. Its spreads are notably wider than those of typical ECN brokers, potentially increasing trading costs. Furthermore, the platform offers limited advanced analytical tools, and its product suite is heavily concentrated on CFDs. Therefore, eToro is an excellent fit for newcomers and those prioritizing social interaction and ease of use. Conversely, seasoned traders demanding low spreads, sophisticated charting, and diverse non-CFD instruments may find it lacking.`,
    overallVerdict: "Overall Verdict: eToro excels as a social trading pioneer.",
    scores: [
      { label: "Social Trading & Copy Trading", score: "9.5/10" },
      { label: "User-Friendliness & Accessibility", score: "9.0/10" },
      { label: "Regulation & Security", score: "8.0/10" },
      { label: "Spreads & Trading Costs", score: "6.0/10" },
      { label: "Advanced Tools & Platforms", score: "5.5/10" },
    ],
    overallScore: "7.6/10",
  };

  return (
    <>
      {/* SEO Optimization */}
      <BrokerReviewSEO broker={seoData} />

      {/* Performance Monitoring */}
      <PerformanceMonitor
        reportTo="/api/performance-metrics"
        debug={process.env.NODE_ENV === 'development'}
      />

      <div className="min-h-screen" style={{ scrollBehavior: 'smooth' }}>
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Breadcrumbs */}
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Brokers", href: "/brokers" },
            { label: broker.name, href: `/brokers/${broker.slug}` }
          ]} />

          {/* Hero Section */}
          <HeroBrokerSection broker={broker} />

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

          {/* Main Content Layout */}
          <div className="mt-8 sm:mt-12">
            <BrokerOverviewSection broker={broker} headline={headline} />
          </div>

          {/* Executive Summary */}
          <div className="mt-8 sm:mt-12">
            <BrokerExecutiveSummary summary={etoroExecutiveSummaryData} brokerName={broker.name} />
          </div>

          {/* Mobile Responsiveness Monitor (visible only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8">
              <MobileResponsivenessOptimizer />
            </div>
          )}

          <Separator className="my-8 sm:my-12" />

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-8 overflow-x-auto">
            <div className="flex space-x-4 pb-2 min-w-max">
              <a href="#trading-conditions" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Trading Conditions</a>
              <a href="#social-trading" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Social Trading</a>
              <a href="#platforms" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Platforms</a>
              <a href="#accounts" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Account Types</a>
              <a href="#regulation" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Regulation</a>
              <a href="#education" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Education</a>
              <a href="#support" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Support</a>
              <a href="#reviews" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">Reviews</a>
              <a href="#faq" className="px-4 py-2 bg-muted rounded-md text-sm font-medium">FAQ</a>
            </div>
          </div>

          {/* Main Content Grid with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sticky Sidebar */}
            <ClientSideSidebar sections={sections} />

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              <section id="trading-conditions">
                <BrokerTradingConditions broker={broker} />
              </section>

              <section id="social-trading">
                <SocialTradingSection broker={broker} />
              </section>

              <section id="platforms">
                <PlatformsSection broker={broker} />
              </section>

              <section id="accounts">
                <AccountTypesSection broker={broker} />
              </section>

              <section id="regulation">
                <RegulationSection broker={broker} />
              </section>

              <section id="education">
                <EducationSection broker={broker} />
              </section>

              <section id="support">
                <CustomerSupportSection broker={broker} />
              </section>

              <section id="reviews">
                <ReviewsSection broker={broker} />
              </section>

              <section id="analysis">
                <BrokerAnalysisWidget broker={broker} />
              </section>

              <section id="similar">
                <SimilarBrokersSection brokers={similarBrokers} currentBroker={broker.name} />
              </section>
            </div>
          </div>

          {/* FAQ Section */}
          <section id="faq" className="mt-12">
            <DynamicFAQSection broker={broker} additionalFaqs={broker.faqs} />
          </section>
        </div>
      </div>
    </>
  );
}
