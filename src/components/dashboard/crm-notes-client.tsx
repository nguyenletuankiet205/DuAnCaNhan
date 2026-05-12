"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { addLeadNoteAction } from "@/actions/dashboard-actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { DashboardLead } from "@/types/domain";

export function CrmNotesClient({ leads, csrfToken }: { leads: DashboardLead[]; csrfToken: string }) {
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      const result = await addLeadNoteAction({
        leadId: formData.get("leadId"),
        content: formData.get("content"),
        csrfToken
      });
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <form action={submit} className="glass-card grid gap-4 rounded-lg p-6">
      <div className="space-y-2">
        <Label>Khách hàng</Label>
        <select name="leadId" className="focus-ring h-11 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm text-white">
          {leads.map((lead) => <option key={lead.id} value={lead.id}>{lead.full_name} · {lead.phone}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <Label>Ghi chú CRM</Label>
        <Textarea name="content" placeholder="Ví dụ: Khách quan tâm gói Growth, hẹn gọi lại vào chiều thứ Sáu." />
      </div>
      <Button type="submit" variant="gradient" disabled={pending || leads.length === 0}>
        {pending ? "Đang lưu ghi chú..." : "Thêm ghi chú"}
      </Button>
    </form>
  );
}
