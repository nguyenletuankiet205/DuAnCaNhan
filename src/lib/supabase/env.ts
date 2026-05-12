export function getSupabaseEnv() {
  return {
    enabled: process.env.NEXT_PUBLIC_ENABLE_SUPABASE === "true",
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}

export function hasSupabasePublicEnv() {
  const { enabled, url, anonKey } = getSupabaseEnv();
  return Boolean(enabled && url && anonKey);
}
