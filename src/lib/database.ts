import { createClient } from '@/lib/supabase/client';
import {
  Broker, BrokerInsert, BrokerUpdate,
  Category, CategoryInsert,
  Review, ReviewInsert,
  BlogPost, BlogPostInsert
} from './database-types';
import { withCache, cacheKeys, cacheTTL } from './cache';

/**
 * Database service for interacting with Supabase
 */
export const db = {
  /**
   * Brokers
   */
  brokers: {
    // Get all brokers
    getAll: async (): Promise<Broker[]> => {
      return withCache(
        cacheKeys.brokers.all(),
        async () => {
          try {
            const client = createClient();
            const { data, error } = await Promise.race([
              client
                .from('brokers')
                .select('*')
                .order('rating', { ascending: false }),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Database query timeout')), 10000)
              )
            ]) as any;

            if (error) {
              console.warn('Database error in getAll brokers:', error);
              return [];
            }
            return data || [];
          } catch (error) {
            console.warn('Failed to fetch brokers:', error);
            return [];
          }
        },
        cacheTTL.medium
      );
    },

    // Get broker by ID
    getById: async (id: string): Promise<Broker | null> => {
      const client = createClient();
      const { data, error } = await client
        .from('brokers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned" error
      return data;
    },

    // Get brokers by category
    getByCategory: async (categoryId: string): Promise<Broker[]> => {
      try {
        const client = createClient();

        // First get broker IDs from the junction table with timeout
        const junctionPromise = client
          .from('broker_categories')
          .select('broker_id')
          .eq('category_id', categoryId);

        const { data: brokerJunction, error: junctionError } = await Promise.race([
          junctionPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Junction query timeout')), 8000)
          )
        ]) as any;

        if (junctionError) {
          console.warn('Junction table error:', junctionError);
          return [];
        }
        if (!brokerJunction || brokerJunction.length === 0) return [];

        // Then get the actual broker data with timeout
        const brokerIds = brokerJunction.map((item: { broker_id: string }) => item.broker_id);
        const brokersPromise = client
          .from('brokers')
          .select('*')
          .in('id', brokerIds)
          .order('rating', { ascending: false });

        const { data, error } = await Promise.race([
          brokersPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Brokers query timeout')), 8000)
          )
        ]) as any;

        if (error) {
          console.warn('Brokers query error:', error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.warn('Failed to fetch brokers by category:', error);
        return [];
      }
    },

    // Create a new broker
    create: async (broker: BrokerInsert): Promise<Broker> => {
      const client = createClient();
      const { data, error } = await client
        .from('brokers')
        .insert(broker)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    // Update a broker
    update: async (id: string, broker: BrokerUpdate): Promise<Broker> => {
      const client = createClient();
      const { data, error } = await client
        .from('brokers')
        .update(broker)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    // Delete a broker
    delete: async (id: string): Promise<void> => {
      const client = createClient();
      const { error } = await client
        .from('brokers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },

    // Create or update a broker by name
    createOrUpdate: async (broker: BrokerInsert): Promise<Broker> => {
      const client = createClient();
      // Check if broker already exists with similar name
      const { data: existingBrokers } = await client
        .from('brokers')
        .select('*')
        .ilike('name', `%${broker.name}%`);
        
      if (existingBrokers && existingBrokers.length > 0) {
        // Update existing broker
        const existingBroker = existingBrokers[0];
        const { data, error } = await client
          .from('brokers')
          .update(broker)
          .eq('id', existingBroker.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new broker
        const { data, error } = await client
          .from('brokers')
          .insert(broker)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    }
  },

  /**
   * Categories
   */
  categories: {
    // Get all categories
    getAll: async (): Promise<Category[]> => {
      return withCache(
        cacheKeys.categories.all(),
        async () => {
          try {
            const client = createClient();
            const { data, error } = await Promise.race([
              client
                .from('categories')
                .select('*')
                .order('name'),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Categories query timeout')), 8000)
              )
            ]) as any;

            if (error) {
              console.warn('Categories query error:', error);
              return [];
            }
            return data || [];
          } catch (error) {
            console.warn('Failed to fetch categories:', error);
            return [];
          }
        },
        cacheTTL.long
      );
    },

    // Get category by ID
    getById: async (id: string): Promise<Category | null> => {
      const client = createClient();
      const { data, error } = await client
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },

    // Create a new category
    create: async (category: CategoryInsert): Promise<Category> => {
      const client = createClient();
      const { data, error } = await client
        .from('categories')
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  /**
   * Broker Categories
   */
  brokerCategories: {
    // Add a broker to a category
    add: async (brokerId: string, categoryId: string): Promise<void> => {
      const client = createClient();
      const { error } = await client
        .from('broker_categories')
        .insert({ broker_id: brokerId, category_id: categoryId });
      
      if (error) throw error;
    },

    // Remove a broker from a category
    remove: async (brokerId: string, categoryId: string): Promise<void> => {
      const client = createClient();
      const { error } = await client
        .from('broker_categories')
        .delete()
        .eq('broker_id', brokerId)
        .eq('category_id', categoryId);
      
      if (error) throw error;
    },

    // Get all categories for a broker
    getCategoriesForBroker: async (brokerId: string): Promise<Category[]> => {
      const client = createClient();
      // First get category IDs from the junction table
      const { data: categoryJunction, error: junctionError } = await client
        .from('broker_categories')
        .select('category_id')
        .eq('broker_id', brokerId);
      
      if (junctionError) throw junctionError;
      if (!categoryJunction || categoryJunction.length === 0) return [];
      
      // Then get the actual category data
      const categoryIds = categoryJunction.map((item: { category_id: string }) => item.category_id);
      const { data, error } = await client
        .from('categories')
        .select('*')
        .in('id', categoryIds);
      
      if (error) throw error;
      return data || [];
    },

    // Get all brokers for a category
    getBrokersForCategory: async (categoryId: string): Promise<Broker[]> => {
      return db.brokers.getByCategory(categoryId);
    }
  },

  /**
   * Reviews
   */
  reviews: {
    // Get reviews for a broker
    getForBroker: async (brokerId: string): Promise<Review[]> => {
      const client = createClient();
      const { data, error } = await client
        .from('reviews')
        .select('*')
        .eq('broker_id', brokerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },

    // Get reviews by user
    getByUser: async (userId: string): Promise<Review[]> => {
      const client = createClient();
      const { data, error } = await client
        .from('reviews')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },

    // Create a review
    create: async (review: ReviewInsert): Promise<Review> => {
      const client = createClient();
      const { data, error } = await client
        .from('reviews')
        .insert(review)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    // Update a review
    update: async (id: string, review: Partial<Review>): Promise<Review> => {
      const client = createClient();
      const { data, error } = await client
        .from('reviews')
        .update(review)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    // Delete a review
    delete: async (id: string): Promise<void> => {
      const client = createClient();
      const { error } = await client
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },

  /**
   * Blog Posts
   */
  blogPosts: {
    // Get all published blog posts
    getPublished: async (): Promise<BlogPost[]> => {
      const client = createClient();
      const { data, error } = await client
        .from('blog_posts')
        .select('*')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },

    // Get a specific blog post
    getById: async (id: string): Promise<BlogPost | null> => {
      const client = createClient();
      const { data, error } = await client
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },

    // Create a blog post
    create: async (post: BlogPostInsert): Promise<BlogPost> => {
      const client = createClient();
      const { data, error } = await client
        .from('blog_posts')
        .insert(post)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    // Update a blog post
    update: async (id: string, post: Partial<BlogPost>): Promise<BlogPost> => {
      const client = createClient();
      const { data, error } = await client
        .from('blog_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    // Delete a blog post
    delete: async (id: string): Promise<void> => {
      const client = createClient();
      const { error } = await client
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },

    // Publish a blog post
    publish: async (id: string): Promise<BlogPost> => {
      const client = createClient();
      const { data, error } = await client
        .from('blog_posts')
        .update({ published_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    // Unpublish a blog post
    unpublish: async (id: string): Promise<BlogPost> => {
      const client = createClient();
      const { data, error } = await client
        .from('blog_posts')
        .update({ published_at: null })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
}; 