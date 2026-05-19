"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrencyVnd } from "@/lib/utils";
import type { CampaignMetric } from "@/types/domain";

export default function CampaignChart({ data }: { data: CampaignMetric[] }) {
  return (
    <div className="h-80 w-full">
     <ResponsiveContainer width="100%" height={300}>
   <BarChart data={data}>
          <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />
          <XAxis dataKey="channel" stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} />
          <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(37,99,235,0.12)" }}
            contentStyle={{ background: "#0F172A", border: "1px solid #1E293B", borderRadius: 8, color: "#fff" }}
            formatter={(value, name) => (name === "revenue" || name === "spend" ? formatCurrencyVnd(Number(value)) : value)}
            labelStyle={{ color: "#fff" }}
          />
          <Bar dataKey="leads" name="Lead" fill="#06B6D4" radius={[6, 6, 0, 0]} />
          <Bar dataKey="revenue" name="Doanh thu" fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
