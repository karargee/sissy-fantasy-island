import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://peprvnxgxxpbewmqjgjf.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabase() {
  return createClient(URL, KEY);
}

export default getSupabase;
