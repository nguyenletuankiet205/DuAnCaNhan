import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getPricingPlans } from "@/lib/domain/marketing";
import { PricingSection } from "@/sections/home/pricing-section";
import { FinalCtaSection } from "@/sections/home/final-cta-section";

export const metadata: Metadata = createMetadata({
  title: "Bảng giá dịch vụ Marketing MIDIGI",
  description: "Tham khảo các gói Starter, Growth và Premium của MIDIGI cho website, quảng cáo, branding và growth consulting.",
  path: "/bang-gia"
});

export default async function PricingPage() {
  const plans = await getPricingPlans();
  return (
    <main>
      <PricingSection plans={plans} />
      <FinalCtaSection />
    </main>
  );
}
