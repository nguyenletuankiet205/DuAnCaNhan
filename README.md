# MIDIGI Marketing Platform

Nền tảng full-stack cho MIDIGI, gồm website public, dashboard quản trị, CRM lead, CMS blog, Supabase Auth/RBAC/RLS, Supabase Storage, email Resend, SEO, bảo mật và tài liệu triển khai.

## Kiến trúc

- `src/app/(marketing)`: website công khai bằng Next.js App Router.
- `src/app/(dashboard)`: dashboard quản trị có middleware và server guard.
- `src/app/api`: Route Handlers cho health, upload, web vitals và webhook.
- `src/actions`: Server Actions cho form nội bộ, lead và CMS.
- `src/lib/domain`: lớp truy vấn dữ liệu, không scatter query trong component.
- `supabase/migrations`: schema PostgreSQL, enum, index, trigger, RLS, RBAC, storage policy.
- `emails`: template email HTML/text tiếng Việt.

## Cài đặt local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`.

## Script chính

- `npm run dev`: chạy môi trường phát triển.
- `npm run typecheck`: kiểm tra TypeScript strict.
- `npm run build`: build production.
- `npm run verify`: typecheck và build.
- `npm run db:migrate`: chạy migration Supabase.
- `npm run db:seed`: nạp dữ liệu mẫu tiếng Việt.

## Auth và phân quyền

Supabase Auth quản lý đăng nhập. Bảng `profiles` liên kết `auth.users`, bảng `user_roles` chứa role ứng dụng:

- `admin`: quản trị viên.
- `sale`: nhân viên Sale.
- `marketing`: nhân viên Marketing.

Database RLS thực thi quyền ở tầng dữ liệu. Middleware bảo vệ `/dashboard`, còn server guard trong `src/lib/auth.ts` kiểm tra lại ở từng route/action quan trọng.

## Lead flow

Form tư vấn sử dụng React Hook Form và Zod ở client. Server Action xác thực lại bằng Zod, kiểm tra CSRF, rate limit, sanitize input, ghi lead vào Supabase, tạo audit log và gửi email qua Resend.

## SEO

Mỗi page có metadata hoặc `generateMetadata`, canonical URL, Open Graph, Twitter card. Blog detail có BlogPosting JSON-LD, detail pages có BreadcrumbList, homepage có Organization JSON-LD, FAQ có FAQPage với nội dung trung thực.

## Bảo mật

- Security headers trong `next.config.mjs`.
- CSRF token cho Server Actions và mutating Route Handlers.
- Rate limit cho lead, login, upload, web vitals và webhook.
- Rich HTML được sanitize trước khi render.
- Service role chỉ nằm trong `src/lib/supabase/admin.ts` server-only.
- Supabase RLS/RBAC bảo vệ bảng và storage bucket.

## Triển khai

Các lựa chọn triển khai:

- `docs/deployment.md`: triển khai với Supabase managed.
- `docs/vps-self-hosted-supabase.md`: triển khai toàn bộ trên VPS bằng Docker, Supabase self-hosted và Caddy reverse proxy.
