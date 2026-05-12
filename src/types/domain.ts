import type { BlogStatus, LeadStatus, OrderStatus, PaymentStatus, ServiceType } from "@/types/database.types";

export type Service = {
  id: string;
  service_type: ServiceType;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  icon: string;
  starting_price: number;
  display_order: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  slug: string;
  description: string;
  monthly_price: number;
  setup_fee: number;
  features: string[];
  is_recommended: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  role: string;
  company: string;
  avatar_url: string | null;
  quote: string;
  rating: number;
};

export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  seo_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  status: BlogStatus;
  published_at: string | null;
  category?: { name: string; slug: string } | null;
};

export type BlogPostDetail = BlogPostSummary & {
  content_html: string;
  created_at: string;
  updated_at: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  client_logo_url: string | null;
  cover_image_url: string | null;
  industry: string;
  challenge: string;
  solution: string;
  result_summary: string;
  content_html: string;
  revenue_growth: number;
  lead_growth: number;
  conversion_rate: number;
  published_at: string | null;
};

export type DashboardLead = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  industry: string;
  service_interest: ServiceType;
  budget_range: string;
  message: string;
  status: LeadStatus;
  created_at: string;
};

export type DashboardOrder = {
  id: string;
  status: OrderStatus;
  total_amount: number;
  currency: string;
  due_date: string | null;
  created_at: string;
  service?: { title: string } | null;
  lead?: { full_name: string } | null;
};

export type DashboardPayment = {
  id: string;
  amount: number;
  currency: string;
  payment_status: PaymentStatus;
  provider: string;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
};

export type CampaignMetric = {
  id: string;
  campaign_name: string;
  channel: string;
  report_date: string;
  impressions: number;
  clicks: number;
  leads: number;
  spend: number;
  revenue: number;
  conversion_rate: number;
};
