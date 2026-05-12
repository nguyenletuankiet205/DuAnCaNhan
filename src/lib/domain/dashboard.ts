import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CampaignMetric, DashboardLead, DashboardOrder, DashboardPayment } from "@/types/domain";

export async function getDashboardStats() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return {
      leadCount: 0,
      wonLeadCount: 0,
      revenue: 0,
      activeCampaigns: 0
    };
  }

  const [leads, wonLeads, payments, campaigns] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "won"),
    supabase.from("payments").select("amount").eq("payment_status", "paid"),
    supabase.from("campaign_metrics").select("campaign_name")
  ]);

  return {
    leadCount: leads.count ?? 0,
    wonLeadCount: wonLeads.count ?? 0,
    revenue: payments.data?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0,
    activeCampaigns: new Set(campaigns.data?.map((item) => item.campaign_name)).size
  };
}

export async function getDashboardLeads(): Promise<DashboardLead[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("leads")
    .select("id,full_name,phone,email,industry,service_interest,budget_range,message,status,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return data ?? [];
}

export async function getDashboardOrders(): Promise<DashboardOrder[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("service_orders")
    .select("id,status,total_amount,currency,due_date,created_at,services(title),leads(full_name)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return (data ?? []).map((order) => ({
    id: order.id,
    status: order.status,
    total_amount: order.total_amount,
    currency: order.currency,
    due_date: order.due_date,
    created_at: order.created_at,
    service: Array.isArray(order.services) ? order.services[0] ?? null : order.services,
    lead: Array.isArray(order.leads) ? order.leads[0] ?? null : order.leads
  }));
}

export async function getDashboardPayments(): Promise<DashboardPayment[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("payments")
    .select("id,amount,currency,payment_status,provider,due_date,paid_at,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return [];
  return data ?? [];
}

export async function getCampaignMetrics(): Promise<CampaignMetric[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return [
      {
        id: "demo-1",
        campaign_name: "Growth Q2 - Nội thất",
        channel: "Facebook Ads",
        report_date: new Date().toISOString().slice(0, 10),
        impressions: 120000,
        clicks: 5400,
        leads: 186,
        spend: 42000000,
        revenue: 156000000,
        conversion_rate: 3.44
      }
    ];
  }

  const { data, error } = await supabase.from("campaign_metrics").select("*").order("report_date", { ascending: true }).limit(120);
  if (error) return [];
  return data ?? [];
}

export async function getDashboardBlogPosts() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,slug,status,published_at,updated_at,blog_categories(name)")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export async function getBlogPostForEdit(id: string) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function getBlogCategoriesForDashboard() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("blog_categories").select("id,name,slug").order("name");
  if (error) return [];
  return data ?? [];
}

export async function getLeadNotes() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("lead_notes")
    .select("id,content,created_at,leads(full_name,email)")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) return [];
  return data ?? [];
}

export async function getMediaAssets() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false }).limit(80);
  if (error) return [];
  return data ?? [];
}
