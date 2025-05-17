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
  const searchQuery = searchTerms.map(term => {
    return `
      title.ilike.%${term}%,
      content.ilike.%${term}%,
      excerpt.ilike.%${term}%,
      tags.ilike.%${term}%
    `;
  }).join(",");

  const { data, error } = await supabaseRokuClient
    .from('blog_posts')
    .select('id, url, title, content, excerpt, tags, published_at')
    .or(searchQuery)
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
  const searchQuery = searchTerms.map(term => {
    return `
      title.ilike.%${term}%,
      content.ilike.%${term}%,
      meta_description.ilike.%${term}%
    `;
  }).join(",");

  const { data, error } = await supabaseRokuClient
    .from('pages')
    .select('id, url, title, content, meta_description, last_updated')
    .or(searchQuery)
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

  // Create a more comprehensive search query
  const searchQuery = searchTerms.map(term => {
    return `
      name.ilike.%${term}%,
      description.ilike.%${term}%,
      features.ilike.%${term}%,
      pros.ilike.%${term}%,
      cons.ilike.%${term}%
    `;
  }).join(",");

  const { data, error } = await supabaseRokuClient
    .from('brokers')
    .select('id, url, name, description, features, pros, cons, rating')
    .or(searchQuery)
    .order('rating', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error searching brokers:", error);
    return [];
  }

  return data || [];
}

// Helper function to search for tools and resources
export async function searchTools(searchTerms: string[]) {
  if (!searchTerms.length) return [];

  // Create a search query for tools
  const searchQuery = searchTerms.map(term => {
    return `
      name.ilike.%${term}%,
      description.ilike.%${term}%,
      category.ilike.%${term}%
    `;
  }).join(",");

  const { data, error } = await supabaseRokuClient
    .from('tools')
    .select('id, url, name, description, category')
    .or(searchQuery)
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
  const searchQuery = searchTerms.map(term => {
    return `
      question.ilike.%${term}%,
      answer.ilike.%${term}%,
      category.ilike.%${term}%
    `;
  }).join(",");

  const { data, error } = await supabaseRokuClient
    .from('faqs')
    .select('id, question, answer, category')
    .or(searchQuery)
    .limit(3);

  if (error) {
    console.error("Error searching FAQs:", error);
    return [];
  }

  return data || [];
}