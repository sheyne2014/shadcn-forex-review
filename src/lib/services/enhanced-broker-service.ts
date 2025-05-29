/**
 * Enhanced Broker Service
 * 
 * Comprehensive service for managing brokers with the enhanced database schema
 */

import { createClient } from '@/lib/supabase/client';
import { 
  EnhancedBroker, 
  CreateBrokerData, 
  BrokerFilters, 
  BrokerSortOptions,
  BrokerComparison,
  AccountTypes
} from '@/lib/types/enhanced-broker';
import { Broker } from '@/types/supabase';

export class EnhancedBrokerService {
  private supabase = createClient();

  /**
   * Get all brokers with enhanced data
   */
  async getAllBrokers(
    filters?: BrokerFilters,
    sort?: BrokerSortOptions,
    limit?: number,
    offset?: number
  ): Promise<EnhancedBroker[]> {
    let query = this.supabase
      .from('brokers')
      .select('*');

    // Apply filters
    if (filters) {
      query = this.applyFilters(query, filters);
    }

    // Apply sorting
    if (sort) {
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
    } else {
      query = query.order('overall_rating', { ascending: false });
    }

    // Apply pagination
    if (limit) {
      query = query.limit(limit);
    }
    if (offset) {
      query = query.range(offset, offset + (limit || 50) - 1);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []) as EnhancedBroker[];
  }

  /**
   * Get broker by slug
   */
  async getBrokerBySlug(slug: string): Promise<EnhancedBroker | null> {
    const { data, error } = await this.supabase
      .from('brokers')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as EnhancedBroker | null;
  }

  /**
   * Get broker by ID
   */
  async getBrokerById(id: string): Promise<EnhancedBroker | null> {
    const { data, error } = await this.supabase
      .from('brokers')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as EnhancedBroker | null;
  }

  /**
   * Create a new broker
   */
  async createBroker(brokerData: CreateBrokerData): Promise<EnhancedBroker> {
    // Generate slug if not provided
    if (!brokerData.slug) {
      brokerData.slug = this.generateSlug(brokerData.name);
    }

    // Set default values
    const enrichedData = {
      ...brokerData,
      demo_account_available: brokerData.demo_account_available ?? true,
      api_access: brokerData.api_access ?? false,
      social_trading: brokerData.social_trading ?? false,
      live_chat_available: brokerData.live_chat_available ?? false,
      phone_support_available: brokerData.phone_support_available ?? false,
      webinars_available: brokerData.webinars_available ?? false,
      trading_signals: brokerData.trading_signals ?? false,
      market_research: brokerData.market_research ?? false,
      segregated_accounts: brokerData.segregated_accounts ?? false,
      is_featured: brokerData.is_featured ?? false,
      is_trusted: brokerData.is_trusted ?? false,
      is_regulated: brokerData.is_regulated ?? false,
      review_methodology_version: 1,
      last_reviewed_date: new Date().toISOString().split('T')[0],
    };

    const { data, error } = await this.supabase
      .from('brokers')
      .insert(enrichedData)
      .select()
      .single();

    if (error) throw error;
    return data as EnhancedBroker;
  }

