import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { paymentStatusLabels } from "@/db/enums";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getDashboardPayments } from "@/lib/domain/dashboard";
import { formatCurrencyVnd, formatDateVi } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Quản lý thanh toán | MIDIGI",
  description: "Theo dõi thanh toán và công nợ trong dashboard MIDIGI.",
  path: "/dashboard/payments",
  noIndex: true
});

export default async function PaymentsPage() {
  await requireRole(["sale"]);
  const payments = await getDashboardPayments();
  return (
    <div>
      <DashboardPageHeader title="Quản lý thanh toán" description="Theo dõi khoản chờ thanh toán, đã thanh toán, quá hạn và hoàn tiền." />
      <div className="glass-card rounded-lg">
        <Table>
          <TableHeader><TableRow><TableHead>Số tiền</TableHead><TableHead>Trạng thái</TableHead><TableHead>Nhà cung cấp</TableHead><TableHead>Ngày đến hạn</TableHead><TableHead>Ngày tạo</TableHead></TableRow></TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{formatCurrencyVnd(payment.amount)}</TableCell>
                <TableCell><Badge variant={payment.payment_status === "paid" ? "success" : payment.payment_status === "overdue" ? "destructive" : "warning"}>{paymentStatusLabels[payment.payment_status]}</Badge></TableCell>
                <TableCell>{payment.provider}</TableCell>
                <TableCell>{payment.due_date ? formatDateVi(payment.due_date) : "Chưa đặt hạn"}</TableCell>
                <TableCell>{formatDateVi(payment.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {payments.length === 0 ? <p className="p-8 text-center text-muted-foreground">Chưa có khoản thanh toán nào.</p> : null}
      </div>
    </div>
  );
}
