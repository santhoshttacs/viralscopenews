import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side Supabase (for public reads)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase (for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface Article {
    id: string;
    title: string;
    slug: string;
    category: 'ai' | 'tech' | 'crypto' | 'middle-east';
    featured_image: string | null;
    ai_summary: string;
    why_it_matters: string;
    key_takeaways: string[];
    full_content: string;
    source_url: string | null;
    source_name: string | null;
    word_count: number;
    status: 'draft' | 'published' | 'rejected';
    author_name: string;
    views: number;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export interface Category {
    slug: string;
    name: string;
    description: string;
}

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    created_at: string;
}

export const CATEGORIES: Category[] = [
    { slug: 'ai', name: 'Artificial Intelligence', description: 'Latest AI breakthroughs, machine learning advances, and industry applications.' },
    { slug: 'tech', name: 'Technology', description: 'Cutting-edge technology news, innovations, and digital transformation trends.' },
    { slug: 'crypto', name: 'Cryptocurrency', description: 'Blockchain developments, crypto markets, DeFi, and Web3 innovations.' },
    { slug: 'middle-east', name: 'Middle East Business', description: 'Business trends, economic developments, and investment opportunities in the Middle East.' },
];
