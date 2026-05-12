"use client";

import dynamic from "next/dynamic";
import type { CampaignMetric } from "@/types/domain";

const CampaignChart = dynamic(() => import("@/components/charts/campaign-chart"), {
  loading: () => <div className="flex h-80 items-center justify-center text-sm text-muted-foreground">Đang tải biểu đồ hiệu suất...</div>
});

export function CampaignChartLoader({ data }: { data: CampaignMetric[] }) {
  return <CampaignChart data={data} />;
}
