# Hướng dẫn cho coding agents trong dự án MIDIGI

Trước khi viết hoặc sửa code, agent phải đọc tài liệu chính thức phù hợp với phiên bản đang dùng trong `package.json`, đặc biệt:

- Next.js App Router, Server Components, Server Actions, Route Handlers, Metadata, sitemap và robots.
- Supabase SSR Auth, RLS policies, Storage policies và custom access token hook.
- Resend email sending API.
- shadcn/ui component conventions.

Quy tắc bắt buộc:

- Không dùng Pages Router và không tạo `/pages/api`.
- Không đưa secret, service role key hoặc logic admin ra client.
- Server Components là mặc định; chỉ dùng `"use client"` khi thật sự cần tương tác, state, browser API, form client, chart hoặc upload.
- Mọi form phải có validation ở client và server bằng schema Zod.
- Query database phải đi qua `src/lib/domain`, `src/actions` hoặc helper server phù hợp.
- UI, toast, email, validation message và nội dung end-user phải là tiếng Việt tự nhiên, chuyên nghiệp.
- Không để lại `TODO`, `FIXME`, pseudo-code hoặc placeholder logic.
- Không render rich HTML khi chưa sanitize.
- Không bỏ qua RLS/RBAC ở database; frontend guard chỉ là lớp phụ.
