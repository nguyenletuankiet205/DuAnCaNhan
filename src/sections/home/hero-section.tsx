import Link from "next/link";
import { ArrowRight, CheckCircle2, Gauge, Megaphone, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion-reveal";

const badges = ["100+ khách hàng", "500+ chiến dịch", "ROI tối ưu", "Hỗ trợ nhanh"];
const heroPillars = [
  { title: "Chiến lược", description: "Rõ mục tiêu, kênh ưu tiên và KPI tăng trưởng.", icon: Gauge },
  { title: "Triển khai", description: "Website, landing page, nội dung và quảng cáo đồng bộ.", icon: Megaphone },
  { title: "Tối ưu", description: "Đo lường dữ liệu, cải thiện chuyển đổi và chất lượng lead.", icon: SearchCheck }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.82fr] lg:gap-10 lg:px-8 lg:py-16">
        <MotionReveal>
          <div>
            <Badge variant="cyan">Digital Marketing Agency tại Việt Nam</Badge>
            <h1 className="mt-5 max-w-4xl text-[34px] font-bold leading-[1.12] text-white sm:text-5xl lg:text-[64px]">
              <span className="gradient-text">Giải pháp Marketing</span> giúp doanh nghiệp tăng trưởng bền vững
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Thiết kế website, quảng cáo đa nền tảng, xây dựng thương hiệu và tối ưu chuyển đổi.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gradient">
                <Link href="/lien-he">
                  Nhận tư vấn ngay <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/du-an">Xem dự án</Link>
              </Button>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {badges.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium leading-5 text-slate-200">
                  <CheckCircle2 className="mb-2 size-4 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.12}>
          <div className="relative hidden md:block lg:pl-4">
            <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl" aria-hidden="true" />
            <div className="relative space-y-3 sm:space-y-5">
              <div className="glass-card rounded-lg p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent sm:size-12">
                    <Sparkles className="size-5 sm:size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent sm:text-sm">MIDIGI Method</p>
                    <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">Từ chiến lược đến chuyển đổi</h2>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground sm:leading-7">
                  MIDIGI xây hệ thống marketing theo từng giai đoạn: hiểu thị trường, tạo tài sản số, kéo traffic chất lượng và tối ưu tỉ lệ chuyển đổi.
                </p>
              </div>
              <div className="grid gap-3 sm:gap-4">
                {heroPillars.map((item) => (
                  <div key={item.title} className="glass-card rounded-lg p-4 transition hover:-translate-y-0.5 hover:border-accent/40 sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-accent">
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-card rounded-lg p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
                  <p className="text-sm font-semibold leading-6 text-white">Quy trình minh bạch, báo cáo rõ ràng, không hứa kết quả thiếu cơ sở.</p>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
