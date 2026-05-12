import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { createMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/domain/marketing";
import { SectionHeading } from "@/sections/shared/section-heading";

type Props = { searchParams: Promise<{ q?: string; category?: string; tag?: string }> };

export const metadata: Metadata = createMetadata({
  title: "Blog Marketing MIDIGI",
  description: "Kiến thức marketing tăng trưởng, quảng cáo chuyển đổi, website, landing page và SEO dành cho doanh nghiệp Việt Nam.",
  path: "/blog"
});

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const posts = await getBlogPosts();
  const q = params.q?.toLowerCase().trim() ?? "";
  const category = params.category?.toLowerCase().trim() ?? "";
  const tag = params.tag?.toLowerCase().trim() ?? "";
  const filtered = posts.filter((post) => {
    const haystack = `${post.title} ${post.excerpt} ${post.category?.name ?? ""}`.toLowerCase();
    return (!q || haystack.includes(q)) && (!category || post.category?.slug === category) && (!tag || haystack.includes(tag.replace(/-/g, " ")));
  });

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Blog" title="Góc nhìn marketing tăng trưởng cho doanh nghiệp Việt" />
        <form className="mx-auto mt-7 grid max-w-3xl gap-3 sm:mt-10 sm:grid-cols-[1fr_auto]" action="/blog">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 size-5 text-slate-500" />
            <Input name="q" defaultValue={params.q ?? ""} placeholder="Tìm theo chủ đề, kênh hoặc mục tiêu tăng trưởng" className="pl-10" />
          </div>
          <button className="focus-ring rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-secondary" type="submit">
            Tìm bài viết
          </button>
        </form>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["sme", "landing-page", "facebook-ads", "google-ads", "toi-uu-chuyen-doi"].map((item) => (
            <Link key={item} href={`/blog?tag=${item}`}>
              <Badge variant={tag === item ? "cyan" : "outline"}>{item.replace(/-/g, " ")}</Badge>
            </Link>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article key={post.slug} className="glass-card overflow-hidden rounded-lg">
              <Image src={post.cover_image_url ?? "/brand/og-cover.svg"} alt={`Ảnh bài viết ${post.title}`} width={1200} height={630} className="aspect-[16/9] object-cover" />
              <div className="p-5 sm:p-6">
                {post.category ? <Badge variant="outline">{post.category.name}</Badge> : null}
                <h2 className="mt-4 text-xl font-semibold leading-snug text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 ? <p className="mt-10 text-center text-muted-foreground">Chưa có bài viết phù hợp với bộ lọc hiện tại.</p> : null}
      </div>
    </main>
  );
}
