import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyVnd } from "@/lib/utils";
import { SectionHeading } from "@/sections/shared/section-heading";
import type { PricingPlan } from "@/types/domain";

export function PricingSection({ plans }: { plans: PricingPlan[] }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Bảng giá tham khảo" title="Chọn mức đồng hành phù hợp với giai đoạn tăng trưởng" description="Chi phí thực tế sẽ được tinh chỉnh sau buổi tư vấn để phù hợp mục tiêu, nguồn lực và mức độ phức tạp của dự án." />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.slug} className={plan.is_recommended ? "border-accent/60 shadow-cyan" : ""}>
              <CardHeader className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.is_recommended ? <Badge variant="cyan">Phổ biến</Badge> : null}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
                <p className="text-3xl font-bold text-white">{formatCurrencyVnd(plan.monthly_price)}</p>
                <p className="mt-2 text-sm text-muted-foreground">Phí khởi tạo từ {formatCurrencyVnd(plan.setup_fee)}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-slate-200">
                      <Check className="mt-0.5 size-4 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.is_recommended ? "gradient" : "outline"} className="mt-6 w-full sm:mt-8">
                  <Link href="/lien-he">Trao đổi gói {plan.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
