import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));

const args = process.argv.slice(2);
const emailArg = args.find((arg) => arg.startsWith("--email="));
const passwordArg = args.find((arg) => arg.startsWith("--password="));
const nameArg = args.find((arg) => arg.startsWith("--name="));

const email = emailArg?.split("=").slice(1).join("=") || process.env.ADMIN_SEED_EMAIL || "admin@midigi.vn";
const password = passwordArg?.split("=").slice(1).join("=") || process.env.ADMIN_SEED_PASSWORD || "Midigi@2026!";
const fullName = nameArg?.split("=").slice(1).join("=") || process.env.ADMIN_SEED_NAME || "Quản trị viên MIDIGI";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local.");
  console.error("Hãy điền 2 giá trị này trước khi tạo tài khoản admin.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function findUserByEmail(targetEmail) {
  let page = 1;
  const perPage = 1000;
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const user = data.users.find((item) => item.email?.toLowerCase() === targetEmail.toLowerCase());
    if (user) return user;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

async function main() {
  const existingUser = await findUserByEmail(email);
  const user =
    existingUser ??
    (
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName
        }
      })
    ).data.user;

  if (!user) {
    console.error("Không thể tạo hoặc tìm tài khoản admin.");
    process.exit(1);
  }

  if (existingUser) {
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
      user_metadata: {
        ...(user.user_metadata ?? {}),
        full_name: fullName
      }
    });
    if (updateError) throw updateError;
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    is_active: true
  });
  if (profileError) throw profileError;

  const { error: roleError } = await supabase.from("user_roles").upsert({
    user_id: user.id,
    role: "admin"
  });
  if (roleError) throw roleError;

  console.log("Đã tạo/cập nhật tài khoản quản trị MIDIGI.");
  console.log(`Email: ${email}`);
  console.log(`Mật khẩu: ${password}`);
  console.log("Đường dẫn đăng nhập: http://localhost:3000/dang-nhap");
}

main().catch((error) => {
  console.error("Không thể tạo tài khoản admin.");
  console.error(error.message ?? error);
  process.exit(1);
});
