import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orderStatusLabels } from "@/db/enums";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getDashboardOrders } from "@/lib/domain/dashboard";
import { formatCurrencyVnd, formatDateVi } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Quản lý đơn dịch vụ | MIDIGI",
  description: "Theo dõi đơn dịch vụ trong dashboard MIDIGI.",
  path: "/dashboard/orders",
  noIndex: true
});

export default async function OrdersPage() {
  await requireRole(["sale"]);
  const orders = await getDashboardOrders();
  return (
    <div>
      <DashboardPageHeader title="Quản lý đơn dịch vụ" description="Theo dõi trạng thái triển khai, giá trị hợp đồng và thời hạn của từng đơn dịch vụ." />
      <div className="glass-card rounded-lg">
        <Table>
          <TableHeader><TableRow><TableHead>Dịch vụ</TableHead><TableHead>Khách hàng</TableHead><TableHead>Giá trị</TableHead><TableHead>Trạng thái</TableHead><TableHead>Ngày tạo</TableHead></TableRow></TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.service?.title ?? "Chưa có dịch vụ"}</TableCell>
                <TableCell>{order.lead?.full_name ?? "Không gắn lead"}</TableCell>
                <TableCell>{formatCurrencyVnd(order.total_amount)}</TableCell>
                <TableCell><Badge variant="cyan">{orderStatusLabels[order.status]}</Badge></TableCell>
                <TableCell>{formatDateVi(order.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.length === 0 ? <p className="p-8 text-center text-muted-foreground">Chưa có đơn dịch vụ nào.</p> : null}
      </div>
    </div>
  );
}
