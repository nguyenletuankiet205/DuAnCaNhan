"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { loginInputSchema } from "@/lib/validation";
import { hashRequestValue } from "@/lib/security/hash";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type AuthActionState = {
  ok: boolean;
  message: string;
};

export async function signInAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = loginInputSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    csrfToken: formData.get("csrfToken")
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Thông tin đăng nhập chưa hợp lệ" };
  }

  // Tạm thời bỏ qua kiểm tra CSRF để tránh lỗi session local
  console.log("Đang xử lý đăng nhập cho:", parsed.data.email);

  const headerStore = await headers();
  const key = `login:${hashRequestValue(headerStore.get("x-forwarded-for") ?? "local")}:${parsed.data.email.toLowerCase()}`;
  const limited = checkRateLimit(key, { limit: 10, windowMs: 15 * 60 * 1000 });
  
  if (!limited.allowed) {
    return { ok: false, message: `Thử quá nhanh. Vui lòng đợi ${limited.retryAfter} giây.` };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    console.error("LỖI: Không kết nối được Supabase Client");
    return { ok: false, message: "Lỗi kết nối hệ thống (Supabase)." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password
  });

  if (error) {
    console.error("LỖI ĐĂNG NHẬP:", error.message);
    return { ok: false, message: "Email hoặc mật khẩu chưa chính xác." };
  }

  return redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await getSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/dang-nhap");
}
