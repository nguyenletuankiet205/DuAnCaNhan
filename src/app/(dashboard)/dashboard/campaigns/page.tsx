import type { Metadata } from "next";
import { CampaignChartLoader } from "@/components/charts/campaign-chart-loader";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { requireRole } from "@/lib/auth";
import { getCampaignMetrics } from "@/lib/domain/dashboard";

export const metadata: Metadata = createMetadata({
  title: "Theo dõi hiệu suất chiến dịch | MIDIGI",
  description: "Báo cáo hiệu suất campaign trong dashboard MIDIGI.",
  path: "/dashboard/campaigns",
  noIndex: true
});

export default async function CampaignsPage() {
  await requireRole(["marketing"]);
  const metrics = await getCampaignMetrics();
  return (
    <div>
      <DashboardPageHeader title="Theo dõi hiệu suất chiến dịch" description="Theo dõi impressions, clicks, lead, chi phí, doanh thu và tỷ lệ chuyển đổi theo từng kênh." />
      <Card className="p-6">
        <CampaignChartLoader data={metrics} />
      </Card>
    </div>
  );
}
