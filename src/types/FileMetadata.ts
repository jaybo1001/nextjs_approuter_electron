import { v4 as uuidv4 } from 'uuid';

export interface FileMetadata {
  id?: string; // Make id optional
  name: string;
  path: string;
  size: string;
  is_directory: boolean;
  extension: string | null;
  created_at: string;
  modified_at: string;
  accessed_at: string;
  permissions: string;
  owner: string;
  group: string;
  is_symlink: boolean;
  is_hidden: boolean;
}

export const createFileMetadata = (file: Omit<FileMetadata, 'id'>): FileMetadata => ({
  id: uuidv4(),
  ...file
});

// You might also want to include a type for the API response
export interface FileSystemApiResponse {
  status: 'success' | 'error';
  data?: FileMetadata[];
  message?: string;
}
