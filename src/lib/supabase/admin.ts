import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function getSupabaseAdminClient() {
  const { enabled, url, serviceRoleKey } = getSupabaseEnv();
  if (!enabled || !url || !serviceRoleKey) return null;

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
