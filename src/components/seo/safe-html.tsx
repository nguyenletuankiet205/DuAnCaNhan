import { sanitizeRichHtml } from "@/lib/security/sanitize";

export function SafeHtml({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(html) }} />;
}
