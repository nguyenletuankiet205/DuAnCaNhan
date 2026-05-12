import { cache } from "react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { fallbackBlogPosts, fallbackCaseStudies, fallbackFaqItems, fallbackPricingPlans, fallbackServices, fallbackTestimonials } from "@/lib/content";
import type { BlogPostDetail, BlogPostSummary, CaseStudy, FaqItem, PricingPlan, Service, Testimonial } from "@/types/domain";

function parseFeatures(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  return [];
}

export const getServices = cache(async (): Promise<Service[]> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return fallbackServices;

  const { data, error } = await supabase.from("services").select("*").eq("is_active", true).order("display_order", { ascending: true });
  if (error || !data?.length) return fallbackServices;
  return data;
});

export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
  const services = await getServices();
  return services.find((service) => service.slug === slug) ?? null;
});

export const getPricingPlans = cache(async (): Promise<PricingPlan[]> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return fallbackPricingPlans;

  const { data, error } = await supabase.from("pricing_plans").select("*").eq("is_active", true).order("display_order", { ascending: true });
  if (error || !data?.length) return fallbackPricingPlans;
  return data.map((plan) => ({ ...plan, features: parseFeatures(plan.features) }));
});

export const getFaqItems = cache(async (): Promise<FaqItem[]> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return fallbackFaqItems;

  const { data, error } = await supabase.from("faq_items").select("*").eq("is_published", true).order("display_order", { ascending: true });
  if (error || !data?.length) return fallbackFaqItems;
  return data;
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return fallbackTestimonials;

  const { data, error } = await supabase.from("testimonials").select("*").eq("is_published", true).order("display_order", { ascending: true });
  if (error || !data?.length) return fallbackTestimonials;
  return data;
});

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return fallbackCaseStudies;

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("published_at", { ascending: false });

  if (error || !data?.length) return fallbackCaseStudies;
  return data;
});

export const getCaseStudyBySlug = cache(async (slug: string): Promise<CaseStudy | null> => {
  const caseStudies = await getCaseStudies();
  return caseStudies.find((item) => item.slug === slug) ?? null;
});

export const getBlogPosts = cache(async (): Promise<BlogPostSummary[]> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return fallbackBlogPosts;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,slug,excerpt,cover_image_url,seo_title,meta_description,og_image_url,status,published_at,blog_categories(name,slug)")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("published_at", { ascending: false });

  if (error || !data?.length) return fallbackBlogPosts;

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    cover_image_url: post.cover_image_url,
    seo_title: post.seo_title,
    meta_description: post.meta_description,
    og_image_url: post.og_image_url,
    status: post.status,
    published_at: post.published_at,
    category: Array.isArray(post.blog_categories) ? post.blog_categories[0] ?? null : post.blog_categories
  }));
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPostDetail | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*,blog_categories(name,slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .single();

  if (error || !data) return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;

  return {
    ...data,
    category: Array.isArray(data.blog_categories) ? data.blog_categories[0] ?? null : data.blog_categories
  };
});
