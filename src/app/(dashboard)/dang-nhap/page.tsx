import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";
import { createMetadata } from "@/lib/metadata";
import { getCsrfToken } from "@/lib/security/csrf";

export const metadata: Metadata = createMetadata({
  title: "Đăng nhập Dashboard MIDIGI",
  description: "Trang đăng nhập dành cho đội ngũ quản trị MIDIGI.",
  path: "/dang-nhap",
  noIndex: true
});

export default async function LoginPage() {
  const csrfToken = await getCsrfToken();
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="glass-card w-full max-w-md rounded-lg p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Dashboard MIDIGI</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Đăng nhập quản trị</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Chỉ thành viên được phân quyền mới có thể truy cập khu vực quản trị, CRM và CMS.</p>
        <div className="mt-8">
          <LoginForm csrfToken={csrfToken} />
        </div>
      </section>
    </main>
  );
}
