import { db } from "@/lib/db";

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

// Temporary mock function - remove when actual database implementation is complete
export function getMockBroker(slug: string): BrokerDetails {
  return ({
    id: "1",
    name: "Example Broker",
    slug: slug,
    description: "This is an example broker description.",
    logo_url: "/images/broker-logo.png",
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
    // For now, use the mock broker until database is connected
    return getMockBroker(slug);

    /*
    // Uncomment this when database is ready
    // Get broker from database
    const broker = await db.broker.findFirst({
      where: {
        slug: slug
      },
      include: {
        faqs: true,
        pros_cons: true,
        reviews: {
          take: 5,  // Only take 5 most recent reviews for preview
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    });

    // If broker not found, return null
    if (!broker) {
      console.log(`Broker not found for slug: ${slug}`);
      return null;
    }

    // If pros_cons relation exists, format pros and cons arrays
    let pros: string[] = [];
    let cons: string[] = [];

    if (broker.pros_cons) {
      pros = broker.pros_cons.pros ?
        (Array.isArray(broker.pros_cons.pros) ?
          broker.pros_cons.pros :
          JSON.parse(broker.pros_cons.pros as unknown as string)) :
        [];

      cons = broker.pros_cons.cons ?
        (Array.isArray(broker.pros_cons.cons) ?
          broker.pros_cons.cons :
          JSON.parse(broker.pros_cons.cons as unknown as string)) :
        [];
    }

    // Calculate overall rating from reviews if available
    let overall_rating = broker.overall_rating || 0;

    if (broker.reviews && broker.reviews.length > 0) {
      const totalRating = broker.reviews.reduce((sum: number, review: BrokerReview) => sum + (review.rating || 0), 0);
      const avgRating = totalRating / broker.reviews.length;

      // If there's no preset overall_rating, use the calculated one
      if (!broker.overall_rating) {
        overall_rating = parseFloat(avgRating.toFixed(1));
      }
    }

    // Return broker with calculated fields
    return {
      ...broker,
      pros,
      cons,
      overall_rating,
      // Ensure we have a description
      description: broker.description || `${broker.name} is a forex broker offering trading services. This review analyzes their platforms, trading conditions, fees, and overall quality.`
    };
    */
  } catch (error) {
    console.error("Error fetching broker by slug:", error);
    return null;
  }
}

/**
 * Get similar brokers based on a broker ID
 *
 * @param brokerId - The broker ID to find similar brokers for
 * @param limit - Number of similar brokers to return (default: 3)
 * @returns Array of similar brokers or empty array if none found
 */
export async function getSimilarBrokers(brokerId: string, limit = 3): Promise<BrokerDetails[]> {
  try {
    // For now, return mock data
    return [
      {
        id: "2",
        name: "Similar Broker 1",
        slug: "similar-broker-1",
        logo_url: "/images/broker-logo.png",
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
        logo_url: "/images/broker-logo.png",
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
export async function getFeaturedBrokers(limit = 5): Promise<BrokerDetails[]> {
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