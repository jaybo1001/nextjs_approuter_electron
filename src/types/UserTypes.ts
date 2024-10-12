import { App } from './AppTypes';

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface User {
    id: string;
    email: string;
    avatar_url?: string;
    user_metadata?: {
      full_name?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
  
  export interface AuthUserType {
    user: User | null;
    loading: boolean;
    apps: App[];
    signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
    signOut: () => Promise<void>;
    refreshApps: () => Promise<void>;
  }