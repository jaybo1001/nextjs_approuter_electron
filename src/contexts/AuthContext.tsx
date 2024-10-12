import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

interface User {
  // Define user properties
}

interface App {
  id: number;
  AppName: string;
  ComponentName: string;
  MultiInstance: boolean;
  IconSVG: string;
  Category: string;
  SubCategory: string | null;
  CleoCouture: boolean;
  // Add any other app properties
}

interface AuthContextType {
  user: User | null;
  apps: App[];
  loading: boolean;
  error: string | null;
  refreshApps: () => Promise<void>;
  // Add other auth methods as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApps = async () => {
    try {
      const { data, error } = await supabase
        .from('AppLibrary')
        .select('*')
        .eq('CleoCouture', true)
        .order('Category', { ascending: true })
        .order('SubCategory', { ascending: true, nullsFirst: true })
        .order('AppName', { ascending: true });

      if (error) throw error;

      const sortedApps = data.sort((a, b) => {
        if (a.Category === 'core') return -1;
        if (b.Category === 'core') return 1;
        if (a.Category === 'controls') return 1;
        if (b.Category === 'controls') return -1;
        return a.Category.localeCompare(b.Category);
      });

      setApps(sortedApps);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Unknown error fetching apps');
    }
  };

  useEffect(() => {
    console.log("AuthProvider: useEffect triggered");
    let isMounted = true;

    const initializeAuth = async () => {
      console.log("AuthProvider: Initializing auth");
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("AuthProvider: Got session", { session, error });
        if (error) throw error;

        if (isMounted) {
          setUser(session?.user ?? null);
          console.log("AuthProvider: User set", session?.user);
          setLoading(false);  // Set loading to false immediately after setting user
          if (session?.user) {
            console.log("AuthProvider: Fetching apps");
            fetchApps().catch(console.error);  // Fetch apps in the background
          }
        }
      } catch (error) {
        console.error("AuthProvider: Error during initialization", error);
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Unknown error during initialization');
          setLoading(false);  // Ensure loading is set to false even if there's an error
        }
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("AuthProvider: Auth state changed", { event, session });
        if (isMounted) {
          setUser(session?.user ?? null);
          setLoading(false);  // Set loading to false immediately
          if (session?.user) {
            console.log("AuthProvider: User logged in, fetching apps");
            fetchApps().catch(console.error);  // Fetch apps in the background
          } else {
            console.log("AuthProvider: User logged out, clearing apps");
            setApps([]);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      console.log("AuthProvider: Cleaning up auth listener");
      authListener.subscription.unsubscribe();
    };
  }, []);

  const refreshApps = async () => {
    setLoading(true);
    await fetchApps();
    setLoading(false);
  };

  const value = {
    user,
    apps,
    loading,
    error,
    refreshApps,
    // Add other auth methods here
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
