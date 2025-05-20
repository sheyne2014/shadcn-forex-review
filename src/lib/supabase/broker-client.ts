import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/env";

// Check if we're in a build/SSG context where env vars might be missing
const hasSupabaseConfig = Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Create a safer client initialization that checks for environment variables
export const supabaseBrokerClient = hasSupabaseConfig
  ? createSupabaseClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  : null;

export interface Broker {
  id: string;
  name: string;
  logo_url?: string;
  min_deposit?: number;
  trading_fee?: number;
  regulations?: string;
  supported_assets?: string[];
  country?: string;
  rating?: number;
  description?: string;
  url?: string;
  created_at?: string;
}

export interface BrokerCategory {
  id: string;
  name: string;
}

export interface BrokerReview {
  id: string;
  broker_id: string;
  user_id?: string;
  rating: number;
  comment?: string;
  created_at: string;
  user_name?: string; // May be joined from users table
}

// Get all brokers with optional filtering and sorting
export async function getBrokers({
  limit = 10,
  page = 1,
  category_id,
  country,
  min_rating,
  sort_by = "rating",
  sort_order = "desc"
}: {
  limit?: number;
  page?: number;
  category_id?: string;
  country?: string;
  min_rating?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
} = {}) {
  try {
    // Check if client is available
    if (!supabaseBrokerClient) {
      console.error("Supabase client not initialized. Missing environment variables.");
      return { data: [], error: new Error("Database client not available") };
    }

    let query = supabaseBrokerClient
      .from('brokers')
      .select('*')
      .order(sort_by, { ascending: sort_order === 'asc' })
      .range((page - 1) * limit, page * limit - 1);

    // Apply filters if provided
    if (min_rating) {
      query = query.gte('rating', min_rating);
    }

    if (country) {
      query = query.eq('country', country);
    }

    // If category_id is provided, we need to join with broker_categories
    if (category_id) {
      // First get broker_ids in the category
      const { data: brokerCategories, error: categoryError } = await supabaseBrokerClient
        .from('broker_categories')
        .select('broker_id')
        .eq('category_id', category_id);

      if (categoryError) {
        console.error("Error fetching broker categories:", categoryError);
        return { data: [], error: categoryError };
      }

      // Extract broker_ids and use them in the main query
      const brokerIds = brokerCategories?.map(bc => bc.broker_id) || [];
      if (brokerIds.length > 0) {
        query = query.in('id', brokerIds);
      } else {
        // No brokers in this category
        return { data: [], error: null };
      }
    }

    const { data, error, count } = await query;

    return { data, error, count };
  } catch (error) {
    console.error("Error getting brokers:", error);
    return { data: [], error };
  }
}

// Get a single broker by ID with reviews
export async function getBrokerById(id: string) {
  try {
    if (!supabaseBrokerClient) {
      console.error("Supabase client not initialized. Missing environment variables.");
      return { data: null, error: new Error("Database client not available") };
    }

    // Get the broker details
    const { data: broker, error: brokerError } = await supabaseBrokerClient
      .from('brokers')
      .select('*')
      .eq('id', id)
      .single();

    if (brokerError) {
      console.error("Error fetching broker:", brokerError);
      return { data: null, error: brokerError };
    }

    // Get categories for the broker
    const { data: brokerCategories, error: categoriesError } = await supabaseBrokerClient
      .from('broker_categories')
      .select('categories(id, name)')
      .eq('broker_id', id);

    if (categoriesError) {
      console.error("Error fetching broker categories:", categoriesError);
      // Continue anyway, just without categories
    }

    // Get reviews for the broker
    const { data: reviews, error: reviewsError } = await supabaseBrokerClient
      .from('reviews')
      .select('*, users(id, email)')
      .eq('broker_id', id)
      .order('created_at', { ascending: false });

    if (reviewsError) {
      console.error("Error fetching broker reviews:", reviewsError);
      // Continue anyway, just without reviews
    }

    // Format reviews to include user name
    const formattedReviews = reviews?.map(review => ({
      ...review,
      user_name: review.users?.email?.split('@')[0] || 'Anonymous'
    })) || [];

    // Extract categories
    const categories = brokerCategories?.map(bc => bc.categories) || [];

    return { 
      data: { 
        ...broker, 
        categories, 
        reviews: formattedReviews 
      }, 
      error: null 
    };
  } catch (error) {
    console.error("Error getting broker by ID:", error);
    return { data: null, error };
  }
}

// Get all broker categories
export async function getBrokerCategories() {
  try {
    if (!supabaseBrokerClient) {
      console.error("Supabase client not initialized. Missing environment variables.");
      return { data: [], error: new Error("Database client not available") };
    }

    const { data, error } = await supabaseBrokerClient
      .from('categories')
      .select('*')
      .order('name');

    return { data, error };
  } catch (error) {
    console.error("Error getting broker categories:", error);
    return { data: [], error };
  }
}

// Get top rated brokers
export async function getTopRatedBrokers(limit = 5) {
  try {
    if (!supabaseBrokerClient) {
      console.error("Supabase client not initialized. Missing environment variables.");
      return { data: [], error: new Error("Database client not available") };
    }

    const { data, error } = await supabaseBrokerClient
      .from('brokers')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit);

    return { data, error };
  } catch (error) {
    console.error("Error getting top rated brokers:", error);
    return { data: [], error };
  }
}

// Get brokers by category
export async function getBrokersByCategory(categoryIdOrSlug: string, limit = 10) {
  try {
    if (!supabaseBrokerClient) {
      console.error("Supabase client not initialized. Missing environment variables.");
      return { data: [], error: new Error("Database client not available") };
    }

    // Check if the parameter is a UUID (category ID) or a slug
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryIdOrSlug);
    
    if (isUuid) {
      // First get broker_ids in the category by ID
      const { data: brokerCategories, error: categoryError } = await supabaseBrokerClient
        .from('broker_categories')
        .select('broker_id')
        .eq('category_id', categoryIdOrSlug);

      if (categoryError) {
        console.error("Error fetching broker categories:", categoryError);
        return { data: [], error: categoryError };
      }

      // Extract broker_ids and get broker details
      const brokerIds = brokerCategories?.map(bc => bc.broker_id) || [];
      
      if (brokerIds.length === 0) {
        return { data: [], error: null };
      }

      const { data, error } = await supabaseBrokerClient
        .from('brokers')
        .select('*')
        .in('id', brokerIds)
        .order('rating', { ascending: false })
        .limit(limit);

      return { data, error };
    } else {
      // Handle category as a slug/string - search in categories or tags fields
      let query = supabaseBrokerClient
        .from('brokers')
        .select('*')
        .order('rating', { ascending: false });
      
      // Filter by category slug in categories or tags arrays
      query = query.or(`categories.cs.{${categoryIdOrSlug}},tags.cs.{${categoryIdOrSlug}}`);
      
      if (limit > 0) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      return { data, error };
    }
  } catch (error) {
    console.error("Error getting brokers by category:", error);
    return { data: [], error };
  }
} 