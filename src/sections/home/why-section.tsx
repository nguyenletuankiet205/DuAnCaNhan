import { Award, CheckCircle2, Clock3, LineChart, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/sections/shared/section-heading";

const items = [
  { icon: Award, value: "5+ năm", label: "kinh nghiệm triển khai marketing tăng trưởng" },
  { icon: ShieldCheck, value: "100+", label: "khách hàng SME, startup và thương hiệu cá nhân" },
  { icon: LineChart, value: "500+", label: "chiến dịch được đo lường và tối ưu liên tục" },
  { icon: Clock3, value: "Tỷ lệ chuyển đổi cao", label: "nhờ kết hợp chiến lược, nội dung, UI và dữ liệu" }
];

export function WhySection() {
  return (
    <section className="bg-slate-950/50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          align="left"
          eyebrow="Vì sao chọn MIDIGI"
          title="Một đội ngũ làm marketing bằng chiến lược, dữ liệu và gu thương hiệu"
          description="Chúng tôi không chạy theo chỉ số bề mặt. MIDIGI tập trung vào lead chất lượng, trải nghiệm chuyển đổi và khả năng vận hành lâu dài."
        />
        <div className="glass-card rounded-lg p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.value} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <item.icon className="size-5" />
                  </div>
                  <p className="text-2xl font-bold leading-tight text-white">{item.value}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
            {["Không hứa kết quả thiếu cơ sở", "Báo cáo rõ bằng dữ liệu", "Ưu tiên lead có khả năng chốt"].map((item) => (
              <div key={item} className="flex gap-2 text-sm leading-6 text-slate-200">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
