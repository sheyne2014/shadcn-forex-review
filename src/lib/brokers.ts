import { db } from "@/lib/database";

// Performance cache for broker data
const brokerCache = new Map<string, { data: any; timestamp: number; ttl: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Cache utilities
function getCachedData<T>(key: string): T | null {
  const cached = brokerCache.get(key);
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data;
  }
  brokerCache.delete(key);
  return null;
}

function setCachedData<T>(key: string, data: T, ttl: number = CACHE_TTL): void {
  brokerCache.set(key, { data, timestamp: Date.now(), ttl });
}

// This is a placeholder for the broker type. You might want to create a proper type file.
export interface BrokerDetails {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  min_deposit?: number | string;
  max_leverage?: string;
  regulations?: string;
  trading_platforms?: string;
  spreads_from?: string;
  account_types?: string | string[];
  overall_rating?: number;
  country?: string;
  established?: string;
  pros?: string[];
  cons?: string[];
  reviews?: BrokerReview[];
  faqs?: BrokerFAQ[];
  featured?: boolean;
  published_date?: string;
  last_updated?: string;
  educational_resources?: any; // Add educational_resources property

  // Additional properties needed for broker pages
  categories?: Array<{ name: string }>;
  trading_fee?: number;
  rating?: number;
  url?: string;

  // Allow any additional properties
  [key: string]: any;
}

export interface BrokerReview {
  id: string;
  broker_id: string;
  user_id: string;
  rating: number;
  title?: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
}

export interface BrokerFAQ {
  id: string;
  broker_id: string;
  question: string;
  answer: string;
}

