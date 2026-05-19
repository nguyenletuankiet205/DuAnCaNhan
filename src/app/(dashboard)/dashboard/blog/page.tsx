import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteBlogButton } from "@/components/dashboard/delete-blog-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { blogStatusLabels } from "@/db/enums";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getDashboardBlogPosts } from "@/lib/domain/dashboard";
import { getCsrfToken } from "@/lib/security/csrf";
import { formatDateVi } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Quản lý nội dung blog | MIDIGI",
  description: "CMS blog trong dashboard MIDIGI.",
  path: "/dashboard/blog",
  noIndex: true
});

export default async function DashboardBlogPage() {
  await requireRole(["marketing"]);
  const [posts, csrfToken] = await Promise.all([getDashboardBlogPosts(), getCsrfToken()]);
  return (
    <div>
      <DashboardPageHeader
        title="Quản lý nội dung blog"
        description="Tạo, chỉnh sửa và lưu trữ bài viết với SEO title, meta description, trạng thái xuất bản và nội dung HTML đã được làm sạch."
        action={<Button asChild variant="gradient"><Link href="/dashboard/blog/new"><Plus className="size-4" /> Tạo bài viết</Link></Button>}
      />
      <div className="glass-card rounded-lg">
        <Table>
          <TableHeader><TableRow><TableHead>Bài viết</TableHead><TableHead>Trạng thái</TableHead><TableHead>Cập nhật</TableHead><TableHead>Thao tác</TableHead></TableRow></TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell><p className="font-semibold text-white">{post.title}</p><p className="mt-1 text-xs text-muted-foreground">/{post.slug}</p></TableCell>
                <TableCell><Badge variant={post.status === "published" ? "success" : post.status === "archived" ? "outline" : "warning"}>{blogStatusLabels[post.status as keyof typeof blogStatusLabels]}</Badge></TableCell>
                <TableCell>{formatDateVi(post.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link className="text-sm font-semibold text-accent hover:text-cyan-200" href={`/dashboard/blog/${post.id}/edit`}>Chỉnh sửa</Link>
                    <DeleteBlogButton id={post.id} csrfToken={csrfToken} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {posts.length === 0 ? <p className="p-8 text-center text-muted-foreground">Chưa có bài viết nào.</p> : null}
      </div>
    </div>
  );
}
