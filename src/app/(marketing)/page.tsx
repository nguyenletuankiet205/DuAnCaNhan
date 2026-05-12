import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import { getCsrfToken } from "@/lib/security/csrf";
import { getBlogPosts, getCaseStudies, getFaqItems, getPricingPlans, getServices, getTestimonials } from "@/lib/domain/marketing";
import { CaseStudiesSection } from "@/sections/home/case-studies-section";
import { FaqSection } from "@/sections/home/faq-section";
import { FinalCtaSection } from "@/sections/home/final-cta-section";
import { HeroSection } from "@/sections/home/hero-section";
import { LeadCaptureSection } from "@/sections/home/lead-capture-section";
import { PricingSection } from "@/sections/home/pricing-section";
import { ServicesSection } from "@/sections/home/services-section";
import { TestimonialsSection } from "@/sections/home/testimonials-section";
import { WhySection } from "@/sections/home/why-section";

export const metadata: Metadata = createMetadata({
  title: "MIDIGI - Giải pháp Marketing giúp doanh nghiệp tăng trưởng bền vững",
  description: "Thiết kế website, quảng cáo đa nền tảng, xây dựng thương hiệu và tối ưu chuyển đổi cho SME, startup, shop online và thương hiệu cá nhân tại Việt Nam."
});

export default async function HomePage() {
  const [services, caseStudies, testimonials, plans, faqs, csrfToken] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getTestimonials(),
    getPricingPlans(),
    getFaqItems(),
    getCsrfToken()
  ]);
  await getBlogPosts();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.fullName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/favicon.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: siteConfig.address,
    sameAs: Object.values(siteConfig.socials)
  };

  return (
    <main>
      <JsonLd data={organizationJsonLd} />
      <HeroSection />
      <ServicesSection services={services} />
      <WhySection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <TestimonialsSection testimonials={testimonials} />
      <PricingSection plans={plans} />
      <FaqSection faqs={faqs} />
      <LeadCaptureSection csrfToken={csrfToken} />
      <FinalCtaSection />
    </main>
  );
}
