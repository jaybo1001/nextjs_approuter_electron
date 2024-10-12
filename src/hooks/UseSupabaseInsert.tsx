import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { FileMetadata } from '@/types/FileMetadata';

export const useSupabaseInsert = () => {
    const [isInserting, setIsInserting] = useState(false);
    const [insertError, setInsertError] = useState<PostgrestError | null>(null);
  
    const insertRecords = useCallback(async (data: FileMetadata[]) => {
      setIsInserting(true);
      setInsertError(null);
      try {
        const { error } = await supabase
          .from('file_system')
          .insert(data);
        if (error) throw error;
      } catch (error) {
        console.error('Error inserting records:', error);
        setInsertError(error as PostgrestError);
      } finally {
        setIsInserting(false);
      }
    }, []);
  
    return { insertRecords, isInserting, insertError };
  };