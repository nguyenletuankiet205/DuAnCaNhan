import type { Metadata } from "next";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getDashboardLeads } from "@/lib/domain/dashboard";
import { getCsrfToken } from "@/lib/security/csrf";

export const metadata: Metadata = createMetadata({
  title: "Quản lý khách hàng tiềm năng | MIDIGI",
  description: "Danh sách lead và trạng thái chăm sóc trong dashboard MIDIGI.",
  path: "/dashboard/leads",
  noIndex: true
});

export default async function LeadsPage() {
  await requireRole(["sale", "marketing"]);
  const [leads, csrfToken] = await Promise.all([getDashboardLeads(), getCsrfToken()]);
  return (
    <div>
      <DashboardPageHeader title="Quản lý khách hàng tiềm năng" description="Theo dõi lead mới, cập nhật trạng thái chăm sóc và ưu tiên cơ hội có khả năng chuyển đổi cao." />
      <LeadsTable leads={leads} csrfToken={csrfToken} />
    </div>
  );
}
