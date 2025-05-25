import { supabaseBrokerClient } from "./supabase/broker-client";

/**
 * Get all broker IDs for static site generation
 * @returns Array of broker IDs
 */
export async function getAllBrokerIds() {
  try {
    // Check if client is available
    if (!supabaseBrokerClient) {
      console.warn('Supabase client not available for getAllBrokerIds, returning empty array');
      return [];
    }

    const { data, error } = await supabaseBrokerClient
      .from('brokers')
      .select('id')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching broker IDs:', error);
      return [];
    }

    return data?.map(broker => broker.id) || [];
  } catch (error) {
    console.error('Error in getAllBrokerIds:', error);
    return [];
  }
}

/**
 * Get all category slugs for static site generation
 * @returns Array of category slugs
 */
export async function getAllCategorySlugs() {
  // Hardcoded list of categories - replace with database query if you have a categories table
  const categories = [
    'forex',
    'stocks',
    'crypto',
    'options',
    'futures',
    'cfd',
    'etf',
    'bonds',
    'commodities',
    'beginners',
    'day-trading',
    'swing-trading'
  ];

  return categories;
}

/**
 * Generate broker comparison pairs for static site generation
 * Limits to top N brokers to avoid combinatorial explosion
 * @returns Array of comparison URL segments (e.g. ['broker1-vs-broker2'])
 */
export async function getBrokerComparisonPairs() {
  try {
    // Check if client is available
    if (!supabaseBrokerClient) {
      console.warn('Supabase client not available for getBrokerComparisonPairs, returning empty array');
      return [];
    }

    // Get top rated brokers to limit combinations
    const { data, error } = await supabaseBrokerClient
      .from('brokers')
      .select('id, name')
      .order('rating', { ascending: false })
      .limit(10); // Limit to top 10 brokers to avoid too many combinations

    if (error || !data) {
      console.error('Error fetching brokers for comparison pairs:', error);
      return [];
    }

    const comparisonPairs: string[] = [];

    // Generate all possible pairs (n choose 2)
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        // Create URL-friendly comparison string
        const broker1 = data[i].name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const broker2 = data[j].name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        comparisonPairs.push(`${broker1}-vs-${broker2}`);
      }
    }

    return comparisonPairs;
  } catch (error) {
    console.error('Error in getBrokerComparisonPairs:', error);
    return [];
  }
}

/**
 * Generate paths for all dynamic routes in the system for static site generation
 * @returns Object with paths for each route type
 */
export async function generateAllStaticPaths() {
  const brokerIds = await getAllBrokerIds();
  const categorySlugs = await getAllCategorySlugs();
  const comparisonPairs = await getBrokerComparisonPairs();

  return {
    brokerPaths: brokerIds.map(id => ({ params: { id } })),
    categoryPaths: categorySlugs.map(slug => ({ params: { slug } })),
    comparisonPaths: comparisonPairs.map(pair => ({ params: { brokers: [pair] } })),
  };
}