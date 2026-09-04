import { createClient } from "@supabase/supabase-js";

// This is the ONLY file that constructs the Supabase client. Every other file
// that needs Supabase access imports this client through a service in
// src/services — never directly. See CONVENTIONS.md.

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy .env.example to " +
      ".env.local and fill in your Supabase project values.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
