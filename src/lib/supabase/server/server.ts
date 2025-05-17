import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { env } from "@/env";

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          try {
            return cookieStore.get(name)?.value;
          } catch (error) {
            return undefined;
          }
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // No-op in environments where cookies cannot be set
          }
        },
        remove(name, options) {
          try {
            cookieStore.delete({ name, ...options });
          } catch (error) {
            // No-op in environments where cookies cannot be deleted
          }
        },
      },
    }
  );
}

export function createAdminClient() {
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      global: {
        headers: {
          "x-service-role": "true",
        },
      },
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op
        },
      },
    }
  );
}

export async function createClientFromJwt(jwt: string) {
  if (!jwt) {
    console.error("No JWT provided");
    return;
  }

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op
        },
      },
    }
  );
}

export async function getUser(supabase: SupabaseClient) {
  const {
    data: { user },
    error: error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }

  return user;
}

export async function getUserId(supabase: SupabaseClient) {
  const user = await getUser(supabase);

  if (!user) {
    console.error("No session found");
    return null;
  }

  return user.id || null;
}
