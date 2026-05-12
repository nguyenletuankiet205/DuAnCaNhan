import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/sections/shared/section-heading";
import type { FaqItem } from "@/types/domain";

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="bg-slate-950/50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Câu hỏi thường gặp"
          title="Thông tin cần biết trước khi bắt đầu"
          description="Các câu trả lời dưới đây giúp bạn đánh giá cách MIDIGI làm việc. Việc dùng FAQPage hỗ trợ công cụ tìm kiếm hiểu nội dung tốt hơn, không đồng nghĩa với cam kết hiển thị rich results."
        />
        <div className="mt-7 space-y-3 sm:mt-10 sm:space-y-4">
          {faqs.map((item) => (
            <details key={item.id} className="glass-card group rounded-lg p-5 sm:p-6">
              <summary className="cursor-pointer list-none text-[15px] font-semibold leading-6 text-white sm:text-base">
                {item.question}
                <span className="float-right text-accent group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
