import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export const useSupabaseDelete = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<PostgrestError | null>(null);
  
    const deleteAllRecords = useCallback(async () => {
      setIsDeleting(true);
      setDeleteError(null);
      try {
        const { error } = await supabase
          .from('file_system')
          .delete()
          .neq('id', null);
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting records:', error);
        setDeleteError(error as PostgrestError);
      } finally {
        setIsDeleting(false);
      }
    }, []);
  
    return { deleteAllRecords, isDeleting, deleteError };
  };