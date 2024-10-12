import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export const useFileSystemChangelog = () => {
  const [lastVersion, setLastVersion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLastVersion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('file_system_changelog')
        .select('refresh_version')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      const newVersion = data && data.length > 0 ? data[0].refresh_version + 1 : 1;
      setLastVersion(newVersion);
      return newVersion;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateChangelog = useCallback(async (fileCount: number, newVersion: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('file_system_changelog')
        .insert({
          file_count: fileCount,
          refresh_version: newVersion,
        });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    lastVersion,
    isLoading,
    error,
    fetchLastVersion,
    updateChangelog,
  };
};