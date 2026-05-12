import type { Metadata } from "next";
import { CrmNotesClient } from "@/components/dashboard/crm-notes-client";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getDashboardLeads, getLeadNotes } from "@/lib/domain/dashboard";
import { getCsrfToken } from "@/lib/security/csrf";
import { formatDateVi } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Ghi chú CRM | MIDIGI",
  description: "Ghi chú chăm sóc khách hàng trong dashboard MIDIGI.",
  path: "/dashboard/crm",
  noIndex: true
});

export default async function CrmPage() {
  await requireRole(["sale", "marketing"]);
  const [leads, notes, csrfToken] = await Promise.all([getDashboardLeads(), getLeadNotes(), getCsrfToken()]);
  return (
    <div>
      <DashboardPageHeader title="CRM notes" description="Ghi lại bối cảnh tư vấn, nhu cầu, lịch hẹn và bước tiếp theo cho từng khách hàng." />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
        <CrmNotesClient leads={leads} csrfToken={csrfToken} />
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Ghi chú gần đây</h2>
          <div className="mt-5 space-y-4">
            {notes.map((note) => (
              <article key={note.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm leading-6 text-slate-200">{note.content}</p>
                <p className="mt-3 text-xs text-muted-foreground">{formatDateVi(note.created_at)}</p>
              </article>
            ))}
            {notes.length === 0 ? <p className="text-sm text-muted-foreground">Chưa có ghi chú CRM nào.</p> : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
