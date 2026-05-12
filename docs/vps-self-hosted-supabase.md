# Triển khai MIDIGI trên VPS với Supabase self-hosted

Tài liệu này dùng cho mô hình:

```text
VPS Ubuntu
├─ MIDIGI Next.js app chạy Docker tại 127.0.0.1:3000
├─ Supabase self-hosted chạy Docker tại 127.0.0.1:8000
└─ Caddy reverse proxy cấp HTTPS cho domain
```

## 1. Chuẩn bị DNS

Trỏ các bản ghi sau về IP VPS:

```text
nguyenhuynhkhanh.com        A    YOUR_VPS_IP
www.nguyenhuynhkhanh.com    A    YOUR_VPS_IP
api.nguyenhuynhkhanh.com    A    YOUR_VPS_IP
studio.nguyenhuynhkhanh.com A    YOUR_VPS_IP
```

Bạn có thể đổi domain theo thực tế, nhưng cần giữ 3 vai trò:

- Domain website: `nguyenhuynhkhanh.com` cho app Next.js public và admin.
- Domain API Supabase: `api.nguyenhuynhkhanh.com` cho Auth, REST, Storage.
- Domain Studio: `studio.nguyenhuynhkhanh.com` cho giao diện quản trị Supabase, phải có Basic Auth.

## 2. Cài Docker và Caddy trên VPS

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg git ufw
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin caddy
sudo usermod -aG docker $USER
```

Đăng xuất SSH rồi đăng nhập lại để quyền Docker có hiệu lực.

Firewall cơ bản:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

## 3. Self-host Supabase bằng Docker

Supabase self-host nên đặt riêng ở `/opt/supabase`.

```bash
sudo mkdir -p /opt/supabase
sudo chown -R $USER:$USER /opt/supabase
cd /opt/supabase
git clone --depth 1 https://github.com/supabase/supabase .
cd docker
cp .env.example .env
```

Mở `.env` và điền các giá trị tương ứng. Có thể tham khảo `deploy/supabase.env.example` trong repo MIDIGI.

Tạo JWT secret và các key:

```bash
openssl rand -base64 48
openssl rand -hex 32
```

Sau khi có `JWT_SECRET`, tạo `ANON_KEY` và `SERVICE_ROLE_KEY` bằng Supabase docs hoặc công cụ JWT nội bộ. Hai key này phải cùng `JWT_SECRET`.

Chạy Supabase:

```bash
docker compose pull
docker compose up -d
docker compose ps
```

Không mở trực tiếp port Supabase ra internet. Caddy sẽ proxy HTTPS từ `api.midigi.vn` vào `127.0.0.1:8000`.

## 4. Cấu hình Caddy

Tạo password hash cho Studio:

```bash
caddy hash-password --plaintext 'MAT_KHAU_STUDIO_MANH'
```

Copy `deploy/Caddyfile.example` thành `/etc/caddy/Caddyfile`, đổi domain và thay `REPLACE_WITH_CADDY_HASHED_PASSWORD`.

```bash
sudo nano /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Kiểm tra:

```bash
curl -I https://api.nguyenhuynhkhanh.com
curl -I https://nguyenhuynhkhanh.com
```

## 5. Deploy app MIDIGI

Đặt source ở `/opt/midigi`.

```bash
sudo mkdir -p /opt/midigi
sudo chown -R $USER:$USER /opt/midigi
cd /opt/midigi
git clone YOUR_REPOSITORY_URL .
```

Nếu bạn chưa dùng Git, có thể upload thư mục dự án bằng SFTP hoặc `scp`.

Tạo env production:

```bash
cp .env.production.example .env.production
nano .env.production
```

Các dòng quan trọng:

```env
NEXT_PUBLIC_SITE_URL=https://nguyenhuynhkhanh.com
NEXT_PUBLIC_ENABLE_SUPABASE=true
NEXT_PUBLIC_SUPABASE_URL=https://api.nguyenhuynhkhanh.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=ANON_KEY_TU_SUPABASE_SELF_HOST
SUPABASE_SERVICE_ROLE_KEY=SERVICE_ROLE_KEY_TU_SUPABASE_SELF_HOST
SUPABASE_JWT_SECRET=JWT_SECRET_TU_SUPABASE_SELF_HOST
```

Build và chạy app:

```bash
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml logs -f midigi-web
```

## 6. Chạy migration và seed vào Supabase self-host

Từ thư mục app MIDIGI:

```bash
npm install
npx supabase db push --db-url "postgresql://postgres:POSTGRES_PASSWORD@127.0.0.1:5432/postgres" --include-seed
```

Nếu Postgres của Supabase không expose ra host, chạy lệnh trong network/container phù hợp hoặc dùng `docker exec` vào container database theo compose của Supabase.

## 7. Tạo tài khoản admin

Sau khi `.env.production` có đủ Supabase URL và service role key:

```bash
cp .env.production .env.local
npm run admin:create -- --email=admin@nguyenhuynhkhanh.com --password='MAT_KHAU_ADMIN_MANH' --name='Quản trị viên MIDIGI'
```

Đăng nhập tại:

```text
https://nguyenhuynhkhanh.com/dang-nhap
```

## 8. Vận hành và backup

Backup PostgreSQL hằng ngày:

```bash
mkdir -p /opt/backups/midigi
docker exec supabase-db pg_dump -U postgres postgres | gzip > /opt/backups/midigi/postgres-$(date +%F).sql.gz
```

Cập nhật app:

```bash
cd /opt/midigi
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

Xem log:

```bash
docker compose -f docker-compose.prod.yml logs -f midigi-web
cd /opt/supabase/docker
docker compose logs -f
```

## 9. Lưu ý bảo mật

- Đổi ngay mọi mật khẩu hoặc database URL từng bị lộ.
- Không public port Postgres `5432`.
- Bảo vệ `studio.midigi.vn` bằng Basic Auth và mật khẩu mạnh.
- Giữ `SERVICE_ROLE_KEY` chỉ trong server env.
- Bật backup tự động cho Postgres và thư mục storage.
- Dùng domain HTTPS thật cho `SITE_URL`, `API_EXTERNAL_URL`, `SUPABASE_PUBLIC_URL`.
