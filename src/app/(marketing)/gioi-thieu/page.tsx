import type { Metadata } from "next";
import { Award, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/sections/shared/section-heading";

export const metadata: Metadata = createMetadata({
  title: "Giới thiệu MIDIGI - Đối tác marketing tăng trưởng tại Việt Nam",
  description: "Tìm hiểu cách MIDIGI đồng hành cùng SME, startup, chủ shop online, local business và thương hiệu cá nhân bằng chiến lược, dữ liệu và thiết kế chuyển đổi.",
  path: "/gioi-thieu"
});

const values = [
  { icon: Compass, title: "Chiến lược trước công cụ", description: "MIDIGI bắt đầu từ mục tiêu kinh doanh, chân dung khách hàng và lợi thế cạnh tranh thay vì chọn kênh theo thói quen." },
  { icon: ShieldCheck, title: "Minh bạch bằng dữ liệu", description: "Mỗi chiến dịch đều có KPI, tracking và báo cáo giúp chủ doanh nghiệp biết điều gì đang tạo ra kết quả." },
  { icon: Award, title: "Gu thương hiệu chỉn chu", description: "Chúng tôi kết hợp hiệu suất với hình ảnh chuyên nghiệp để doanh nghiệp vừa bán tốt vừa xây niềm tin dài hạn." },
  { icon: HeartHandshake, title: "Đồng hành thực tế", description: "MIDIGI làm việc gần với đội sale, vận hành và founder để giải pháp có thể triển khai trong nguồn lực hiện có." }
];

export default function AboutPage() {
  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Giới thiệu" title="MIDIGI giúp doanh nghiệp Việt tăng trưởng bằng marketing có hệ thống" description="Chúng tôi là đội ngũ kết hợp chiến lược marketing, thiết kế trải nghiệm, quảng cáo hiệu suất, nội dung thương hiệu và tối ưu chuyển đổi." />
        <section className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-[0.85fr_1fr] lg:gap-6">
          <div className="glass-card rounded-lg p-5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">MIDIGI approach</p>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">Tăng trưởng không đến từ một mẫu quảng cáo đẹp đơn lẻ</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
              Một hệ thống marketing hiệu quả cần thông điệp đúng, kênh phù hợp, trang đích chuyển đổi, dữ liệu đáng tin và quy trình xử lý lead rõ ràng. MIDIGI xây các mảnh ghép đó thành một luồng vận hành có thể đo, học và tối ưu.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((item) => (
              <article key={item.title} className="glass-card rounded-lg p-5 sm:p-6">
                <item.icon className="size-7 text-accent" />
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
