"use client";

import { useMemo, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { saveBlogPostAction } from "@/actions/dashboard-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { blogStatusLabels } from "@/db/enums";
import { slugifyVietnamese } from "@/lib/utils";
import { blogPostInputSchema, type BlogPostInput } from "@/lib/validation";

type Category = { id: string; name: string; slug: string };

export function BlogForm({ csrfToken, categories, initial }: { csrfToken: string; categories: Category[]; initial?: Partial<BlogPostInput> }) {
  const [isPending, startTransition] = useTransition();
  const defaultSlug = useMemo(() => initial?.slug ?? "", [initial?.slug]);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BlogPostInput>({
    resolver: zodResolver(blogPostInputSchema),
    defaultValues: {
      title: initial?.title ?? "",
      slug: defaultSlug,
      excerpt: initial?.excerpt ?? "",
      contentHtml: initial?.contentHtml ?? "",
      categoryId: initial?.categoryId ?? "",
      status: initial?.status ?? "draft",
      seoTitle: initial?.seoTitle ?? "",
      metaDescription: initial?.metaDescription ?? "",
      coverImageUrl: initial?.coverImageUrl ?? "",
      ogImageUrl: initial?.ogImageUrl ?? "",
      csrfToken,
      id: initial?.id
    }
  });

  const title = watch("title");

  function generateSlug() {
    setValue("slug", slugifyVietnamese(title), { shouldValidate: true });
  }

  function onSubmit(values: BlogPostInput) {
    startTransition(async () => {
      const result = await saveBlogPostAction(values);
      if (result?.ok === false) toast.error(result.message);
    });
  }

  return (
    <form className="glass-card grid gap-5 rounded-lg p-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("csrfToken")} value={csrfToken} />
      {initial?.id ? <input type="hidden" {...register("id")} value={initial.id} /> : null}
      <Field label="Tiêu đề" error={errors.title?.message}><Input {...register("title")} placeholder="Nhập tiêu đề bài viết" /></Field>
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <Field label="Slug" error={errors.slug?.message}><Input {...register("slug")} placeholder="slug-bai-viet" /></Field>
        <Button type="button" variant="outline" className="mt-7" onClick={generateSlug}>Tạo slug</Button>
      </div>
      <Field label="Mô tả ngắn" error={errors.excerpt?.message}><Textarea {...register("excerpt")} placeholder="Tóm tắt giá trị chính của bài viết" /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Danh mục" error={errors.categoryId?.message}>
          <select className="focus-ring h-11 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm text-white" {...register("categoryId")}>
            <option value="">Chưa chọn danh mục</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </Field>
        <Field label="Trạng thái" error={errors.status?.message}>
          <select className="focus-ring h-11 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm text-white" {...register("status")}>
            {Object.entries(blogStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Nội dung HTML an toàn" error={errors.contentHtml?.message}>
        <Textarea className="min-h-72 font-mono text-xs" {...register("contentHtml")} placeholder="<h2>Tiêu đề phần</h2><p>Nội dung bài viết...</p>" />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="SEO title" error={errors.seoTitle?.message}><Input {...register("seoTitle")} placeholder="Tiêu đề SEO" /></Field>
        <Field label="Meta description" error={errors.metaDescription?.message}><Input {...register("metaDescription")} placeholder="Mô tả hiển thị trên công cụ tìm kiếm" /></Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="URL ảnh bìa" error={errors.coverImageUrl?.message}><Input {...register("coverImageUrl")} placeholder="https://..." /></Field>
        <Field label="URL ảnh Open Graph" error={errors.ogImageUrl?.message}><Input {...register("ogImageUrl")} placeholder="https://..." /></Field>
      </div>
      <Button type="submit" variant="gradient" disabled={isPending}>
        <Save className="size-4" />
        {isPending ? "Đang lưu bài viết..." : "Lưu bài viết"}
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}{error ? <p className="text-sm text-destructive">{error}</p> : null}</div>;
}
