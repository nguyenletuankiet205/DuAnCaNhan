import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { SafeHtml } from "@/components/seo/safe-html";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { getCaseStudyBySlug } from "@/lib/domain/marketing";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) return createMetadata({ title: "Dự án MIDIGI", description: "Case study marketing MIDIGI", path: "/du-an" });
  return createMetadata({
    title: `${item.title} | MIDIGI`,
    description: item.result_summary,
    path: `/du-an/${item.slug}`,
    image: item.cover_image_url ?? undefined,
    type: "article"
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    about: item.industry,
    author: { "@type": "Organization", name: "MIDIGI" },
    publisher: { "@type": "Organization", name: "MIDIGI" },
    datePublished: item.published_at,
    image: item.cover_image_url ?? "/brand/og-cover.svg"
  };

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <JsonLd data={jsonLd} />
      <article className="mx-auto max-w-5xl">
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline">{item.client_name}</Badge>
          <Badge variant="cyan">{item.industry}</Badge>
        </div>
        <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[52px]">{item.title}</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{item.result_summary}</p>
        <Image src={item.cover_image_url ?? "/brand/og-cover.svg"} alt={`Ảnh dự án ${item.client_name}`} width={1200} height={630} className="mt-7 rounded-lg border border-border object-cover sm:mt-10" priority />
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
          <Metric label="Tăng doanh thu" value={`+${item.revenue_growth}%`} />
          <Metric label="Tăng lead" value={`+${item.lead_growth}%`} />
          <Metric label="Tỷ lệ chuyển đổi" value={`${item.conversion_rate}%`} />
        </div>
        <SafeHtml html={item.content_html} className="prose prose-invert mt-8 max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-accent sm:mt-10" />
        <div className="glass-card mt-8 rounded-lg p-5 text-center sm:mt-12 sm:p-8">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">Bạn muốn tạo case study tăng trưởng tiếp theo?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">MIDIGI có thể rà soát kênh hiện tại và đề xuất lộ trình phù hợp cho doanh nghiệp của bạn.</p>
          <Button asChild variant="gradient" className="mt-6">
            <Link href="/lien-he">
              Nhận tư vấn miễn phí <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </article>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <p className="text-2xl font-bold text-white sm:text-3xl">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
