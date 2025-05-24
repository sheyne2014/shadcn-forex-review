import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, CheckCircle, HelpCircle, Share2, Shield, Star } from "lucide-react";
import { ScamBrokerCheckWidget } from "@/components/ScamBrokerCheckWidget";
import { getMockBroker } from "@/lib/brokers";
import { getBrokerTemplate } from "@/lib/broker-templates";
import { siteConfig } from "@/config/site";
import { getAllBrokerIds } from "@/lib/route-generation";

// Import our new components
import { HeroBrokerSection } from "@/components/broker-review/HeroBrokerSection";
import { BrokerOverviewSection } from "@/components/broker-review/BrokerOverviewSection";
import { TradingConditionsSection } from "@/components/broker-review/TradingConditionsSection";
import { PlatformsSection } from "@/components/broker-review/PlatformsSection";
import { EducationSection } from "@/components/broker-review/EducationSection";
import { ReviewsSection } from "@/components/broker-review/ReviewsSection";
import { FAQSection } from "@/components/broker-review/FAQSection";
import { BrokerComparisonWidget } from "@/components/broker-review/BrokerComparisonWidget";
import { BrokerComparisonWidgetWrapper } from "@/components/broker-comparison/BrokerComparisonWidgetWrapper";
import { BrokerLegitimacyScore } from "@/components/broker-review/BrokerLegitimacyScore";
import { BrokerRiskIndex } from "@/components/broker-review/BrokerRiskIndex";
import { BrokerAnalysisWidget } from "@/components/broker-review/BrokerAnalysisWidget";
import { DynamicFAQSection } from "@/components/broker-review/DynamicFAQSection";
import { SimilarBrokersSection } from "@/components/broker-review/SimilarBrokersSection";
import { SimilarBrokersSectionWrapper } from "@/components/broker-comparison/SimilarBrokersSectionWrapper";
import { generateBrokerDescription } from "@/lib/broker-analysis";

