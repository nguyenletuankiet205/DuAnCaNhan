"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateLeadStatusAction } from "@/actions/dashboard-actions";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leadStatusLabels, serviceTypeOptions } from "@/db/enums";
import { formatDateVi } from "@/lib/utils";
import type { DashboardLead } from "@/types/domain";
import type { LeadStatus } from "@/types/database.types";

export function LeadsTable({ leads, csrfToken }: { leads: DashboardLead[]; csrfToken: string }) {
  const [isPending, startTransition] = useTransition();

  function onStatusChange(leadId: string, status: LeadStatus) {
    startTransition(async () => {
      const result = await updateLeadStatusAction({ leadId, status, csrfToken });
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  if (leads.length === 0) {
    return <p className="glass-card rounded-lg p-8 text-center text-muted-foreground">Chưa có khách hàng tiềm năng nào.</p>;
  }

  return (
    <div className="glass-card rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Dịch vụ</TableHead>
            <TableHead>Ngân sách</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày gửi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <p className="font-semibold text-white">{lead.full_name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{lead.phone} · {lead.email}</p>
                <p className="mt-1 text-xs text-muted-foreground">{lead.industry}</p>
              </TableCell>
              <TableCell>{serviceTypeOptions.find((item) => item.value === lead.service_interest)?.label}</TableCell>
              <TableCell>{lead.budget_range}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Badge variant={lead.status === "won" ? "success" : lead.status === "lost" ? "destructive" : "cyan"}>{leadStatusLabels[lead.status]}</Badge>
                  <select
                    className="focus-ring h-9 rounded-md border border-border bg-slate-950 px-2 text-xs text-white"
                    defaultValue={lead.status}
                    disabled={isPending}
                    onChange={(event) => onStatusChange(lead.id, event.target.value as LeadStatus)}
                  >
                    {Object.entries(leadStatusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
              <TableCell>{formatDateVi(lead.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
