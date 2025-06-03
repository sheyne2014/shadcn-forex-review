import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/env";

export const supabaseBlogClient = createSupabaseClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  slug?: string;
  excerpt?: string;
  published_at?: string;
  author_id?: string;
  image_url?: string;
  reading_time?: number;
  tags?: string[] | string;
  category_id?: string;
  featured?: boolean;
  views?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

// Get all blog posts without any filtering
export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error("Error fetching all blog posts:", error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    return { data: [], error };
  }
}

// Get all blog posts with optional filtering and sorting
export async function getBlogPosts({
  limit = 10,
  page = 1,
  category_id,
  sort_by = "published_at",
  sort_order = "desc",
  tag,
  search
}: {
  limit?: number;
  page?: number;
  category_id?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  tag?: string;
  search?: string;
} = {}) {
  try {
    let query = supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .order(sort_by, { ascending: sort_order === 'asc' })
      .range((page - 1) * limit, page * limit - 1);

    // Apply filters if provided
    if (category_id) {
      query = query.eq('category_id', category_id);
    }
    
    if (tag) {
      query = query.contains('tags', [tag]);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    return { data, error, count };
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return { data: [], error };
  }
}

// Get a single blog post by slug or ID
export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error("Error fetching blog post by slug:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error getting blog post by slug:", error);
    return { data: null, error };
  }
}

export async function getBlogPostById(id: string) {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching blog post by ID:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error getting blog post by ID:", error);
    return { data: null, error };
  }
}

// Get all blog categories
export async function getBlogCategories() {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_categories')
      .select('*')
      .order('name');

    return { data, error };
  } catch (error) {
    console.error("Error getting blog categories:", error);
    return { data: [], error };
  }
}

// Get latest blog posts
export async function getLatestBlogPosts(limit = 5) {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);

    return { data, error };
  } catch (error) {
    console.error("Error getting latest blog posts:", error);
    return { data: [], error };
  }
}

// Get featured blog posts (those with a featured flag)
export async function getFeaturedBlogPosts(limit = 3) {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    return { data, error };
  } catch (error) {
    console.error("Error getting featured blog posts:", error);
    return { data: [], error };
  }
}

// Get blog posts by category
export async function getBlogPostsByCategory(categoryId: string, limit = 10) {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .eq('category_id', categoryId)
      .order('published_at', { ascending: false })
      .limit(limit);

    return { data, error };
  } catch (error) {
    console.error("Error getting blog posts by category:", error);
    return { data: [], error };
  }
}

// Get popular blog posts (based on views or another metric if available)
export async function getPopularBlogPosts(limit = 5) {
  try {
    const { data, error } = await supabaseBlogClient
      .from('blog_posts')
      .select('*')
      .order('views', { ascending: false })
      .limit(limit);

    return { data, error };
  } catch (error) {
    console.error("Error getting popular blog posts:", error);
    return { data: [], error };
  }
} 