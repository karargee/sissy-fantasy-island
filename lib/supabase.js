import { createClient } from "@supabase/supabase-js";

let _supabase;

export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );
  }
  return _supabase;
}

export default getSupabase;
