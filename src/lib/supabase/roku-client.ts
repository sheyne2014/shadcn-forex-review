import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/env";

export const supabaseRokuClient = createSupabaseClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper function to search for blog posts
export async function searchBlogPosts(searchTerms: string[]) {
  if (!searchTerms.length) return [];

  // Create a more comprehensive search query
  const searchConditions = searchTerms.flatMap(term => [
    `title.ilike.%${term}%`,
    `content.ilike.%${term}%`,
    `excerpt.ilike.%${term}%`,
    `tags.ilike.%${term}%`
  ]);

  const { data, error } = await supabaseRokuClient
    .from('blog_posts')
    .select('id, url, title, content, excerpt, tags, published_at')
    .or(searchConditions.join(','))
    .order('published_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error searching blog posts:", error);
    return [];
  }

  return data || [];
}

// Helper function to search for pages
export async function searchPages(searchTerms: string[]) {
  if (!searchTerms.length) return [];

  // Create a more comprehensive search query
  const searchConditions = searchTerms.flatMap(term => [
    `title.ilike.%${term}%`,
    `content.ilike.%${term}%`,
    `meta_description.ilike.%${term}%`
  ]);

  const { data, error } = await supabaseRokuClient
    .from('pages')
    .select('id, url, title, content, meta_description, last_updated')
    .or(searchConditions.join(','))
    .order('last_updated', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error searching pages:", error);
    return [];
  }

  return data || [];
}

// Helper function to search for brokers
export async function searchBrokers(searchTerms: string[]) {
  if (!searchTerms.length) return [];

  try {
    // Create a search query using only fields that exist in the brokers table
    // Fix the query format - remove extra whitespace and newlines
    const searchConditions = searchTerms.flatMap(term => [
      `name.ilike.%${term}%`,
      `country.ilike.%${term}%`,
      `regulations.ilike.%${term}%`
    ]);

    const { data, error } = await supabaseRokuClient
      .from('brokers')
      .select('id, name, country, regulations, min_deposit, trading_fee, logo_url, rating, supported_assets, url')
      .or(searchConditions.join(','))
      .order('rating', { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error searching brokers:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Exception searching brokers:", error);
    return [];
  }
}

// Helper function to search for tools and resources
export async function searchTools(searchTerms: string[]) {
  if (!searchTerms.length) return [];

  // Create a search query for tools
  const searchConditions = searchTerms.flatMap(term => [
    `name.ilike.%${term}%`,
    `description.ilike.%${term}%`,
    `category.ilike.%${term}%`
  ]);

  const { data, error } = await supabaseRokuClient
    .from('tools')
    .select('id, url, name, description, category')
    .or(searchConditions.join(','))
    .limit(3);

  if (error) {
    console.error("Error searching tools:", error);
    return [];
  }

  return data || [];
}

// Helper function to search for FAQs
export async function searchFAQs(searchTerms: string[]) {
  if (!searchTerms.length) return [];

  // Create a search query for FAQs
  const searchConditions = searchTerms.flatMap(term => [
    `question.ilike.%${term}%`,
    `answer.ilike.%${term}%`,
    `category.ilike.%${term}%`
  ]);

  const { data, error } = await supabaseRokuClient
    .from('faqs')
    .select('id, question, answer, category')
    .or(searchConditions.join(','))
    .limit(3);

  if (error) {
    console.error("Error searching FAQs:", error);
    return [];
  }

  return data || [];
}