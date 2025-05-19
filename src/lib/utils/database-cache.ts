/**
 * Database Caching Utility
 * 
 * This utility provides caching functionality for database queries to improve performance.
 * It implements both memory caching and localStorage for persisting data between sessions.
 * Use this for frequently accessed, rarely changing data like broker lists or categories.
 */

import { BrokerSchema, CategorySchema } from '../database-types';

// Cache expiration times (in milliseconds)
const MEMORY_CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const LOCAL_STORAGE_EXPIRY = 60 * 60 * 1000; // 1 hour

// Types for cache entries
type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

// Memory cache
const memoryCache: Record<string, CacheEntry<any>> = {};

/**
 * Get data from cache (checks both memory and localStorage)
 * 
 * @param key Cache key
 * @returns Cached data or null if not found or expired
 */
export function getFromCache<T>(key: string): T | null {
  try {
    // Check memory cache first (faster)
    const memoryCacheEntry = memoryCache[key];
    if (memoryCacheEntry && (Date.now() - memoryCacheEntry.timestamp) < MEMORY_CACHE_EXPIRY) {
      return memoryCacheEntry.data;
    }

    // If not in memory or expired, try localStorage
    if (typeof window !== 'undefined') {
      const localStorageKey = `db_cache_${key}`;
      const localStorageData = localStorage.getItem(localStorageKey);
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData) as CacheEntry<T>;
        
        // Check if localStorage cache is still valid
        if ((Date.now() - parsedData.timestamp) < LOCAL_STORAGE_EXPIRY) {
          // Refresh memory cache with this data
          memoryCache[key] = parsedData;
          return parsedData.data;
        }
        
        // Cache expired, remove it
        localStorage.removeItem(localStorageKey);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving from cache:', error);
    return null;
  }
}

/**
 * Save data to cache (both memory and localStorage)
 * 
 * @param key Cache key
 * @param data Data to cache
 */
export function saveToCache<T>(key: string, data: T): void {
  try {
    const timestamp = Date.now();
    const cacheEntry: CacheEntry<T> = { data, timestamp };
    
    // Save to memory cache
    memoryCache[key] = cacheEntry;
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      const localStorageKey = `db_cache_${key}`;
      localStorage.setItem(localStorageKey, JSON.stringify(cacheEntry));
    }
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
}

/**
 * Clear specific cache entry
 * 
 * @param key Cache key
 */
export function clearCacheEntry(key: string): void {
  try {
    // Clear from memory cache
    delete memoryCache[key];
    
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      const localStorageKey = `db_cache_${key}`;
      localStorage.removeItem(localStorageKey);
    }
  } catch (error) {
    console.error('Error clearing cache entry:', error);
  }
}

/**
 * Clear all cache entries
 */
export function clearAllCache(): void {
  try {
    // Clear memory cache
    for (const key in memoryCache) {
      delete memoryCache[key];
    }
    
    // Clear localStorage (only our cache entries)
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('db_cache_')) {
          localStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    console.error('Error clearing all cache:', error);
  }
}

// Utility functions for specific entity types
export const brokerCache = {
  getAll: () => getFromCache<BrokerSchema[]>('brokers_all'),
  saveAll: (data: BrokerSchema[]) => saveToCache('brokers_all', data),
  getById: (id: string) => getFromCache<BrokerSchema>(`broker_${id}`),
  saveById: (id: string, data: BrokerSchema) => saveToCache(`broker_${id}`, data),
  clear: () => {
    clearCacheEntry('brokers_all');
    // We don't clear individual broker entries as that would be too aggressive
  }
};

export const categoryCache = {
  getAll: () => getFromCache<CategorySchema[]>('categories_all'),
  saveAll: (data: CategorySchema[]) => saveToCache('categories_all', data),
  getById: (id: string) => getFromCache<CategorySchema>(`category_${id}`),
  saveById: (id: string, data: CategorySchema) => saveToCache(`category_${id}`, data),
  clear: () => {
    clearCacheEntry('categories_all');
  }
}; 