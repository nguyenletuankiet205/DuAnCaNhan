import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/sections/shared/section-heading";

export function LeadCaptureSection({ csrfToken }: { csrfToken: string }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-10">
        <SectionHeading
          align="left"
          eyebrow="Tư vấn miễn phí"
          title="Nhận đề xuất marketing phù hợp với giai đoạn của bạn"
          description="Chia sẻ mục tiêu, ngành nghề và ngân sách dự kiến. MIDIGI sẽ phản hồi bằng hướng đi thực tế thay vì một gói dịch vụ chung chung."
        />
        <div className="glass-card rounded-lg p-4 sm:p-6">
          <LeadForm csrfToken={csrfToken} />
        </div>
      </div>
    </section>
  );
}
