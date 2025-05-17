"use client";

import * as React from "react";

import { User as AuthUser } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

import { Database } from "@/types/supabase";

export const AuthContext = React.createContext<
  | {
      authUser: AuthUser | undefined;
      user: Database["public"]["Tables"]["users"]["Row"] | undefined;
      isAuthenticated: boolean;
      loading: boolean;
      error: string | null;
      logIn: (email: string, password: string) => any;
      logOut: () => any;
      refreshUser: () => any;
    }
  | undefined
>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = React.useState<AuthUser | undefined>(
    undefined
  );
  const [user, setUser] = React.useState<
    Database["public"]["Tables"]["users"]["Row"] | undefined
  >(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const initAuthUser = async () => {
    try {
      setError(null);
      const supabase = createClient();
      const {
        data: { session },
        error: initError,
      } = await supabase.auth.getSession();

      if (initError) {
        console.error("Failed to initialize auth:", initError);
        setAuthUser(undefined);
        return;
      }

      setAuthUser(session?.user || undefined);
    } catch (error) {
      console.error("Error during auth initialization:", error);
      setAuthUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    if (!authUser?.id) {
      setUser(undefined);
      return;
    }

    try {
      setError(null);
      const supabase = createClient();
      const { data: fetchedUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (fetchError) {
        setError("Failed to load user data. Please refresh the page.");
        console.error("Failed to fetch user:", fetchError);
        setUser(undefined);
        return;
      }

      setUser(fetchedUser || undefined);
    } catch (error) {
      setError("An unexpected error occurred while loading user data.");
      console.error("Error fetching user data:", error);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    initAuthUser();
  }, []);

  React.useEffect(() => {
    if (!authUser) {
      setUser(undefined);
      return;
    }

    fetchUser();
  }, [authUser]);

  React.useEffect(() => {
    const supabase = createClient();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user || undefined);
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const logIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return { error: loginError.message };
    }

    setAuthUser(data.user);
    await fetchUser();
    setLoading(false);
  };

  const logOut = async () => {
    setError(null);
    setLoading(true);

    const supabase = createClient();

    await supabase.auth.signOut();

    setAuthUser(undefined);
    setUser(undefined);

    setLoading(false);
  };

  const isAuthenticated = !!authUser;

  const value = React.useMemo(
    () => ({
      authUser,
      user,
      isAuthenticated,
      loading,
      error,
      logIn,
      logOut,
      refreshUser: fetchUser,
    }),
    [user, authUser, loading, error, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
