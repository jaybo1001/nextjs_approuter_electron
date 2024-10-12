import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface App {
  id: number;
  created_at: string;
  AppName: string;
  ComponentName: string;
  MultiInstance: boolean;
  IconSVG: string;
  tags: Json | null;
  Category: string;
  SubCategory: string | null;
}

// You might need to define the Json type if it's not already imported
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export function useApps() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const { data, error } = await supabase
          .from('AppLibrary')
          .select('*')
          .eq('CleoCouture', 'true') // Use 'true' as a string
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
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  return { apps, loading, error };
}