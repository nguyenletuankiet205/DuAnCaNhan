"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertServerActionCsrf } from "@/lib/security/csrf";
import { sanitizeRichHtml, sanitizeText } from "@/lib/security/sanitize";
import { blogPostInputSchema, leadNoteInputSchema, leadStatusInputSchema } from "@/lib/validation";
import { requireRole } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type ActionResult = {
  ok: boolean;
  message: string;
};

export async function updateLeadStatusAction(input: unknown): Promise<ActionResult> {
  const auth = await requireRole(["sale"]);
  const parsed = leadStatusInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Trạng thái không hợp lệ" };
  await assertServerActionCsrf(parsed.data.csrfToken);

  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Chưa cấu hình Supabase" };

  const { error } = await supabase.from("leads").update({ status: parsed.data.status }).eq("id", parsed.data.leadId);
  if (error) return { ok: false, message: "Không thể cập nhật trạng thái khách hàng" };

  await supabase.from("audit_logs").insert({
    actor_id: auth.userId,
    event_type: "lead_status_updated",
    entity_type: "lead",
    entity_id: parsed.data.leadId,
    metadata: { status: parsed.data.status }
  });

  revalidatePath("/dashboard/leads");
  return { ok: true, message: "Đã cập nhật trạng thái khách hàng" };
}

export async function addLeadNoteAction(input: unknown): Promise<ActionResult> {
  const auth = await requireRole(["sale", "marketing"]);
  const parsed = leadNoteInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Ghi chú không hợp lệ" };
  await assertServerActionCsrf(parsed.data.csrfToken);

  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Chưa cấu hình Supabase" };

  const { error } = await supabase.from("lead_notes").insert({
    lead_id: parsed.data.leadId,
    author_id: auth.userId,
    content: sanitizeText(parsed.data.content)
  });

  if (error) return { ok: false, message: "Không thể thêm ghi chú CRM" };
  revalidatePath("/dashboard/crm");
  revalidatePath("/dashboard/leads");
  return { ok: true, message: "Đã thêm ghi chú CRM" };
}

export async function saveBlogPostAction(input: unknown): Promise<ActionResult> {
  const auth = await requireRole(["marketing"]);
  const parsed = blogPostInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Bài viết chưa hợp lệ" };
  await assertServerActionCsrf(parsed.data.csrfToken);

  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Chưa cấu hình Supabase" };

  const payload = {
    author_id: auth.userId,
    title: sanitizeText(parsed.data.title),
    slug: sanitizeText(parsed.data.slug),
    excerpt: sanitizeText(parsed.data.excerpt),
    content_html: sanitizeRichHtml(parsed.data.contentHtml),
    category_id: parsed.data.categoryId || null,
    status: parsed.data.status,
    seo_title: parsed.data.seoTitle ? sanitizeText(parsed.data.seoTitle) : null,
    meta_description: parsed.data.metaDescription ? sanitizeText(parsed.data.metaDescription) : null,
    cover_image_url: parsed.data.coverImageUrl || null,
    og_image_url: parsed.data.ogImageUrl || null,
    published_at: parsed.data.status === "published" ? new Date().toISOString() : null
  };

  const query = parsed.data.id
    ? supabase.from("blog_posts").update(payload).eq("id", parsed.data.id)
    : supabase.from("blog_posts").insert(payload);

  const { error } = await query;
  if (error) return { ok: false, message: "Không thể lưu bài viết. Vui lòng kiểm tra slug hoặc quyền truy cập." };

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  redirect("/dashboard/blog");
}

export async function deleteBlogPostAction(input: { id: string; csrfToken: string }): Promise<ActionResult> {
  await requireRole(["marketing"]);
  await assertServerActionCsrf(input.csrfToken);

  const supabase = await getSupabaseServerClient();
  if (!supabase) return { ok: false, message: "Chưa cấu hình Supabase" };

  const { error } = await supabase.from("blog_posts").update({ deleted_at: new Date().toISOString(), status: "archived" }).eq("id", input.id);
  if (error) return { ok: false, message: "Không thể lưu trữ bài viết" };

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  return { ok: true, message: "Đã lưu trữ bài viết" };
}
