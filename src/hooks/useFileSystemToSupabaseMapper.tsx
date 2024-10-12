import { useCallback } from 'react';
import { FileMetadata } from '@/types/FileMetadata';

export const useFileSystemToSupabaseMapper = () => {
    const mapFilesToSupabaseFormat = useCallback((files: FileMetadata[], refreshVersion: number): Omit<FileMetadata, 'id'>[] => {
      return files.map(({ id, ...file }) => ({
        name: file.name,
        path: file.path,
        size: file.size.toString(),
        is_directory: file.is_directory,
        extension: file.extension,
        created_at: file.created_at,
        modified_at: file.modified_at,
        accessed_at: file.accessed_at,
        permissions: file.permissions.toString(),
        owner: file.owner.toString(),
        group: file.group.toString(),
        is_symlink: file.is_symlink,
        is_hidden: file.is_hidden,
        refresh_version: refreshVersion
      }));
    }, []);

    return { mapFilesToSupabaseFormat };
};