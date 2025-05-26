"use client";

// Safe Supabase client wrapper that prevents SSR issues
import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/env';

let supabaseClient: any = null;

export function createSafeSupabaseClient() {
  // Only create client on browser side
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseClient) {
    try {
      supabaseClient = createBrowserClient(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    } catch (error) {
      console.error('Failed to create Supabase client:', error);
      return null;
    }
  }

  return supabaseClient;
}

// Hook for safe Supabase usage
export function useSafeSupabase() {
  return createSafeSupabaseClient();
}
