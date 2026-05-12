import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogForm } from "@/components/dashboard/blog-form";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getBlogCategoriesForDashboard, getBlogPostForEdit } from "@/lib/domain/dashboard";
import { getCsrfToken } from "@/lib/security/csrf";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = createMetadata({
  title: "Chỉnh sửa bài viết | MIDIGI",
  description: "Chỉnh sửa bài viết blog trong dashboard MIDIGI.",
  path: "/dashboard/blog/edit",
  noIndex: true
});

export default async function EditBlogPostPage({ params }: Props) {
  await requireRole(["marketing"]);
  const { id } = await params;
  const [csrfToken, categories, post] = await Promise.all([getCsrfToken(), getBlogCategoriesForDashboard(), getBlogPostForEdit(id)]);
  if (!post) notFound();

  return (
    <div>
      <DashboardPageHeader title="Chỉnh sửa bài viết" description="Cập nhật nội dung, trạng thái xuất bản và metadata SEO của bài viết." />
      <BlogForm
        csrfToken={csrfToken}
        categories={categories}
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          contentHtml: post.content_html,
          categoryId: post.category_id ?? "",
          status: post.status,
          seoTitle: post.seo_title ?? "",
          metaDescription: post.meta_description ?? "",
          coverImageUrl: post.cover_image_url ?? "",
          ogImageUrl: post.og_image_url ?? ""
        }}
      />
    </div>
  );
}