// Enhanced mock function with eToro-specific data
export function getMockBroker(slug: string): BrokerDetails {
  // Check if this is eToro and return enhanced data
  if (slug === "805f65c5-3911-448e-8800-0143bbbb2a0f" || slug.toLowerCase().includes("etoro")) {
    return ({
      id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
      name: "eToro",
      slug: "etoro",
      description: "eToro revolutionizes forex trading through its pioneering social trading platform, allowing traders to copy successful investors and build diversified portfolios. Founded in 2007, eToro has grown to serve over 30 million users worldwide, making it one of the largest social trading networks globally.",
      logo_url: "/images/brokers/etoro.png",
      website_url: "https://www.etoro.com",
      min_deposit: 50,
      max_leverage: "1:30",
      regulations: "FCA, CySEC, ASIC",
      trading_platforms: "eToro Platform, eToro Mobile App",
      spreads_from: "1.0 pips",
      account_types: ["Standard", "Professional", "Islamic"],
      country: "Cyprus",
      established: "2007",
      overall_rating: 4.5,
      pros: [
        "Revolutionary social trading and copy trading features",
        "User-friendly platform perfect for beginners",
        "Extensive regulatory coverage (FCA, CySEC, ASIC)",
        "Zero commission stock trading",
        "Large community of 30+ million users",
        "Comprehensive educational resources",
        "Mobile-first platform design"
      ],
      cons: [
        "Higher forex spreads compared to ECN brokers",
        "Limited advanced charting tools for professional traders",
        "Withdrawal fees apply",
        "No MT4/MT5 platform support",
        "CFD-focused rather than traditional forex",
        "Limited scalping opportunities due to spread structure"
      ],
      summary: `eToro stands as a unique entity in the forex trading landscape, fundamentally different from traditional forex brokers. Rather than competing on spreads and leverage, eToro has carved out a dominant position in social trading, transforming how retail traders approach the markets.

Founded in 2007 in Tel Aviv and now headquartered in Cyprus, eToro has grown from a startup to a fintech giant serving over 30 million users across 140+ countries. The platform's core innovation lies in its social trading network, where users can follow, interact with, and automatically copy the trades of successful investors.

What sets eToro apart is its focus on democratizing trading through social features. The platform combines traditional trading with social networking elements, allowing users to see what others are trading, follow top performers, and even automatically replicate their strategies through the CopyTrader feature.

However, it's crucial to understand that eToro is not a traditional forex broker. The platform primarily offers CFDs (Contracts for Difference) rather than spot forex, and its spread structure reflects its retail-focused approach rather than institutional-grade pricing.`,
      reviews: [],
      faqs: [
        {
          id: "1",
          broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
          question: "What makes eToro different from other forex brokers?",
          answer: "eToro is primarily a social trading platform rather than a traditional forex broker. Its main differentiator is the ability to copy other traders' strategies automatically, access to a large community of traders, and a focus on user-friendly interfaces for beginners."
        },
        {
          id: "2",
          broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
          question: "Are eToro's spreads competitive for forex trading?",
          answer: "eToro's forex spreads start from 1.0 pips, which is higher than many ECN brokers. However, the platform's value lies in its social trading features rather than competitive spreads, making it more suitable for social traders than scalpers or high-frequency traders."
        },
        {
          id: "3",
          broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
          question: "Is eToro regulated and safe?",
          answer: "Yes, eToro is regulated by multiple top-tier authorities including FCA (UK), CySEC (Cyprus), and ASIC (Australia). Client funds are segregated and the platform offers negative balance protection."
        },
        {
          id: "4",
          broker_id: "805f65c5-3911-448e-8800-0143bbbb2a0f",
          question: "Can I use MT4 or MT5 with eToro?",
          answer: "No, eToro does not support MetaTrader platforms. The broker uses its proprietary eToro platform and mobile app, which are designed specifically for social trading features."
        }
      ],
      featured: true,
      published_date: "2023-01-01",
      last_updated: "2024-01-15",
      // Additional eToro-specific fields
      unique_features: "Social Trading Network, CopyTrader, Popular Investor Program, CopyPortfolios, Social Feed",
      instruments: "Forex, Stocks, ETFs, Cryptocurrencies, Commodities, Indices",
      trading_tools: "Social Trading Feed, CopyTrader, Popular Investor Rankings, Risk Score, Portfolio Diversification Tools",
      support_channels: "Email, Live Chat, Help Center, Community Forum",
      support_hours: "24/7 via Help Center, Live Chat during business hours",
      support_languages: "English, Spanish, German, French, Italian, Russian, Chinese, and 15+ more",
      headquarters: "Limassol, Cyprus",
      year_founded: "2007"
    } as BrokerDetails);
  }

  // Default mock broker for other slugs
  return ({
    id: "1",
    name: "Example Broker",
    slug: slug,
    description: "This is an example broker description.",
    logo_url: "/images/broker-logo.svg",
    website_url: "https://example.com",
    min_deposit: 100,
    max_leverage: "1:500",
    regulations: "FCA, CySEC",
    trading_platforms: "MT4, MT5",
    spreads_from: "0.6 pips",
    account_types: ["Standard", "Professional", "VIP"],
    country: "United Kingdom",
    established: "2010",
    overall_rating: 4.5,
    pros: ["Low minimum deposit", "High leverage available", "Multiple platforms"],
    cons: ["Limited educational resources", "Higher spreads than some competitors"],
    reviews: [],
    faqs: [
      {
        id: "1",
        broker_id: "1",
        question: "What is the minimum deposit?",
        answer: "The minimum deposit is $100."
      },
      {
        id: "2",
        broker_id: "1",
        question: "Is this broker regulated?",
        answer: "Yes, this broker is regulated by FCA and CySEC."
      }
    ],
    featured: true,
    published_date: "2023-01-01",
    last_updated: "2023-08-15",
  } as BrokerDetails);
}

/**
 * Get a broker by its slug
 *
 * @param slug - The broker's slug/URL identifier
 * @returns The broker object or null if not found
 */
