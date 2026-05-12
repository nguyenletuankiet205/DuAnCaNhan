"use server";

import { headers } from "next/headers";
import { leadInputSchema } from "@/lib/validation";
import { assertServerActionCsrf } from "@/lib/security/csrf";
import { hashRequestValue } from "@/lib/security/hash";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitizePhone, sanitizeText } from "@/lib/security/sanitize";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendLeadEmails } from "@/lib/email/service";

export type LeadActionResult = {
  ok: boolean;
  message: string;
};

export async function submitLeadAction(input: unknown): Promise<LeadActionResult> {
  const parsed = leadInputSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Thông tin tư vấn chưa hợp lệ" };
  }

  try {
    await assertServerActionCsrf(parsed.data.csrfToken);
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Phiên gửi biểu mẫu không hợp lệ" };
  }

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const userAgent = headerStore.get("user-agent") ?? "unknown";
  const rateKey = `lead:${hashRequestValue(ip)}:${parsed.data.email.toLowerCase()}`;
  const limited = checkRateLimit(rateKey, { limit: 3, windowMs: 60 * 60 * 1000 });

  if (!limited.allowed) {
    return { ok: false, message: `Bạn đã gửi yêu cầu gần đây. Vui lòng thử lại sau ${limited.retryAfter} giây.` };
  }

  const clean = {
    ...parsed.data,
    fullName: sanitizeText(parsed.data.fullName),
    phone: sanitizePhone(parsed.data.phone),
    email: sanitizeText(parsed.data.email).toLowerCase(),
    industry: sanitizeText(parsed.data.industry),
    budgetRange: sanitizeText(parsed.data.budgetRange),
    message: sanitizeText(parsed.data.message)
  };

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return { ok: false, message: "Hệ thống nhận tư vấn chưa sẵn sàng. Vui lòng liên hệ MIDIGI qua email hoặc điện thoại." };
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      full_name: clean.fullName,
      phone: clean.phone,
      email: clean.email,
      industry: clean.industry,
      service_interest: clean.serviceInterest,
      budget_range: clean.budgetRange,
      message: clean.message,
      ip_hash: hashRequestValue(ip),
      user_agent_hash: hashRequestValue(userAgent)
    })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, message: "MIDIGI chưa thể lưu yêu cầu lúc này. Vui lòng thử lại sau ít phút." };
  }

  await supabase.from("audit_logs").insert({
    event_type: "lead_submitted",
    entity_type: "lead",
    entity_id: data.id,
    ip_hash: hashRequestValue(ip),
    metadata: {
      source: "website",
      serviceInterest: clean.serviceInterest
    }
  });

  await sendLeadEmails({ leadId: data.id, lead: clean });

  return {
    ok: true,
    message: "MIDIGI đã nhận thông tin. Đội ngũ tư vấn sẽ liên hệ bạn trong thời gian sớm nhất."
  };
}
