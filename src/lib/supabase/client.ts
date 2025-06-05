import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/env";

export function createClient() {
  // Check if Supabase environment variables are available
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase browser client initialization failed: Missing environment variables");
    // Return a mock client that safely does nothing
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: new Error("Database client not available") }),
            order: () => Promise.resolve({ data: [], error: new Error("Database client not available") }),
            range: () => Promise.resolve({ data: [], error: new Error("Database client not available") }),
            limit: () => Promise.resolve({ data: [], error: new Error("Database client not available") }),
          }),
          order: () => ({
            range: () => Promise.resolve({ data: [], error: new Error("Database client not available") }),
            limit: () => Promise.resolve({ data: [], error: new Error("Database client not available") }),
          }),
          limit: () => Promise.resolve({ data: [], error: new Error("Database client not available") }),
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: new Error("Database client not available") }),
          }),
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: () => Promise.resolve({ data: null, error: new Error("Database client not available") }),
            }),
          }),
        }),
        delete: () => ({
          eq: () => Promise.resolve({ error: new Error("Database client not available") }),
        }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: new Error("Database client not available") }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any;
  }

  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      db: {
        schema: 'public'
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'x-application-name': 'broker-analysis-platform'
        }
      }
    }
  );
}
