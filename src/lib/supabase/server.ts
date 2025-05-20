import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/env";

export function createClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  // Check if Supabase environment variables are available
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Supabase client initialization failed: Missing environment variables");
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
      },
    } as any;
  }

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // This might happen in middleware where cookies are readonly
            console.error("Failed to set cookie", error);
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.delete({ name, ...options });
          } catch (error) {
            // This might happen in middleware where cookies are readonly
            console.error("Failed to delete cookie", error);
          }
        },
      },
    }
  );
} 