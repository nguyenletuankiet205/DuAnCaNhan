import { Star } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/sections/shared/section-heading";
import type { Testimonial } from "@/types/domain";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-slate-950/50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Khách hàng nói gì" title="Niềm tin đến từ cách làm rõ ràng và bám sát mục tiêu" />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <MotionReveal key={item.id} delay={index * 0.05}>
              <article className="glass-card h-full rounded-lg p-5 sm:p-6">
                <div className="flex gap-1 text-warning">
                  {Array.from({ length: item.rating }).map((_, star) => (
                    <Star key={star} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-200">“{item.quote}”</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{item.customer_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.role}, {item.company}
                  </p>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
