// lib/supabase.ts
'use client';

import { createBrowserClient } from '@supabase/ssr';

// Optional: Define types (recommended for better DX)
import type { Database } from '@/types/supabase'; // Optional if you generated types from Supabase

// Main browser-side Supabase client
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
