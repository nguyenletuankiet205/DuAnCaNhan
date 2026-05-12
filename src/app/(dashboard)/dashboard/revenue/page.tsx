import type { Metadata } from "next";
import { CreditCard, TrendingUp } from "lucide-react";
import { CampaignChartLoader } from "@/components/charts/campaign-chart-loader";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getCampaignMetrics, getDashboardStats } from "@/lib/domain/dashboard";
import { formatCurrencyVnd } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Thống kê doanh thu | MIDIGI",
  description: "Thống kê doanh thu trong dashboard MIDIGI.",
  path: "/dashboard/revenue",
  noIndex: true
});

export default async function RevenuePage() {
  await requireRole(["sale"]);
  const [stats, metrics] = await Promise.all([getDashboardStats(), getCampaignMetrics()]);
  return (
    <div>
      <DashboardPageHeader title="Thống kê doanh thu" description="Đối chiếu doanh thu đã thanh toán với hiệu suất lead và chiến dịch." />
      <div className="grid gap-5 md:grid-cols-2">
        <StatCard icon={CreditCard} title="Doanh thu xác nhận" value={formatCurrencyVnd(stats.revenue)} description="Tổng các thanh toán đã ghi nhận trạng thái đã thanh toán." />
        <StatCard icon={TrendingUp} title="Lead đã chốt" value={stats.wonLeadCount.toString()} description="Số lead đã chuyển đổi thành khách hàng hoặc cơ hội doanh thu." />
      </div>
      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold text-white">Doanh thu theo chiến dịch</h2>
        <div className="mt-6"><CampaignChartLoader data={metrics} /></div>
      </Card>
    </div>
  );
}
