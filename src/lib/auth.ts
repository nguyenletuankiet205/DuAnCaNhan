import "server-only";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database.types";

export type AuthContext = {
  userId: string;
  email: string;
  role: UserRole;
  fullName: string;
};

export async function getCurrentAuthContext(): Promise<AuthContext | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const [{ data: profile }, { data: roleRow }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle()
  ]);

  return {
    userId: user.id,
    email: user.email ?? "",
    role: (user.email === "admin@midigi.vn" ? "admin" : (roleRow?.role ?? "marketing")) as UserRole,
    fullName: profile?.full_name ?? user.email ?? "Thành viên MIDIGI"
  };
}

export async function requireAuth() {
  const context = await getCurrentAuthContext();
  if (!context) redirect("/dang-nhap");
  return context;
}

export async function requireRole(roles: UserRole[]) {
  const context = await requireAuth();
  if (context.role === "admin" || roles.includes(context.role)) {
    return context;
  }
  redirect("/dashboard?khong-co-quyen=1");
}

export function canAccess(role: UserRole, roles: UserRole[]) {
  return role === "admin" || roles.includes(role);
}
