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
    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      }
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(true);
        await fetchApps();
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setLoading(true);
          await fetchApps();
          setLoading(false);
        } else {
          setApps([]);
          setLoading(false);
        }
      }
    );

    return () => {
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
