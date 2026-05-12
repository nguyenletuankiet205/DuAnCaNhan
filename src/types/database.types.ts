export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export type ServiceType =
  | "business_website"
  | "conversion_landing_page"
  | "facebook_ads"
  | "google_ads"
  | "fanpage_setup"
  | "facebook_group_setup"
  | "personal_branding"
  | "marketing_strategy"
  | "marketing_audit"
  | "growth_consulting";
export type UserRole = "admin" | "sale" | "marketing";
export type OrderStatus = "draft" | "active" | "paused" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "overdue" | "refunded" | "cancelled";
export type BlogStatus = "draft" | "published" | "archived";

type TableRow<T> = T;
type TableInsert<T> = Partial<T>;
type TableUpdate<T> = Partial<T>;

export type Database = {
  public: {
    Enums: {
      lead_status: LeadStatus;
      service_type: ServiceType;
      user_role: UserRole;
      order_status: OrderStatus;
      payment_status: PaymentStatus;
      blog_status: BlogStatus;
    };
    Tables: {
      profiles: {
        Row: TableRow<{
          id: string;
          full_name: string;
          avatar_url: string | null;
          phone: string | null;
          position: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["profiles"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [];      };
      user_roles: {
        Row: TableRow<{ user_id: string; role: UserRole; created_at: string; updated_at: string }>;
        Insert: TableInsert<Database["public"]["Tables"]["user_roles"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["user_roles"]["Row"]>;
        Relationships: [];      };
      services: {
        Row: TableRow<{
          id: string;
          service_type: ServiceType;
          slug: string;
          title: string;
          short_description: string;
          description: string;
          icon: string;
          starting_price: number;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["services"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["services"]["Row"]>;
        Relationships: [];      };
      leads: {
        Row: TableRow<{
          id: string;
          full_name: string;
          phone: string;
          email: string;
          industry: string;
          service_interest: ServiceType;
          budget_range: string;
          message: string;
          status: LeadStatus;
          source: string;
          utm_source: string | null;
          ip_hash: string | null;
          user_agent_hash: string | null;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["leads"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["leads"]["Row"]>;
        Relationships: [];      };
      lead_notes: {
        Row: TableRow<{ id: string; lead_id: string; author_id: string | null; content: string; created_at: string }>;
        Insert: TableInsert<Database["public"]["Tables"]["lead_notes"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["lead_notes"]["Row"]>;
        Relationships: [];      };
      service_orders: {
        Row: TableRow<{
          id: string;
          lead_id: string | null;
          service_id: string;
          owner_id: string | null;
          status: OrderStatus;
          total_amount: number;
          currency: string;
          start_date: string | null;
          due_date: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["service_orders"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["service_orders"]["Row"]>;
        Relationships: [];      };
      payments: {
        Row: TableRow<{
          id: string;
          order_id: string;
          amount: number;
          currency: string;
          payment_status: PaymentStatus;
          provider: string;
          transaction_reference: string | null;
          paid_at: string | null;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["payments"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["payments"]["Row"]>;
        Relationships: [];      };
      blog_categories: {
        Row: TableRow<{ id: string; name: string; slug: string; description: string | null; created_at: string; updated_at: string }>;
        Insert: TableInsert<Database["public"]["Tables"]["blog_categories"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["blog_categories"]["Row"]>;
        Relationships: [];      };
      blog_tags: {
        Row: TableRow<{ id: string; name: string; slug: string; created_at: string }>;
        Insert: TableInsert<Database["public"]["Tables"]["blog_tags"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["blog_tags"]["Row"]>;
        Relationships: [];      };
      blog_posts: {
        Row: TableRow<{
          id: string;
          author_id: string | null;
          category_id: string | null;
          title: string;
          slug: string;
          excerpt: string;
          content_html: string;
          cover_image_url: string | null;
          seo_title: string | null;
          meta_description: string | null;
          og_image_url: string | null;
          status: BlogStatus;
          published_at: string | null;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["blog_posts"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["blog_posts"]["Row"]>;
        Relationships: [];      };
      blog_post_tags: {
        Row: TableRow<{ post_id: string; tag_id: string }>;
        Insert: TableInsert<Database["public"]["Tables"]["blog_post_tags"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["blog_post_tags"]["Row"]>;
        Relationships: [];      };
      case_studies: {
        Row: TableRow<{
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
          status: BlogStatus;
          published_at: string | null;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["case_studies"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["case_studies"]["Row"]>;
        Relationships: [];      };
      testimonials: {
        Row: TableRow<{
          id: string;
          customer_name: string;
          role: string;
          company: string;
          avatar_url: string | null;
          quote: string;
          rating: number;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Relationships: [];      };
      faq_items: {
        Row: TableRow<{
          id: string;
          question: string;
          answer: string;
          category: string;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["faq_items"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["faq_items"]["Row"]>;
        Relationships: [];      };
      pricing_plans: {
        Row: TableRow<{
          id: string;
          name: string;
          slug: string;
          description: string;
          monthly_price: number;
          setup_fee: number;
          features: Json;
          is_recommended: boolean;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["pricing_plans"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["pricing_plans"]["Row"]>;
        Relationships: [];      };
      campaign_metrics: {
        Row: TableRow<{
          id: string;
          service_order_id: string | null;
          campaign_name: string;
          channel: string;
          report_date: string;
          impressions: number;
          clicks: number;
          leads: number;
          spend: number;
          revenue: number;
          conversion_rate: number;
          created_at: string;
          updated_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["campaign_metrics"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["campaign_metrics"]["Row"]>;
        Relationships: [];      };
      audit_logs: {
        Row: TableRow<{
          id: string;
          actor_id: string | null;
          event_type: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          ip_hash: string | null;
          created_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["audit_logs"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["audit_logs"]["Row"]>;
        Relationships: [];      };
      contact_messages: {
        Row: TableRow<{ id: string; full_name: string; email: string; phone: string | null; subject: string; message: string; ip_hash: string | null; created_at: string }>;
        Insert: TableInsert<Database["public"]["Tables"]["contact_messages"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["contact_messages"]["Row"]>;
        Relationships: [];      };
      media_assets: {
        Row: TableRow<{
          id: string;
          uploader_id: string | null;
          bucket: string;
          path: string;
          public_url: string;
          file_name: string;
          mime_type: string;
          size_bytes: number;
          alt_text: string | null;
          created_at: string;
        }>;
        Insert: TableInsert<Database["public"]["Tables"]["media_assets"]["Row"]>;
        Update: TableUpdate<Database["public"]["Tables"]["media_assets"]["Row"]>;
        Relationships: [];      };
    };
    Views: Record<string, never>;
    Functions: {
      current_app_role: { Args: Record<string, never>; Returns: UserRole };
      has_role: { Args: { required_role: UserRole }; Returns: boolean };
      is_staff: { Args: Record<string, never>; Returns: boolean };
    };
    CompositeTypes: Record<string, never>;
  };
};

