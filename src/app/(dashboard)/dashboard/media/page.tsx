import type { Metadata } from "next";
import Image from "next/image";
import { MediaUpload } from "@/components/dashboard/media-upload";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getMediaAssets } from "@/lib/domain/dashboard";
import { getCsrfToken } from "@/lib/security/csrf";
import { formatDateVi } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Thư viện media | MIDIGI",
  description: "Quản lý ảnh blog, case study, testimonial và brand assets trong dashboard MIDIGI.",
  path: "/dashboard/media",
  noIndex: true
});

export default async function MediaPage() {
  await requireRole(["marketing"]);
  const [csrfToken, assets] = await Promise.all([getCsrfToken(), getMediaAssets()]);
  return (
    <div>
      <DashboardPageHeader title="Thư viện media" description="Tải lên và quản lý file đã kiểm tra MIME, kích thước và nhóm lưu trữ trước khi dùng trong CMS." />
      <MediaUpload csrfToken={csrfToken} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {assets.map((asset) => (
          <article key={asset.id} className="glass-card overflow-hidden rounded-lg">
            {asset.mime_type.startsWith("image/") ? (
              <Image src={asset.public_url} alt={asset.alt_text ?? asset.file_name} width={640} height={400} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-white/[0.04] text-sm text-muted-foreground">Tài liệu PDF</div>
            )}
            <div className="p-4">
              <p className="truncate text-sm font-semibold text-white">{asset.file_name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{asset.bucket} · {formatDateVi(asset.created_at)}</p>
            </div>
          </article>
        ))}
      </div>
      {assets.length === 0 ? <p className="mt-8 text-center text-muted-foreground">Chưa có media nào trong thư viện.</p> : null}
    </div>
  );
}