export async function getBrokerBySlug(slug: string): Promise<BrokerDetails | null> {
  try {
    // Check cache first
    const cacheKey = `broker_slug_${slug}`;
    const cachedBroker = getCachedData<BrokerDetails>(cacheKey);
    if (cachedBroker) {
      return cachedBroker;
    }

    // Try to get broker from database first
    const allBrokers = await db.brokers.getAll();

    // Convert slug to potential broker name variations
    const slugVariations = [
      slug,
      slug.replace(/-/g, ' '),
      slug.replace(/-/g, ''),
      slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''),
    ];

    // Try to find a matching broker by name
    let matchedBroker: any = null;
    for (const variation of slugVariations) {
      matchedBroker = allBrokers.find((broker: any) =>
        broker.name.toLowerCase() === variation.toLowerCase() ||
        broker.name.toLowerCase().includes(variation.toLowerCase()) ||
        variation.toLowerCase().includes(broker.name.toLowerCase())
      );
      if (matchedBroker) break;
    }

    if (matchedBroker) {
      // Convert database broker to BrokerDetails format
      const brokerDetails = {
        id: matchedBroker.id,
        name: matchedBroker.name,
        slug: slug,
        description: `${matchedBroker.name} is a forex broker offering trading services. This review analyzes their platforms, trading conditions, fees, and overall quality.`,
        logo_url: matchedBroker.logo_url || "/images/broker-logo.svg",
        website_url: `https://${matchedBroker.name.toLowerCase().replace(/\s+/g, '')}.com`,
        min_deposit: matchedBroker.min_deposit || 100,
        max_leverage: "1:500",
        regulations: matchedBroker.regulations || "Various",
        trading_platforms: "MT4, MT5, WebTrader",
        spreads_from: "0.6 pips",
        account_types: ["Standard", "Professional", "VIP"],
        overall_rating: matchedBroker.rating || 4.0,
        country: matchedBroker.country || "Not specified",
        established: "2010",
        pros: ["Low minimum deposit", "Multiple platforms", "Good regulation"],
        cons: ["Limited educational resources", "Higher spreads than some competitors"],
        reviews: [],
        faqs: [
          {
            id: "1",
            broker_id: matchedBroker.id,
            question: "What is the minimum deposit?",
            answer: `The minimum deposit is $${matchedBroker.min_deposit || 100}.`
          },
          {
            id: "2",
            broker_id: matchedBroker.id,
            question: "Is this broker regulated?",
            answer: `Yes, this broker is regulated by ${matchedBroker.regulations || 'various regulatory bodies'}.`
          }
        ],
        featured: true,
        published_date: "2023-01-01",
        last_updated: "2023-08-15",
        supported_assets: matchedBroker.supported_assets || ["Forex", "Stocks", "Commodities"],
        trading_fee: matchedBroker.trading_fee || 0.1,
        rating: matchedBroker.rating || 4.0,
        demo_account: true,
        research_reports: true,
        trading_ideas: true,
        news_feed: true,
        video_tutorials: true,
        trading_courses: true,
        webinars: true,
        spread_from: "0.6 pips",
        year_founded: 2010
      } as BrokerDetails;

      // Cache the result
      setCachedData(cacheKey, brokerDetails);
      return brokerDetails;
    }

    // If no broker found in database, fall back to mock data
    console.log(`Broker not found in database for slug: ${slug}, using mock data`);
    return getMockBroker(slug);
  } catch (error) {
    console.error("Error fetching broker by slug:", error);
    // Fall back to mock data on error
    return getMockBroker(slug);
  }
}

/**
 * Get similar brokers based on a broker ID
 *
 * @param brokerId - The broker ID to find similar brokers for
 * @param limit - Number of similar brokers to return (default: 3)
 * @returns Array of similar brokers or empty array if none found
 */
