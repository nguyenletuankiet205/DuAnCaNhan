import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/lib/domain/marketing";
import { formatCurrencyVnd } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return createMetadata({ title: "Dịch vụ MIDIGI", description: "Dịch vụ marketing MIDIGI", path: "/dich-vu" });
  return createMetadata({
    title: `${service.title} | MIDIGI`,
    description: service.short_description,
    path: `/dich-vu/${service.slug}`
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: "/" },
      { "@type": "ListItem", position: 2, name: "Dịch vụ", item: "/dich-vu" },
      { "@type": "ListItem", position: 3, name: service.title, item: `/dich-vu/${service.slug}` }
    ]
  };

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <JsonLd data={breadcrumb} />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.45fr] lg:gap-10">
        <article className="glass-card rounded-lg p-5 sm:p-8">
          <div className="flex size-14 items-center justify-center rounded-lg bg-primary/15 text-accent">
            <ServiceIcon name={service.icon} className="size-7" />
          </div>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[56px]">{service.title}</h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{service.description}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Phân tích mục tiêu kinh doanh", "Triển khai có đo lường", "Báo cáo minh bạch"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200">
                <CheckCircle2 className="mb-3 size-5 text-success" />
                {item}
              </div>
            ))}
          </div>
        </article>
        <aside className="glass-card rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Chi phí khởi điểm</p>
          <p className="mt-2 text-3xl font-bold text-white">{formatCurrencyVnd(service.starting_price)}</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            MIDIGI sẽ báo giá chính xác sau khi hiểu mục tiêu, quy mô, dữ liệu hiện tại và mức độ triển khai cần thiết.
          </p>
          <Button asChild className="mt-6 w-full" variant="gradient">
            <Link href="/lien-he">
              Nhận tư vấn dịch vụ <ArrowRight className="size-4" />
            </Link>
          </Button>
        </aside>
      </div>
    </main>
  );
}