// Import Context7Config and client wrapper
import { Context7Config } from "@/lib/context7";
import { BrokerDetailClientWrapper } from "@/components/BrokerDetailClientWrapper";

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

  // Get broker data from template or mock data
  let broker;
  let error = null;

  try {
    // Try to find a matching broker template by ID
    // First, convert ID to a slug format if needed
    const slug = id.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    // Get broker template
    const brokerTemplate = getBrokerTemplate(slug);

    if (brokerTemplate) {
      // Use the template data
      broker = getMockBroker(slug);
      Object.assign(broker, brokerTemplate);
    } else {
      // Fallback to a generic mock broker
      broker = getMockBroker(id);
      broker.name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  } catch (err) {
    error = err;
    console.error("Error getting broker data:", err);
  }

  if (error || !broker) {
    return {
      title: "Broker Not Found | BrokerAnalysis",
      description: "The requested broker information could not be found."
    };
  }

  // Format current date for the review
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  // Generate primary and secondary keywords
  const primaryKeyword = `${broker.name} Review`;
  const secondaryKeyword = broker.categories?.[0]?.name
    ? `Best ${broker.categories[0].name} Platform ${year}`
    : `Best Trading Platform ${year}`;

  // Enhanced broker features for meta description
  const features = [];
  if (broker.min_deposit) features.push(`$${broker.min_deposit} min deposit`);
  if (broker.trading_fee) features.push(`${broker.trading_fee}% trading fee`);
  if (broker.max_leverage) features.push(`${broker.max_leverage} leverage`);
  if (broker.regulations) features.push(`${broker.regulations} regulated`);

  // Create a more descriptive meta description with trading features
  const brokerDesc = broker.description?.slice(0, 100) ||
    `${broker.name} is a ${broker.categories?.[0]?.name || 'forex'} broker offering various financial instruments`;

  const featuresText = features.length > 0
    ? ` with ${features.slice(0, 2).join(' and ')}`
    : ' with competitive trading conditions';

  const ratingText = broker.rating
    ? ` and ${broker.rating}/5 rating`
    : '';

  const metaDescription = `${brokerDesc}${featuresText}${ratingText}. Updated ${month} ${year}.`;

  // Generate more comprehensive keywords
  const keywordsList = [
    `${broker.name}`,
    `${broker.name} review`,
    `${broker.name} trading`,
    `${broker.name} forex broker`,
    `${broker.name} ${year}`,
    `${broker.name} regulation`,
    `${broker.name} minimum deposit`,
    `${broker.name} trading platforms`,
    `${broker.name} trading fees`,
    `${broker.name} spreads`,
    `${month} ${year} broker review`,
    `best ${broker.categories?.[0]?.name?.toLowerCase() || 'forex'} broker`,
    `regulated forex broker`,
    `${broker.country} forex broker`
  ];

  if (broker.categories) {
    broker.categories.forEach((cat: {name: string}) => {
      keywordsList.push(`${broker.name} ${cat.name.toLowerCase()}`);
      keywordsList.push(`best ${cat.name.toLowerCase()} broker ${year}`);
    });
  }

  return {
    title: `${primaryKeyword} (${broker.rating || "N/A"}/5) | ${secondaryKeyword} | ${siteConfig.name}`,
    description: metaDescription.length > 160 ? metaDescription.slice(0, 157) + '...' : metaDescription,
    openGraph: {
      title: `${broker.name} Broker Review & Rating ${year} (${broker.rating || "N/A"}/5) | ${month} ${year} Update`,
      description: metaDescription,
      type: "website",
      url: `${siteConfig.url}/broker/${broker.id}`,
      images: [
        {
          url: broker.logo_url || `${siteConfig.url}/images/brokers/default-broker.png`,
          width: 1200,
          height: 630,
          alt: `${broker.name} logo`
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${broker.name} Broker Review ${year} | ${siteConfig.name}`,
      description: metaDescription,
      images: [broker.logo_url || `${siteConfig.url}/images/brokers/default-broker.png`],
    },
    keywords: keywordsList,
    alternates: {
      canonical: `${siteConfig.url}/broker/${broker.id}`,
    },
  };
}

// Helper function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to format supported assets
function formatSupportedAssets(supportedAssets: string | string[] | null | undefined): string[] {
  if (!supportedAssets) return [];
  if (typeof supportedAssets === 'string') {
    try {
      return JSON.parse(supportedAssets);
    } catch {
      return supportedAssets.split(',').map(asset => asset.trim());
    }
  }
  return supportedAssets;
}

// Generate enhanced JSON-LD structured data with FAQ
function generateBrokerJsonLd(broker: any) {
  // Generate sample FAQs based on broker information
  const faqs = [
    {
      question: `Is ${broker.name} a regulated broker?`,
      answer: broker.regulations
        ? `Yes, ${broker.name} is regulated by ${broker.regulations}.`
        : `Information about ${broker.name}'s regulation status is not fully verified.`
    },
    {
      question: `What is the minimum deposit for ${broker.name}?`,
      answer: broker.min_deposit
        ? `The minimum deposit for ${broker.name} is $${broker.min_deposit}.`
        : `The minimum deposit information for ${broker.name} is not currently specified.`
    },
    {
      question: `What trading platforms does ${broker.name} offer?`,
      answer: broker.trading_platforms
        ? `${broker.name} offers ${broker.trading_platforms}.`
        : `${broker.name} provides various trading platforms to its clients.`
    },
    {
      question: `Is ${broker.name} good for beginners?`,
      answer: `${broker.name} offers ${broker.min_deposit && broker.min_deposit <= 100 ? 'low minimum deposits' : 'various account types'} and ${broker.educational_resources ? 'educational resources' : 'trading tools'} that can be suitable for traders of different experience levels.`
    }
  ];

  // Create the broker review schema
  const brokerReview = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${broker.name} Broker Review`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: broker.rating || '4.0',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    reviewBody: broker.description || `Our comprehensive review of ${broker.name}, covering trading conditions, platforms, and more.`,
    datePublished: new Date().toISOString().split('T')[0],
    itemReviewed: {
      '@type': 'FinancialService',
      name: broker.name,
      description: broker.description,
      image: broker.logo_url,
      url: broker.url,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: broker.rating || '4.0',
        reviewCount: broker.reviews?.length || '10',
        bestRating: '5',
        worstRating: '1'
      }
    }
  };

  // Create the FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  // Return both schemas as a string
  return `<script type="application/ld+json">${JSON.stringify(brokerReview)}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
}

export default async function BrokerDetailPage(props: BrokerPageProps) {
  const params = await props.params;
  const id = params.id;

  // Get broker data from template or mock data
  let broker;
  let error = null;

  try {
    // Try to find a matching broker template by ID
    // First, convert ID to a slug format if needed
    const slug = id.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    // Get broker template
    const brokerTemplate = getBrokerTemplate(slug);

    if (brokerTemplate) {
      // Use the template data
      broker = getMockBroker(slug);
      Object.assign(broker, brokerTemplate);
    } else {
      // Fallback to a generic mock broker
      broker = getMockBroker(id);
      broker.name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Add additional properties needed for this page
    broker.categories = broker.categories || [{ name: 'Forex' }];
    broker.trading_fee = broker.trading_fee || 0.8;
    broker.rating = broker.overall_rating || 4.5;
  } catch (err) {
    error = err;
    console.error("Error getting broker data:", err);
  }

  if (error || !broker) {
    console.error("Error fetching broker:", error);
    notFound();
  }

  // Get similar brokers for comparison (mocked for now)
  const getSimilarBrokers = () => {
    return [
      {
        id: "similar-broker-1",
        name: "SimilarFX",
        logo_url: `https://placehold.co/150x60?text=SimilarFX`,
        regulations: "FCA, ASIC",
        min_deposit: 100,
        max_leverage: "1:500",
        trading_platforms: "MT4, MT5, WebTrader",
        overall_rating: 4.1
      },
      {
        id: "xm",
        name: "XM",
        logo_url: `https://placehold.co/150x60?text=XM`,
        regulations: "CySEC, ASIC, FCA",
        min_deposit: 5,
        max_leverage: "1:1000",
        spreads_from: "1.0",
        trading_platforms: "MT4, MT5, Mobile Trading",
        overall_rating: 4.3,
        key_feature: "Ultra-low minimum deposit"
      },
      {
        id: "pepperstone",
        name: "Pepperstone",
        logo_url: `https://placehold.co/150x60?text=Pepperstone`,
        regulations: "FCA, ASIC, CySEC, DFSA",
        min_deposit: 200,
        max_leverage: "1:500",
        spreads_from: "0.0",
        trading_platforms: "MT4, MT5, cTrader",
        overall_rating: 4.7,
        key_feature: "Fast execution and tight spreads"
      }
    ];
  };

  const similarBrokers = getSimilarBrokers();

  // Helper function to determine if broker is legitimate based on criteria
  const getLegitimacyData = (broker: any) => {
    if (!broker) return { isLegitimate: false, regulatoryStatus: "Unknown", warningFlags: ["No broker data"] };

    // Safely parse values
    const safeParseNumber = (value: any, defaultVal = 0): number => {
      if (value === null || value === undefined) return defaultVal;
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        try {
          const parsed = parseFloat(value);
          return isNaN(parsed) ? defaultVal : parsed;
        } catch {
          return defaultVal;
        }
      }
      return defaultVal;
    };

    // Parse max leverage value safely
    const parseLeverage = (leverage: any): number => {
      if (!leverage) return 0;
      if (typeof leverage === 'number') return leverage;
      if (typeof leverage === 'string') {
        try {
          // Handle formats like "1:500"
          if (leverage.includes(':')) {
            const parts = leverage.split(':');
            return parseInt(parts[1]) || 0;
          }
          // Handle numeric strings with or without text
          return parseInt(leverage.replace(/\D/g, '')) || 0;
        } catch {
          return 0;
        }
      }
      return 0;
    };

    // Some basic criteria to determine legitimacy - can be expanded
    const isRegulated = !!broker.regulations;
    const hasRedFlags = !!broker.red_flags;
    const minDeposit = safeParseNumber(broker.min_deposit, 0);
    const minDepositTooHigh = minDeposit > 5000;
    const leverageValue = parseLeverage(broker.max_leverage);
    const unrealisticLeverage = leverageValue > 1000;

    // Set warning flags
    const warningFlags: string[] = [];
    if (!isRegulated) warningFlags.push("Unregulated entity");
    if (hasRedFlags) warningFlags.push("Known regulatory warnings");
    if (minDepositTooHigh) warningFlags.push("Unusually high minimum deposit");
    if (unrealisticLeverage) warningFlags.push("Unrealistically high leverage");

    return {
      isLegitimate: isRegulated && !hasRedFlags && warningFlags.length === 0,
      regulatoryStatus: broker.regulations || "Unverified",
      warningFlags
    };
  };

  // Sample broker analysis for demo purposes
  const brokerAnalysis = {
    overview: broker.description || `${broker.name} is a forex and CFD broker offering trading services across multiple financial markets. The broker provides various account types tailored to different trading needs and experience levels.`,
    strengths: "This broker offers competitive spreads, a variety of trading platforms, and comprehensive educational resources. Their customer support is available 24/5 in multiple languages.",
    considerations: "Some account types have higher minimum deposit requirements. Additionally, certain features may only be available to premium account holders.",
    suitableFor: [
      "Active forex traders",
      "Traders seeking multiple platform options",
      "Both beginner and experienced traders"
    ],
    notSuitableFor: [
      "Traders looking for extensive stock offerings",
      "Ultra-low budget traders",
      "Traders requiring 24/7 support"
    ]
  };

  // Sample pros and cons for demo purposes
  const prosCons = {
    pros: [
      "Regulated by reputable financial authorities",
      "Competitive spreads starting from 0.6 pips",
      "Multiple trading platforms available",
      "Comprehensive educational resources",
      "Fast customer support"
    ],
    cons: [
      "Higher minimum deposit for premium accounts",
      "Limited stock CFD offerings",
      "Weekend support limited",
      broker.min_deposit && Number(broker.min_deposit) > 100 ? "Relatively high minimum deposit" : ""
    ].filter(Boolean)
  };

  // Generate samples reviews for demo purposes
  const generateSampleReviews = () => {
    const currentDate = new Date();

    return [
      {
        id: "1",
        user_name: "Michael S.",
        rating: 5,
        comment: `${broker.name} has been my go-to broker for the past 2 years. Their platform is stable and execution speed is excellent. I've had no issues with withdrawals and their customer service always responds quickly.`,
        created_at: new Date(currentDate.setDate(currentDate.getDate() - 5)).toISOString(),
        verified_purchase: true,
        helpful_count: 12,
        trading_experience: "Experienced Trader",
        pros: "Fast execution, reliable platform, quick withdrawals",
        cons: "Spreads widen during news events"
      },
      {
        id: "2",
        user_name: "Jennifer L.",
        rating: 4,
        comment: `I've been using ${broker.name} for 6 months now. Overall a good experience with helpful customer support. The only drawback is that sometimes the spreads widen during volatile market conditions.`,
        created_at: new Date(currentDate.setDate(currentDate.getDate() - 15)).toISOString(),
        verified_purchase: true,
        helpful_count: 8,
        trading_experience: "Intermediate Trader",
        pros: "User-friendly platform, good educational resources",
        cons: "Variable spreads can get wide"
      },
      {
        id: "3",
        user_name: "Robert T.",
        rating: 2,
        comment: `Disappointed with ${broker.name}'s customer service. Had to wait for days to get a response to my queries. The platform itself is okay, but customer support needs improvement.`,
        created_at: new Date(currentDate.setDate(currentDate.getDate() - 30)).toISOString(),
        verified_purchase: true,
        helpful_count: 5,
        trading_experience: "Novice Trader",
        pros: "Good trading platform, multiple instruments",
        cons: "Slow customer service, withdrawal delays"
      }
    ];
  };

  // Get legitimacy data
  const legitimacyData = getLegitimacyData(broker);

  // Get sample reviews
  const sampleReviews = generateSampleReviews();

  // Format current date for the review
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  // Generate broker description using our broker analysis tool
  const enhancedDescription = generateBrokerDescription(broker, year, month);

  // Create Context7 configuration for SEO optimization
  const context7Config: Context7Config = {
    title: `${broker.name} Review (${broker.rating || "N/A"}/5) | Best Trading Platform ${year}`,
    description: enhancedDescription.slice(0, 160),
    keywords: [
      `${broker.name}`,
      `${broker.name} review`,
      `${broker.name} forex broker`,
      `best trading platform ${year}`,
      `${broker.name} regulation`,
      `${broker.name} trading`,
      `forex broker review`,
      broker.regulations || `regulated forex broker`,
      broker.min_deposit ? `forex broker with ${broker.min_deposit} minimum deposit` : `low deposit forex broker`,
      broker.max_leverage || `high leverage forex broker`,
      `${month} ${year} broker review`
    ],
    openGraph: {
      title: `${broker.name} Review and Rating ${year} (${broker.rating || "N/A"}/5)`,
      description: enhancedDescription.slice(0, 200),
      images: [
        {
          url: broker.logo_url || `${process.env.NEXT_PUBLIC_APP_URL || 'https://brokeranalysis.com'}/images/brokers/default-broker.png`,
          width: 1200,
          height: 630,
          alt: `${broker.name} logo`,
        },
      ],
      siteName: "BrokerAnalysis",
      type: "website",
    },
    twitter: {
      cardType: "summary_large_image",
      title: `${broker.name} Broker Review ${year}`,
      description: enhancedDescription.slice(0, 200),
      image: broker.logo_url || `${process.env.NEXT_PUBLIC_APP_URL || 'https://brokeranalysis.com'}/images/brokers/default-broker.png`,
    },
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://brokeranalysis.com'}/broker/${broker.id}`,
    // Extract structured data without parsing
    structuredData: [
      // Broker review schema
      {
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: `${broker.name} Broker Review`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: broker.rating || '4.0',
          bestRating: '5',
          worstRating: '1'
        },
        author: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url
        },
        reviewBody: broker.description || `Our comprehensive review of ${broker.name}, covering trading conditions, platforms, and more.`,
        datePublished: new Date().toISOString().split('T')[0],
        itemReviewed: {
          '@type': 'FinancialService',
          name: broker.name,
          description: broker.description,
          image: broker.logo_url,
          url: broker.website_url || `https://yoursite.com/brokers/${broker.slug}`,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: broker.rating || '4.0',
            reviewCount: broker.reviews?.length || '10',
            bestRating: '5',
            worstRating: '1'
          }
        }
      },
      // FAQ Schema
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is ${broker.name} a regulated broker?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: broker.regulations
                ? `Yes, ${broker.name} is regulated by ${broker.regulations}.`
                : `Information about ${broker.name}'s regulation status is not fully verified.`
            }
          },
          {
            '@type': 'Question',
            name: `What is the minimum deposit for ${broker.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: broker.min_deposit
                ? `The minimum deposit for ${broker.name} is $${broker.min_deposit}.`
                : `The minimum deposit information for ${broker.name} is not currently specified.`
            }
          },
          {
            '@type': 'Question',
            name: `What trading platforms does ${broker.name} offer?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: broker.trading_platforms
                ? `${broker.name} offers ${broker.trading_platforms}.`
                : `${broker.name} provides various trading platforms to its clients.`
            }
          },
          {
            '@type': 'Question',
            name: `Is ${broker.name} good for beginners?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${broker.name} offers ${broker.min_deposit && Number(broker.min_deposit) <= 100 ? 'low minimum deposits' : 'various account types'} and ${broker.educational_resources ? 'educational resources' : 'trading tools'} that can be suitable for traders of different experience levels.`
            }
          }
        ]
      }
    ]
  };

  const pageContent = (
    <main className="container py-6 space-y-10">
      {/* Hero Section */}
      <HeroBrokerSection
        broker={broker}
        legitimacyData={legitimacyData}
      />

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trading-conditions">Trading Conditions</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="analysis">Strategy Analysis</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <BrokerOverviewSection
              broker={{...broker, description: enhancedDescription}}
              brokerAnalysis={brokerAnalysis}
              prosCons={prosCons}
            />
          </TabsContent>

          <TabsContent value="trading-conditions" className="mt-0">
            <TradingConditionsSection broker={broker} />
          </TabsContent>

          <TabsContent value="platforms" className="mt-0">
            <PlatformsSection broker={broker} />
          </TabsContent>

          <TabsContent value="education" className="mt-0">
            <EducationSection broker={broker} />
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            <BrokerAnalysisWidget
              broker={broker}
              userPreferences={{
                experienceLevel: "intermediate",
                tradingStyle: "day trading",
                accountSize: "medium",
                riskTolerance: "medium"
              }}
            />
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <ReviewsSection broker={broker} reviews={sampleReviews} />
          </TabsContent>

          <TabsContent value="risk-analysis" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BrokerLegitimacyScore broker={broker} />
              <BrokerRiskIndex broker={broker} />
            </div>
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold mb-1">Risk Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    This risk analysis is provided for informational purposes only and should not be considered as financial advice.
                    Trading forex and CFDs involves significant risk of capital loss. Always conduct your own research and consider your risk tolerance before trading.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-0">
            <BrokerComparisonWidgetWrapper
              primaryBroker={broker}
              comparisonBrokers={similarBrokers}
            />
          </TabsContent>

          <TabsContent value="faq" className="mt-0">
            <DynamicFAQSection
              broker={broker}
              additionalFaqs={[
                {
                  question: `Is ${broker.name} good for beginners?`,
                  answer: `Based on our analysis, ${broker.name} is ${
                    broker.min_deposit && Number(broker.min_deposit) <= 100 && broker.educational_resources
                      ? 'well-suited for beginners due to its low minimum deposit requirements and educational resources.'
                      : broker.min_deposit && Number(broker.min_deposit) <= 100
                        ? 'accessible to beginners due to its low minimum deposit requirements, though more educational content would be beneficial.'
                        : broker.educational_resources
                          ? 'partially suited for beginners thanks to its educational resources, though the higher minimum deposit may be a barrier for some.'
                          : 'better suited for traders with some experience, as it lacks comprehensive beginner resources and has higher entry requirements.'
                  }`
                },
                {
                  question: `What makes ${broker.name} different from other brokers?`,
                  answer: `${broker.name} distinguishes itself through ${
                    broker.regulations ? `its regulation by ${broker.regulations}, ` : ''
                  }${
                    broker.spreads_from ? (() => {
                      try {
                        const spreadValue = parseFloat(broker.spreads_from);
                        return !isNaN(spreadValue) && spreadValue <= 1.0 ? 'competitive spreads, ' : '';
                      } catch {
                        return '';
                      }
                    })() : ''
                  }${
                    broker.max_leverage ? `leverage options up to ${broker.max_leverage}, ` : ''
                  }${
                    broker.trading_platforms ? `and a variety of trading platforms including ${broker.trading_platforms}` : 'and its trading platform offerings'
                  }.`
                }
              ]}
            />
          </TabsContent>
        </Tabs>

        {/* Related Brokers Section */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Similar Brokers</h2>
          {similarBrokers && similarBrokers.length > 0 ? (
            <SimilarBrokersSectionWrapper
              brokers={similarBrokers}
              currentBroker={broker.name}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((relatedId) => (
                <Card key={relatedId} className="overflow-hidden flex flex-col">
                  <div className="border-b p-4 bg-card">
                    <div className="aspect-[3/1] relative rounded-md overflow-hidden mb-3 bg-muted flex items-center justify-center">
                      <Image
                        src={`https://placehold.co/300x100?text=Broker+${relatedId}`}
                        alt={`Broker ${relatedId}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-semibold mb-1">Similar Broker {relatedId}</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      {broker.regulations || "Regulated"}
                    </div>
                    <div className="flex space-x-2 text-sm">
                      <span className="border px-2 py-0.5 rounded-md">Min: $100</span>
                      <span className="border px-2 py-0.5 rounded-md">Leverage: 1:400</span>
                    </div>
                  </div>
                  <CardContent className="p-4 pt-3 flex-grow">
                    <div className="text-sm text-muted-foreground mb-4">
                      A similar broker offering comparable trading conditions and services.
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/broker/${relatedId}`}>
                        View Broker
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
  );

  // Wrap the page content with the client-side Context7Provider
  return (
    <BrokerDetailClientWrapper seoConfig={context7Config}>
      {pageContent}
    </BrokerDetailClientWrapper>
  );
}