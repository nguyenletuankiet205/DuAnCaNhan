# Hướng dẫn triển khai MIDIGI với Supabase managed

Tài liệu này dành cho phương án dùng Supabase managed. Nếu muốn chạy toàn bộ trên VPS riêng, xem `docs/vps-self-hosted-supabase.md`.

## 1. Chuẩn bị hạ tầng

- Tạo project Supabase mới và bật Email Auth.
- Tạo tài khoản Resend, xác thực domain gửi email của MIDIGI.
- Tạo dự án Vercel hoặc máy chủ Node.js 20 trở lên.

## 2. Cấu hình biến môi trường

Sao chép `.env.example` thành `.env.local`, sau đó điền:

- `NEXT_PUBLIC_SITE_URL`: domain chính thức, ví dụ `https://midigi.vn`.
- `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`: khóa public của Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: chỉ đặt trên server, không đưa vào client.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_NOTIFICATION_EMAIL`: cấu hình gửi email.
- `CSRF_SECRET`, `WEBHOOK_SIGNING_SECRET`: chuỗi ngẫu nhiên mạnh.

## 3. Khởi tạo database

Chạy migration và seed:

```bash
npm run db:migrate
npm run db:seed
```

Trong Supabase Dashboard, cấu hình Auth Hook `custom_access_token_hook` trỏ đến function `public.custom_access_token_hook` để claim `app_role` được đưa vào JWT.

## 4. Tạo tài khoản quản trị

1. Tạo user bằng Supabase Auth.
2. Cập nhật role trong bảng `user_roles`:

```sql
update public.user_roles
set role = 'admin'
where user_id = 'USER_UUID';
```

Các role hợp lệ:

- `admin`: quản trị toàn hệ thống.
- `sale`: quản lý lead, đơn dịch vụ, thanh toán và CRM.
- `marketing`: quản lý blog, media, chiến dịch và CRM.

## 5. Cấu hình storage

Migration đã tạo các bucket:

- `blog-covers`
- `case-study-logos`
- `case-study-media`
- `testimonial-avatars`
- `brand-assets`

RLS và storage policies cho phép public đọc asset đã public, nhân sự MIDIGI được upload theo quyền, chỉ admin được xóa object.

## 6. Build và kiểm tra

```bash
npm install
npm run typecheck
npm run build
npm run start
```

Kiểm tra các đường dẫn:

- `/`
- `/lien-he`
- `/blog`
- `/du-an`
- `/dang-nhap`
- `/dashboard`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`

## 7. Bảo mật vận hành

- Không đưa `SUPABASE_SERVICE_ROLE_KEY` vào biến môi trường client.
- Chỉ dùng HTTPS ở production.
- Giữ CSP, CSRF, rate limit và RLS luôn bật.
- Theo dõi audit log cho các sự kiện lead, email, webhook và thay đổi dữ liệu.
- Nếu traffic lớn, thay rate limit in-memory bằng Redis hoặc Upstash để đồng bộ giữa nhiều instance.
