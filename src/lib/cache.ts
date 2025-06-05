/**
 * Simple in-memory cache with TTL support for database queries
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize = 100; // Maximum number of entries

  set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    // Clean up expired entries if cache is getting full
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));

    // If still too many entries, remove oldest ones
    if (this.cache.size >= this.maxSize) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toRemove = entries.slice(0, Math.floor(this.maxSize * 0.2));
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      entries: Array.from(this.cache.keys())
    };
  }
}

// Global cache instance
const cache = new MemoryCache();

/**
 * Cache wrapper for async functions
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttlMs: number = 5 * 60 * 1000 // 5 minutes default
): Promise<T> {
  // Try to get from cache first
  const cached = cache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  try {
    // Execute function and cache result
    const result = await fn();
    cache.set(key, result, ttlMs);
    return result;
  } catch (error) {
    // Don't cache errors, just throw
    throw error;
  }
}

/**
 * Cache keys generator for consistent naming
 */
export const cacheKeys = {
  brokers: {
    all: () => 'brokers:all',
    byId: (id: string) => `brokers:${id}`,
    bySlug: (slug: string) => `brokers:slug:${slug}`,
    byCategory: (categoryId: string) => `brokers:category:${categoryId}`,
    featured: () => 'brokers:featured',
    top: (limit: number) => `brokers:top:${limit}`,
  },
  categories: {
    all: () => 'categories:all',
    byId: (id: string) => `categories:${id}`,
    withBrokers: () => 'categories:with-brokers',
  },
  reviews: {
    byBroker: (brokerId: string) => `reviews:broker:${brokerId}`,
    recent: (limit: number) => `reviews:recent:${limit}`,
  },
  blog: {
    all: () => 'blog:all',
    bySlug: (slug: string) => `blog:slug:${slug}`,
    recent: (limit: number) => `blog:recent:${limit}`,
  }
};

/**
 * Cache TTL constants (in milliseconds)
 */
export const cacheTTL = {
  short: 2 * 60 * 1000,      // 2 minutes
  medium: 5 * 60 * 1000,     // 5 minutes
  long: 15 * 60 * 1000,      // 15 minutes
  veryLong: 60 * 60 * 1000,  // 1 hour
};

/**
 * Utility functions for cache management
 */
export const cacheUtils = {
  // Clear all cache
  clear: () => cache.clear(),
  
  // Clear specific patterns
  clearPattern: (pattern: string) => {
    const stats = cache.getStats();
    const keysToDelete = stats.entries.filter(key => key.includes(pattern));
    keysToDelete.forEach(key => cache.delete(key));
  },
  
  // Get cache statistics
  getStats: () => cache.getStats(),
  
  // Preload data into cache
  preload: async <T>(key: string, fn: () => Promise<T>, ttlMs?: number) => {
    try {
      await withCache(key, fn, ttlMs);
    } catch (error) {
      console.warn(`Failed to preload cache for key: ${key}`, error);
    }
  }
};

/**
 * React hook for cached data with loading states
 * Note: This should be moved to a separate client-side file
 */
// export function useCachedData<T>(
//   key: string,
//   fn: () => Promise<T>,
//   ttlMs?: number
// ) {
//   // This hook should be in a separate client component file
//   // to avoid server-side import issues
// }

// Export the cache instance for direct access if needed
export { cache };
