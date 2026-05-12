import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { getCaseStudies } from "@/lib/domain/marketing";
import { SectionHeading } from "@/sections/shared/section-heading";

export const metadata: Metadata = createMetadata({
  title: "Dự án Marketing tiêu biểu của MIDIGI",
  description: "Xem các case study về tăng trưởng lead, doanh thu và tỷ lệ chuyển đổi cho SME, startup, local business và thương hiệu cá nhân.",
  path: "/du-an"
});

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Dự án" title="Case study tăng trưởng từ chiến lược đến triển khai" />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
          {caseStudies.map((item) => (
            <article key={item.slug} className="glass-card overflow-hidden rounded-lg">
              <Image src={item.cover_image_url ?? "/brand/og-cover.svg"} alt={`Ảnh dự án ${item.client_name}`} width={1200} height={630} className="aspect-[16/8] w-full object-cover" />
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">{item.client_name}</Badge>
                  <Badge variant="cyan">{item.industry}</Badge>
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.result_summary}</p>
                <Link href={`/du-an/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-cyan-200">
                  Xem chi tiết <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
