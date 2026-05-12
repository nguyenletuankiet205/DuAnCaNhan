import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { ServiceIcon } from "@/components/service-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/sections/shared/section-heading";
import type { Service } from "@/types/domain";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Dịch vụ trọng tâm"
          title="9 giải pháp marketing được thiết kế cho tăng trưởng thực tế"
          description="Mỗi dịch vụ đều gắn với mục tiêu kinh doanh, dữ liệu đo lường và quy trình triển khai rõ ràng."
        />
        <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <MotionReveal key={service.slug} delay={index * 0.03}>
              <Link href={`/dich-vu/${service.slug}`} className="group block h-full">
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-cyan">
                  <CardHeader className="p-5 sm:p-6">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-accent">
                      <ServiceIcon name={service.icon} />
                    </div>
                    <CardTitle className="text-xl sm:text-[24px]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
                    <p className="text-sm leading-6 text-muted-foreground">{service.short_description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Xem chi tiết <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
