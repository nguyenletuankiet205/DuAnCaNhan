import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getServices } from "@/lib/domain/marketing";
import { ServicesSection } from "@/sections/home/services-section";
import { FinalCtaSection } from "@/sections/home/final-cta-section";

export const metadata: Metadata = createMetadata({
  title: "Dịch vụ Marketing MIDIGI - Website, Ads, Branding, Growth",
  description: "Khám phá 10 dịch vụ marketing trọng tâm của MIDIGI dành cho doanh nghiệp nhỏ và vừa, startup, shop online, local business và thương hiệu cá nhân.",
  path: "/dich-vu"
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <main>
      <ServicesSection services={services} />
      <FinalCtaSection />
    </main>
  );
}
