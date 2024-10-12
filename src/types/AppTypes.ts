import { Json } from './UserTypes';

export interface App {
    id: number;
    created_at: string;
    AppName: string;
    ComponentName: string;
    MultiInstance: boolean;
    IconSVG: string;
    tags: Json;
    Category: string;
    SubCategory: string | null;
    CleoCouture: boolean;
}