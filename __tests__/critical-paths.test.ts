/**
 * Critical path tests for broker review platform
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { db } from '@/lib/database';
import { cache, cacheUtils } from '@/lib/cache';

// Mock Supabase client for testing
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: mockBroker, error: null })),
          order: jest.fn(() => Promise.resolve({ data: [mockBroker], error: null })),
        })),
        order: jest.fn(() => Promise.resolve({ data: [mockBroker], error: null })),
        in: jest.fn(() => ({
          order: jest.fn(() => Promise.resolve({ data: [mockBroker], error: null })),
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: mockBroker, error: null })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ data: mockBroker, error: null })),
          })),
        })),
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ error: null })),
      })),
    })),
  })),
}));

// Mock data
const mockBroker = {
  id: 'test-broker-id',
  name: 'Test Broker',
  slug: 'test-broker',
  description: 'A test broker for testing purposes',
  rating: 4.5,
  logo_url: 'https://example.com/logo.png',
  website_url: 'https://testbroker.com',
  regulation: 'FCA, CySEC',
  min_deposit: 100,
  max_leverage: 500,
  spreads_from: 0.1,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

const mockCategory = {
  id: 'test-category-id',
  name: 'Test Category',
  slug: 'test-category',
  description: 'A test category',
  created_at: '2024-01-01T00:00:00Z'
};

describe('Critical Path Tests', () => {
  beforeEach(() => {
    // Clear cache before each test
    cacheUtils.clear();
  });

  afterEach(() => {
    // Clean up after each test
    jest.clearAllMocks();
  });

  describe('Database Operations', () => {
    describe('Brokers', () => {
      it('should fetch all brokers successfully', async () => {
        const brokers = await db.brokers.getAll();
        expect(Array.isArray(brokers)).toBe(true);
        expect(brokers.length).toBeGreaterThanOrEqual(0);
      });

      it('should handle database timeout gracefully', async () => {
        // Mock a timeout scenario
        const originalCreateClient = require('@/lib/supabase/client').createClient;
        require('@/lib/supabase/client').createClient.mockImplementation(() => ({
          from: () => ({
            select: () => ({
              order: () => new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Database query timeout')), 100)
              ),
            }),
          }),
        }));

        const brokers = await db.brokers.getAll();
        expect(brokers).toEqual([]);

        // Restore original implementation
        require('@/lib/supabase/client').createClient.mockImplementation(originalCreateClient);
      });

      it('should fetch broker by ID', async () => {
        const broker = await db.brokers.getById('test-broker-id');
        expect(broker).toBeTruthy();
        expect(broker?.id).toBe('test-broker-id');
      });

      it('should return null for non-existent broker', async () => {
        // Mock no data returned
        require('@/lib/supabase/client').createClient.mockImplementation(() => ({
          from: () => ({
            select: () => ({
              eq: () => ({
                single: () => Promise.resolve({ data: null, error: { code: 'PGRST116' } }),
              }),
            }),
          }),
        }));

        const broker = await db.brokers.getById('non-existent-id');
        expect(broker).toBeNull();
      });
    });

    describe('Categories', () => {
      it('should fetch all categories successfully', async () => {
        // Mock categories response
        require('@/lib/supabase/client').createClient.mockImplementation(() => ({
          from: () => ({
            select: () => ({
              order: () => Promise.resolve({ data: [mockCategory], error: null }),
            }),
          }),
        }));

        const categories = await db.categories.getAll();
        expect(Array.isArray(categories)).toBe(true);
        expect(categories.length).toBeGreaterThanOrEqual(0);
      });

      it('should handle category fetch errors gracefully', async () => {
        // Mock error response
        require('@/lib/supabase/client').createClient.mockImplementation(() => ({
          from: () => ({
            select: () => ({
              order: () => Promise.resolve({ data: null, error: new Error('Database error') }),
            }),
          }),
        }));

        const categories = await db.categories.getAll();
        expect(categories).toEqual([]);
      });
    });
  });

  describe('Caching System', () => {
    it('should cache and retrieve data correctly', async () => {
      const testKey = 'test-key';
      const testData = { test: 'data' };
      
      // Set cache
      cache.set(testKey, testData, 5000);
      
      // Retrieve from cache
      const cachedData = cache.get(testKey);
      expect(cachedData).toEqual(testData);
    });

    it('should expire cached data after TTL', async () => {
      const testKey = 'test-key-ttl';
      const testData = { test: 'data' };
      
      // Set cache with short TTL
      cache.set(testKey, testData, 10); // 10ms
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 20));
      
      // Should be expired
      const cachedData = cache.get(testKey);
      expect(cachedData).toBeNull();
    });

    it('should handle cache misses gracefully', () => {
      const cachedData = cache.get('non-existent-key');
      expect(cachedData).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      // Mock network error
      require('@/lib/supabase/client').createClient.mockImplementation(() => {
        throw new Error('Network error');
      });

      const brokers = await db.brokers.getAll();
      expect(brokers).toEqual([]);
    });

    it('should handle malformed responses gracefully', async () => {
      // Mock malformed response
      require('@/lib/supabase/client').createClient.mockImplementation(() => ({
        from: () => ({
          select: () => ({
            order: () => Promise.resolve({ data: 'invalid-data', error: null }),
          }),
        }),
      }));

      const brokers = await db.brokers.getAll();
      expect(Array.isArray(brokers)).toBe(true);
    });
  });

  describe('Performance Requirements', () => {
    it('should complete database queries within acceptable time', async () => {
      const startTime = performance.now();
      await db.brokers.getAll();
      const endTime = performance.now();
      
      const duration = endTime - startTime;
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    });

    it('should handle concurrent requests efficiently', async () => {
      const promises = Array.from({ length: 10 }, () => db.brokers.getAll());
      
      const startTime = performance.now();
      const results = await Promise.all(promises);
      const endTime = performance.now();
      
      // All requests should succeed
      results.forEach(result => {
        expect(Array.isArray(result)).toBe(true);
      });
      
      // Should complete within reasonable time even with concurrent requests
      const duration = endTime - startTime;
      expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
    });
  });

  describe('Data Integrity', () => {
    it('should maintain data consistency across operations', async () => {
      // Test that broker data remains consistent
      const broker1 = await db.brokers.getById('test-broker-id');
      const broker2 = await db.brokers.getById('test-broker-id');
      
      expect(broker1).toEqual(broker2);
    });

    it('should validate required fields', async () => {
      const brokers = await db.brokers.getAll();
      
      brokers.forEach(broker => {
        expect(broker.id).toBeTruthy();
        expect(broker.name).toBeTruthy();
        expect(typeof broker.rating).toBe('number');
      });
    });
  });
});

// Integration tests for critical user journeys
describe('User Journey Tests', () => {
  it('should support complete broker discovery journey', async () => {
    // 1. User visits homepage and sees categories
    const categories = await db.categories.getAll();
    expect(categories.length).toBeGreaterThan(0);
    
    // 2. User selects a category and sees brokers
    if (categories.length > 0) {
      const brokers = await db.brokers.getByCategory(categories[0].id);
      expect(Array.isArray(brokers)).toBe(true);
    }
    
    // 3. User views broker details
    const allBrokers = await db.brokers.getAll();
    if (allBrokers.length > 0) {
      const broker = await db.brokers.getById(allBrokers[0].id);
      expect(broker).toBeTruthy();
      expect(broker?.id).toBe(allBrokers[0].id);
    }
  });

  it('should handle empty states gracefully', async () => {
    // Mock empty responses
    require('@/lib/supabase/client').createClient.mockImplementation(() => ({
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: { code: 'PGRST116' } }),
          }),
          in: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
    }));

    const categories = await db.categories.getAll();
    const brokers = await db.brokers.getAll();
    const broker = await db.brokers.getById('any-id');

    expect(categories).toEqual([]);
    expect(brokers).toEqual([]);
    expect(broker).toBeNull();
  });
});