export async function getSimilarBrokers(_brokerId: string, _limit = 3): Promise<BrokerDetails[]> {
  try {
    // For now, return mock data
    return [
      {
        id: "2",
        name: "Similar Broker 1",
        slug: "similar-broker-1",
        logo_url: "/images/broker-logo.svg",
        min_deposit: 200,
        max_leverage: "1:400",
        regulations: "ASIC",
        overall_rating: 4.2,
        spreads_from: "0.8 pips",
      } as BrokerDetails,
      {
        id: "3",
        name: "Similar Broker 2",
        slug: "similar-broker-2",
        logo_url: "/images/broker-logo.svg",
        min_deposit: 50,
        max_leverage: "1:500",
        regulations: "FCA",
        overall_rating: 4.0,
        spreads_from: "1.0 pips",
      } as BrokerDetails
    ];

    /*
    // Uncomment this when database is ready
    // Get the current broker to determine similarity criteria
    const currentBroker = await db.broker.findUnique({
      where: {
        id: brokerId
      },
      select: {
        id: true,
        min_deposit: true,
        max_leverage: true,
        regulations: true,
        trading_platforms: true,
        account_types: true,
        spreads_from: true
      }
    });

    if (!currentBroker) {
      return [];
    }

    // Find similar brokers based on criteria
    const similarBrokers = await db.broker.findMany({
      where: {
        id: {
          not: brokerId  // Exclude current broker
        },
        // OR conditions for different similarity criteria
        OR: [
          // Similar min deposit
          currentBroker.min_deposit ? {
            min_deposit: {
              gte: Number(currentBroker.min_deposit) * 0.5,
              lte: Number(currentBroker.min_deposit) * 1.5
            }
          } : {},

          // Similar regulations
          currentBroker.regulations ? {
            regulations: {
              contains: currentBroker.regulations
            }
          } : {},

          // Similar platforms
          currentBroker.trading_platforms ? {
            trading_platforms: {
              contains: currentBroker.trading_platforms
            }
          } : {},

          // Similar account types
          currentBroker.account_types ? {
            account_types: {
              contains: currentBroker.account_types
            }
          } : {}
        ]
      },
      select: {
        id: true,
        name: true,
        slug: true,
        logo_url: true,
        min_deposit: true,
        max_leverage: true,
        regulations: true,
        overall_rating: true,
        spreads_from: true
      },
      take: limit,
      orderBy: {
        overall_rating: 'desc'
      }
    });

    return similarBrokers;
    */
  } catch (error) {
    console.error("Error fetching similar brokers:", error);
    return [];
  }
}

/**
 * Get all brokers with pagination
 *
 * @param page - Page number (default: 1)
 * @param limit - Number of brokers per page (default: 10)
 * @returns Object with brokers array and pagination data
 */
export async function getAllBrokers(page = 1, limit = 10) {
  try {
    // For now, return mock data
    const brokers: BrokerDetails[] = [getMockBroker("example-broker")];

    return {
      brokers,
      pagination: {
        page,
        limit,
        totalPages: 1,
        totalCount: 1,
        hasNextPage: false,
        hasPreviousPage: false
      }
    };

    /*
    // Uncomment this when database is ready
    const skip = (page - 1) * limit;

    // Get brokers with pagination
    const brokers = await db.broker.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        logo_url: true,
        min_deposit: true,
        max_leverage: true,
        regulations: true,
        overall_rating: true,
        spreads_from: true,
        trading_platforms: true,
        country: true
      },
      skip,
      take: limit,
      orderBy: [
        { featured: 'desc' },
        { overall_rating: 'desc' }
      ]
    });

    // Get total count for pagination
    const totalCount = await db.broker.count();
    const totalPages = Math.ceil(totalCount / limit);

    return {
      brokers,
      pagination: {
        page,
        limit,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
    */
  } catch (error) {
    console.error("Error fetching all brokers:", error);
    return {
      brokers: [],
      pagination: {
        page,
        limit,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false
      }
    };
  }
}

/**
 * Get featured brokers
 *
 * @param limit - Number of featured brokers to return (default: 5)
 * @returns Array of featured brokers or empty array if none found
 */
export async function getFeaturedBrokers(_limit = 5): Promise<BrokerDetails[]> {
  try {
    // For now, return mock data
    return [getMockBroker("example-broker")];

    /*
    // Uncomment this when database is ready
    // Get featured brokers
    const featuredBrokers = await db.broker.findMany({
      where: {
        featured: true
      },
      select: {
        id: true,
        name: true,
        slug: true,
        logo_url: true,
        min_deposit: true,
        max_leverage: true,
        regulations: true,
        overall_rating: true,
        spreads_from: true,
        trading_platforms: true,
        description: true
      },
      take: limit,
      orderBy: {
        overall_rating: 'desc'
      }
    });

    return featuredBrokers;
    */
  } catch (error) {
    console.error("Error fetching featured brokers:", error);
    return [];
  }
}