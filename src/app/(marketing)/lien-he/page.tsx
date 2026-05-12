import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import { getCsrfToken } from "@/lib/security/csrf";
import { SectionHeading } from "@/sections/shared/section-heading";

export const metadata: Metadata = createMetadata({
  title: "Liên hệ MIDIGI - Nhận tư vấn Marketing miễn phí",
  description: "Gửi nhu cầu tư vấn website, quảng cáo, thương hiệu hoặc growth consulting. MIDIGI sẽ phản hồi với lộ trình phù hợp cho doanh nghiệp của bạn.",
  path: "/lien-he"
});

export default async function ContactPage() {
  const csrfToken = await getCsrfToken();
  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.75fr_1fr] lg:gap-10">
        <div>
          <SectionHeading align="left" eyebrow="Liên hệ" title="Trao đổi với MIDIGI về mục tiêu tăng trưởng của bạn" description="Hãy để lại thông tin. Đội ngũ MIDIGI sẽ liên hệ để hiểu bài toán, ngân sách và đề xuất hướng triển khai rõ ràng." />
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p className="flex gap-3"><Phone className="size-5 text-accent" /> {siteConfig.phone}</p>
            <p className="flex gap-3"><Mail className="size-5 text-accent" /> {siteConfig.email}</p>
            <p className="flex gap-3"><MapPin className="size-5 text-accent" /> {siteConfig.address}</p>
          </div>
        </div>
        <div className="glass-card rounded-lg p-4 sm:p-6">
          <LeadForm csrfToken={csrfToken} />
        </div>
      </div>
    </main>
  );
}
