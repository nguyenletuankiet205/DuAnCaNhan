import "server-only";
import { Resend } from "resend";
import { buildAdminLeadEmail, buildCustomerConfirmationEmail } from "../../../emails/lead-emails";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { LeadInput } from "@/lib/validation";

type SendLeadEmailOptions = {
  leadId: string;
  lead: LeadInput;
};

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

async function wasEmailSent(leadId: string, eventType: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return false;
  const { data } = await supabase.from("audit_logs").select("id").eq("entity_type", "lead").eq("entity_id", leadId).eq("event_type", eventType).maybeSingle();
  return Boolean(data);
}

async function markEmailSent(leadId: string, eventType: string, metadata: Record<string, string>) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return;
  await supabase.from("audit_logs").insert({
    event_type: eventType,
    entity_type: "lead",
    entity_id: leadId,
    metadata
  });
}

export async function sendLeadEmails({ leadId, lead }: SendLeadEmailOptions) {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!resend || !from || !adminEmail) {
    await markEmailSent(leadId, "lead_email_skipped", { reason: "missing_email_env" });
    return;
  }

  if (!(await wasEmailSent(leadId, "lead_admin_email_sent"))) {
    const email = buildAdminLeadEmail(lead);
    const result = await resend.emails.send({
      from,
      to: adminEmail,
      subject: email.subject,
      html: email.html,
      text: email.text,
      headers: {
        "X-Entity-Ref-ID": `midigi-lead-admin-${leadId}`
      }
    });
    await markEmailSent(leadId, "lead_admin_email_sent", { resendId: result.data?.id ?? "unknown" });
  }

  if (!(await wasEmailSent(leadId, "lead_customer_email_sent"))) {
    const email = buildCustomerConfirmationEmail(lead);
    const result = await resend.emails.send({
      from,
      to: lead.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
      headers: {
        "X-Entity-Ref-ID": `midigi-lead-customer-${leadId}`
      }
    });
    await markEmailSent(leadId, "lead_customer_email_sent", { resendId: result.data?.id ?? "unknown" });
  }
}
