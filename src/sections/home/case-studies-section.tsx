import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/sections/shared/section-heading";
import type { CaseStudy } from "@/types/domain";

export function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Dự án tiêu biểu" title="Kết quả tăng trưởng được kể bằng dữ liệu" description="Các case study tập trung vào bài toán kinh doanh, cách triển khai và chỉ số cải thiện sau từng giai đoạn." />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
          {caseStudies.slice(0, 2).map((item, index) => (
            <MotionReveal key={item.slug} delay={index * 0.06}>
              <Card className="overflow-hidden">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline">{item.client_name}</Badge>
                    <Badge variant="cyan">{item.industry}</Badge>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.result_summary}</p>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <Metric label="Tăng doanh thu" value={`+${item.revenue_growth}%`} />
                    <Metric label="Tăng lead" value={`+${item.lead_growth}%`} />
                    <Metric label="Chuyển đổi" value={`${item.conversion_rate}%`} />
                  </div>
                  <Link href={`/du-an/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-cyan-200">
                    Xem case study <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
