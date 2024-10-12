import { useState, useCallback } from 'react';
import { useFileSystemSync } from '@/contexts/FilesToDBContext';
import { useFileSystem } from '@/hooks/useFileSystem';
import { supabase } from '@/lib/supabase';
import { FileMetadata } from '@/types/FileMetadata';

export const useFileSystemSupabase = () => {
  const { files, setFiles, isLoading, setIsLoading, error, setError, supabaseData, setSupabaseData } = useFileSystemSync();
  const { refreshFiles: originalRefreshFiles } = useFileSystem();
  const [isUpdatingSupabase, setIsUpdatingSupabase] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const mapFilesToSupabaseFormat = useCallback((files: FileMetadata[]): FileMetadata[] => {
    return files.map(file => ({
      name: file.name,
      path: file.path,
      size: file.size,
      is_directory: file.is_directory,
      extension: file.extension,
      created_at: file.created_at,
      modified_at: file.modified_at,
      accessed_at: file.accessed_at,
      permissions: file.permissions,
      owner: file.owner,
      group: file.group,
      is_symlink: file.is_symlink,
      is_hidden: file.is_hidden
    }));
  }, []);

  const deleteAllRecords = useCallback(async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const { error } = await supabase
        .from('file_system')
        .delete()
        .not('id', 'is', null);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting records:', error);
      setDeleteError(error as PostgrestError);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const insertRecords = useCallback(async (data: Omit<FileMetadata, 'id'>[]) => {
    setIsInserting(true);
    setInsertError(null);
    try {
      const { data: insertedData, error } = await supabase
        .from('file_system')
        .insert(data)
        .select();
      if (error) throw error;
      return insertedData;
    } catch (error) {
      console.error('Error inserting records:', error);
      setInsertError(error as PostgrestError);
      throw error;
    } finally {
      setIsInserting(false);
    }
  }, []);

  const updateSupabaseTable = useCallback(async () => {
    setIsUpdatingSupabase(true);
    setSupabaseError(null);
    try {
      await deleteAllRecords();
      const mappedData = mapFilesToSupabaseFormat(files);
      const insertedData = await insertRecords(mappedData);
      setSupabaseData(insertedData);
      console.log('Data inserted successfully:', insertedData);
    } catch (err) {
      console.error('Error updating Supabase:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setSupabaseError(errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsUpdatingSupabase(false);
    }
  }, [files, deleteAllRecords, insertRecords, mapFilesToSupabaseFormat, setSupabaseData, setError]);

  const refreshFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const refreshedFiles = await originalRefreshFiles();
      setFiles(refreshedFiles);
      return refreshedFiles;
    } catch (err) {
      console.error('Error refreshing files:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [originalRefreshFiles, setFiles, setIsLoading, setError]);

  const refreshFilesAndUpdateSupabase = useCallback(async () => {
    console.log('Starting refreshFilesAndUpdateSupabase');
    setIsLoading(true);
    try {
      console.log('Refreshing files...');
      const refreshedFiles = await refreshFiles();
      setFiles(refreshedFiles);
      console.log('Files refreshed, updating Supabase...');
      await updateSupabaseTable();
      console.log('Supabase update completed');
    } catch (error) {
      console.error('Error in refreshFilesAndUpdateSupabase:', error);
      setSupabaseError(error instanceof Error ? error.message : 'An unknown error occurred');
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [refreshFiles, updateSupabaseTable, setFiles, setIsLoading, setError]);

  return {
    refreshFiles,
    files,
    isLoading,
    error,
    isUpdatingSupabase,
    supabaseError,
    refreshFilesAndUpdateSupabase,
    updateSupabaseTable,
    mapFilesToSupabaseFormat,
    deleteAllRecords,
    insertRecords
  };
};