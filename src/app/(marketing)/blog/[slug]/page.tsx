import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { SafeHtml } from "@/components/seo/safe-html";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/metadata";
import { getBlogPostBySlug } from "@/lib/domain/marketing";
import { formatDateVi } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return createMetadata({ title: "Blog MIDIGI", description: "Bài viết marketing MIDIGI", path: "/blog" });
  return createMetadata({
    title: post.seo_title ?? `${post.title} | MIDIGI`,
    description: post.meta_description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.og_image_url ?? post.cover_image_url ?? undefined,
    type: "article"
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "MIDIGI" },
    publisher: { "@type": "Organization", name: "MIDIGI" },
    image: post.og_image_url ?? post.cover_image_url ?? "/brand/og-cover.svg",
    mainEntityOfPage: `/blog/${post.slug}`
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` }
    ]
  };

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumb} />
      <article className="mx-auto max-w-4xl">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Trang chủ</Link> / <Link href="/blog" className="hover:text-white">Blog</Link> / <span>{post.title}</span>
        </nav>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {post.category ? <Badge variant="outline">{post.category.name}</Badge> : null}
          {post.published_at ? <span className="text-sm text-muted-foreground">{formatDateVi(post.published_at)}</span> : null}
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[52px]">{post.title}</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{post.excerpt}</p>
        <Image src={post.cover_image_url ?? "/brand/og-cover.svg"} alt={`Ảnh bài viết ${post.title}`} width={1200} height={630} className="mt-7 rounded-lg border border-border object-cover sm:mt-10" priority />
        <SafeHtml html={post.content_html} className="prose prose-invert mt-8 max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-accent sm:mt-10" />
      </article>
    </main>
  );
}
