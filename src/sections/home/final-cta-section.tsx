import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-accent/30 bg-gradient-to-r from-primary/30 via-slate-900 to-accent/20 p-6 text-center shadow-cyan sm:p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 sm:text-sm sm:tracking-[0.24em]">Sẵn sàng tăng trưởng</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[40px]">Tăng trưởng doanh nghiệp của bạn ngay hôm nay</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
          Hãy để MIDIGI rà soát mục tiêu, kênh hiện tại và đề xuất lộ trình marketing phù hợp nhất với nguồn lực của bạn.
        </p>
        <Button asChild size="lg" variant="gradient" className="mt-6 sm:mt-8">
          <Link href="/lien-he">
            Nhận tư vấn miễn phí <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
