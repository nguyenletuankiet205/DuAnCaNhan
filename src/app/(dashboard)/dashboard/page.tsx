import type { Metadata } from "next";
import { BarChart3, Target, TrendingUp, UsersRound } from "lucide-react";
import { CampaignChartLoader } from "@/components/charts/campaign-chart-loader";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { getCampaignMetrics, getDashboardStats } from "@/lib/domain/dashboard";
import { formatCurrencyVnd } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Tổng quan Dashboard MIDIGI",
  description: "Bảng điều khiển quản trị MIDIGI.",
  path: "/dashboard",
  noIndex: true
});

export default async function DashboardPage() {
  const [stats, metrics] = await Promise.all([getDashboardStats(), getCampaignMetrics()]);

  return (
    <div>
      <DashboardPageHeader title="Tổng quan vận hành" description="Theo dõi nhanh lead, doanh thu, chiến dịch và tỷ lệ chốt của hệ thống MIDIGI." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={UsersRound} title="Khách hàng tiềm năng" value={stats.leadCount.toString()} description="Tổng số lead đã ghi nhận từ website và các kênh tích hợp." />
        <StatCard icon={Target} title="Lead đã chốt" value={stats.wonLeadCount.toString()} description="Số khách hàng đã chuyển đổi thành cơ hội doanh thu." />
        <StatCard icon={TrendingUp} title="Doanh thu đã thanh toán" value={formatCurrencyVnd(stats.revenue)} description="Tổng doanh thu từ các khoản thanh toán đã xác nhận." />
        <StatCard icon={BarChart3} title="Chiến dịch hoạt động" value={stats.activeCampaigns.toString()} description="Số chiến dịch có dữ liệu hiệu suất trong hệ thống." />
      </div>
      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold text-white">Hiệu suất chiến dịch</h2>
        <p className="mt-2 text-sm text-muted-foreground">Biểu đồ được tải trong client boundary nhỏ để giảm tải server và client bundle ngoài dashboard.</p>
        <div className="mt-6">
          <CampaignChartLoader data={metrics} />
        </div>
      </Card>
    </div>
  );
}
