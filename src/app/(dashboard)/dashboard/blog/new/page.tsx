import type { Metadata } from "next";
import { BlogForm } from "@/components/dashboard/blog-form";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getBlogCategoriesForDashboard } from "@/lib/domain/dashboard";
import { getCsrfToken } from "@/lib/security/csrf";

export const metadata: Metadata = createMetadata({
  title: "Tạo bài viết mới | MIDIGI",
  description: "Tạo bài viết blog mới trong dashboard MIDIGI.",
  path: "/dashboard/blog/new",
  noIndex: true
});

export default async function NewBlogPostPage() {
  await requireRole(["marketing"]);
  const [csrfToken, categories] = await Promise.all([getCsrfToken(), getBlogCategoriesForDashboard()]);
  return (
    <div>
      <DashboardPageHeader title="Tạo bài viết mới" description="Viết nội dung hữu ích, đặt metadata rõ ràng và xuất bản khi bài đã sẵn sàng." />
      <BlogForm csrfToken={csrfToken} categories={categories} />
    </div>
  );
}
