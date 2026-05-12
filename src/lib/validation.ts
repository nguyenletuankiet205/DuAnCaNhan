import { z } from "zod";

const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;

export const serviceTypeSchema = z.enum([
  "business_website",
  "conversion_landing_page",
  "facebook_ads",
  "google_ads",
  "fanpage_setup",
  "facebook_group_setup",
  "personal_branding",
  "marketing_strategy",
  "marketing_audit",
  "growth_consulting"
]);

export const leadStatusSchema = z.enum(["new", "contacted", "quoted", "won", "lost"]);
export const blogStatusSchema = z.enum(["draft", "published", "archived"]);
export const orderStatusSchema = z.enum(["draft", "active", "paused", "completed", "cancelled"]);
export const paymentStatusSchema = z.enum(["pending", "paid", "overdue", "refunded", "cancelled"]);

export const leadInputSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ tên").min(2, "Họ tên cần có ít nhất 2 ký tự").max(120, "Họ tên quá dài"),
  phone: z.string().trim().min(1, "Vui lòng nhập số điện thoại").regex(phoneRegex, "Số điện thoại không đúng định dạng"),
  email: z.string().trim().min(1, "Vui lòng nhập email").email("Email không hợp lệ").max(160, "Email quá dài"),
  industry: z.string().trim().min(2, "Vui lòng nhập ngành nghề").max(120, "Ngành nghề quá dài"),
  serviceInterest: serviceTypeSchema,
  budgetRange: z.string().trim().min(2, "Vui lòng chọn ngân sách dự kiến").max(80, "Ngân sách không hợp lệ"),
  message: z.string().trim().min(10, "Vui lòng chia sẻ thêm nhu cầu tư vấn").max(2000, "Nội dung quá dài"),
  csrfToken: z.string().min(20, "Phiên gửi biểu mẫu không hợp lệ")
});

export const contactInputSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ tên").min(2, "Họ tên cần có ít nhất 2 ký tự").max(120, "Họ tên quá dài"),
  phone: z.string().trim().optional(),
  email: z.string().trim().min(1, "Vui lòng nhập email").email("Email không hợp lệ").max(160, "Email quá dài"),
  subject: z.string().trim().min(4, "Vui lòng nhập chủ đề").max(160, "Chủ đề quá dài"),
  message: z.string().trim().min(10, "Vui lòng nhập nội dung liên hệ").max(2000, "Nội dung quá dài"),
  csrfToken: z.string().min(20, "Phiên gửi biểu mẫu không hợp lệ")
});

export const loginInputSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu cần có ít nhất 8 ký tự"),
  csrfToken: z.string().optional()
});

export const leadStatusInputSchema = z.object({
  leadId: z.string().uuid("Mã khách hàng không hợp lệ"),
  status: leadStatusSchema,
  csrfToken: z.string().min(20, "Phiên thao tác không hợp lệ")
});

export const leadNoteInputSchema = z.object({
  leadId: z.string().uuid("Mã khách hàng không hợp lệ"),
  content: z.string().trim().min(2, "Vui lòng nhập ghi chú").max(2000, "Ghi chú quá dài"),
  csrfToken: z.string().min(20, "Phiên thao tác không hợp lệ")
});

export const blogPostInputSchema = z.object({
  id: z.string().uuid("Mã bài viết không hợp lệ").optional(),
  title: z.string().trim().min(5, "Tiêu đề cần có ít nhất 5 ký tự").max(180, "Tiêu đề quá dài"),
  slug: z.string().trim().min(3, "Slug cần có ít nhất 3 ký tự").max(180, "Slug quá dài").regex(/^[a-z0-9-]+$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
  excerpt: z.string().trim().min(20, "Mô tả ngắn cần rõ hơn").max(320, "Mô tả ngắn quá dài"),
  contentHtml: z.string().trim().min(80, "Nội dung bài viết cần chi tiết hơn"),
  categoryId: z.string().uuid("Danh mục không hợp lệ").optional().or(z.literal("")),
  status: blogStatusSchema,
  seoTitle: z.string().trim().max(180, "SEO title quá dài").optional(),
  metaDescription: z.string().trim().max(320, "Meta description quá dài").optional(),
  coverImageUrl: z.string().trim().url("URL ảnh không hợp lệ").optional().or(z.literal("")),
  ogImageUrl: z.string().trim().url("URL OG image không hợp lệ").optional().or(z.literal("")),
  csrfToken: z.string().min(20, "Phiên thao tác không hợp lệ")
});

export const mediaUploadSchema = z.object({
  bucket: z.enum(["blog-covers", "case-study-logos", "case-study-media", "testimonial-avatars", "brand-assets"]),
  altText: z.string().trim().max(180, "Mô tả ảnh quá dài").optional()
});

export type LeadInput = z.infer<typeof leadInputSchema>;
export type ContactInput = z.infer<typeof contactInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type BlogPostInput = z.infer<typeof blogPostInputSchema>;
