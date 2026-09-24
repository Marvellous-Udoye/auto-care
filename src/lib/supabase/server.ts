import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServerKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseServerConfig = Boolean(supabaseUrl && supabaseServerKey);

export function createSupabaseServerClient() {
  if (!supabaseUrl || !supabaseServerKey) {
    throw new Error("Supabase is not configured on the server.");
  }

  return createClient(supabaseUrl, supabaseServerKey, {
    auth: {
      persistSession: false,
    },
  });
}
