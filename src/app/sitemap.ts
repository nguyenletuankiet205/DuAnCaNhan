import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getBlogPosts, getCaseStudies, getServices } from "@/lib/domain/marketing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, caseStudies, posts] = await Promise.all([getServices(), getCaseStudies(), getBlogPosts()]);
  const now = new Date();
  const staticRoutes = ["", "/gioi-thieu", "/dich-vu", "/du-an", "/bang-gia", "/blog", "/lien-he"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${siteConfig.url}/dich-vu/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    ...caseStudies.map((item) => ({
      url: `${siteConfig.url}/du-an/${item.slug}`,
      lastModified: item.published_at ? new Date(item.published_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.65
    }))
  ];
}