  /**
   * Update broker
   */
  async updateBroker(id: string, updates: Partial<CreateBrokerData>): Promise<EnhancedBroker> {
    const { data, error } = await this.supabase
      .from('brokers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as EnhancedBroker;
  }

  /**
   * Delete broker
   */
  async deleteBroker(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('brokers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Get featured brokers
   */
  async getFeaturedBrokers(limit: number = 10): Promise<EnhancedBroker[]> {
    const { data, error } = await this.supabase
      .from('brokers')
      .select('*')
      .eq('is_featured', true)
      .order('overall_rating', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as EnhancedBroker[];
  }

  /**
   * Get top-rated brokers
   */
  async getTopRatedBrokers(limit: number = 10): Promise<EnhancedBroker[]> {
    const { data, error } = await this.supabase
      .from('brokers')
      .select('*')
      .not('overall_rating', 'is', null)
      .order('overall_rating', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as EnhancedBroker[];
  }

  /**
   * Get brokers by asset type
   */
  async getBrokersByAsset(asset: string, limit?: number): Promise<EnhancedBroker[]> {
    let query = this.supabase
      .from('brokers')
      .select('*')
      .contains('supported_assets', [asset])
      .order('overall_rating', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []) as EnhancedBroker[];
  }

  /**
   * Get brokers by regulator
   */
  async getBrokersByRegulator(regulator: string): Promise<EnhancedBroker[]> {
    const { data, error } = await this.supabase
      .from('brokers')
      .select('*')
      .or(`primary_regulator.eq.${regulator},secondary_regulators.cs.{${regulator}}`)
      .order('overall_rating', { ascending: false });

    if (error) throw error;
    return (data || []) as EnhancedBroker[];
  }

  /**
   * Search brokers
   */
  async searchBrokers(query: string, limit: number = 20): Promise<EnhancedBroker[]> {
    const { data, error } = await this.supabase
      .from('brokers')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('overall_rating', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as EnhancedBroker[];
  }

  /**
   * Compare brokers
   */
  async compareBrokers(brokerIds: string[]): Promise<BrokerComparison> {
    const { data, error } = await this.supabase
      .from('brokers')
      .select('*')
      .in('id', brokerIds);

    if (error) throw error;
    
    const brokers = (data || []) as EnhancedBroker[];
    const comparisonFields = [
      'overall_rating', 'min_deposit_usd', 'spreads_eur_usd', 
      'max_leverage', 'primary_regulator', 'platform_names'
    ];

    const differences: { [field: string]: { [brokerId: string]: any } } = {};
    
    comparisonFields.forEach(field => {
      differences[field] = {};
      brokers.forEach(broker => {
        differences[field][broker.id] = broker[field as keyof EnhancedBroker];
      });
    });

    return {
      brokers,
      comparisonFields,
      differences
    };
  }

  /**
   * Apply filters to query
   */
  private applyFilters(query: any, filters: BrokerFilters) {
    if (filters.minDeposit) {
      if (filters.minDeposit.min !== undefined) {
        query = query.gte('min_deposit_usd', filters.minDeposit.min);
      }
      if (filters.minDeposit.max !== undefined) {
        query = query.lte('min_deposit_usd', filters.minDeposit.max);
      }
    }

    if (filters.leverage) {
      if (filters.leverage.min !== undefined) {
        query = query.gte('max_leverage', filters.leverage.min);
      }
      if (filters.leverage.max !== undefined) {
        query = query.lte('max_leverage', filters.leverage.max);
      }
    }

    if (filters.spreads?.max !== undefined) {
      query = query.lte('spreads_eur_usd', filters.spreads.max);
    }

    if (filters.regulators && filters.regulators.length > 0) {
      const regulatorFilter = filters.regulators
        .map(reg => `primary_regulator.eq.${reg}`)
        .join(',');
      query = query.or(regulatorFilter);
    }

    if (filters.assets && filters.assets.length > 0) {
      filters.assets.forEach(asset => {
        query = query.contains('supported_assets', [asset]);
      });
    }

    if (filters.features) {
      Object.entries(filters.features).forEach(([feature, value]) => {
        if (value !== undefined) {
          const fieldMap: { [key: string]: string } = {
            segregatedAccounts: 'segregated_accounts',
            demoAccount: 'demo_account_available',
            apiAccess: 'api_access',
            socialTrading: 'social_trading',
            liveChat: 'live_chat_available',
            mobileApp: 'mobile_app_rating'
          };
          
          const dbField = fieldMap[feature];
          if (dbField) {
            if (feature === 'mobileApp') {
              query = query.not(dbField, 'is', null);
            } else {
              query = query.eq(dbField, value);
            }
          }
        }
      });
    }

    if (filters.flags) {
      Object.entries(filters.flags).forEach(([flag, value]) => {
        if (value !== undefined) {
          const fieldMap: { [key: string]: string } = {
            featured: 'is_featured',
            trusted: 'is_trusted',
            regulated: 'is_regulated'
          };
          
          const dbField = fieldMap[flag];
          if (dbField) {
            query = query.eq(dbField, value);
          }
        }
      });
    }

    return query;
  }

  /**
   * Generate URL-friendly slug from broker name
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Export singleton instance
export const enhancedBrokerService = new EnhancedBrokerService();
