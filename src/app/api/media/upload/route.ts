import { NextResponse, type NextRequest } from "next/server";
import { mediaUploadSchema } from "@/lib/validation";
import { assertRequestCsrf } from "@/lib/security/csrf";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { hashRequestValue } from "@/lib/security/hash";
import { sanitizeText } from "@/lib/security/sanitize";
import { getCurrentAuthContext } from "@/lib/auth";
import { canAccess } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const allowedMimeByBucket = {
  "blog-covers": ["image/jpeg", "image/png", "image/webp", "image/avif"],
  "case-study-logos": ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  "case-study-media": ["image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf"],
  "testimonial-avatars": ["image/jpeg", "image/png", "image/webp", "image/avif"],
  "brand-assets": ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/avif"]
} as const;

const dangerousExtensions = new Set(["exe", "bat", "cmd", "sh", "js", "mjs", "php", "html", "htm", "svgz"]);

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export async function POST(request: NextRequest) {
  try {
    assertRequestCsrf(request);

    const auth = await getCurrentAuthContext();
    if (!auth || !canAccess(auth.role, ["marketing"])) {
      return NextResponse.json({ ok: false, message: "Bạn không có quyền tải media" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? auth.userId;
    const limited = checkRateLimit(`media:${hashRequestValue(ip)}:${auth.userId}`, { limit: 20, windowMs: 60 * 60 * 1000 });
    if (!limited.allowed) {
      return NextResponse.json({ ok: false, message: `Bạn tải file quá nhanh. Vui lòng thử lại sau ${limited.retryAfter} giây.` }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const parsed = mediaUploadSchema.safeParse({
      bucket: formData.get("bucket"),
      altText: formData.get("altText")
    });

    if (!parsed.success || !(file instanceof File)) {
      return NextResponse.json({ ok: false, message: "File tải lên chưa hợp lệ" }, { status: 400 });
    }

    const allowedMime = allowedMimeByBucket[parsed.data.bucket];
    const extension = getExtension(file.name);
    if (!allowedMime.includes(file.type as never) || dangerousExtensions.has(extension)) {
      return NextResponse.json({ ok: false, message: "Định dạng file không được hỗ trợ" }, { status: 400 });
    }

    if (file.size <= 0 || file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ ok: false, message: "Dung lượng file phải nhỏ hơn 10MB" }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ ok: false, message: "Chưa cấu hình Supabase Storage" }, { status: 500 });
    }

    const safeName = sanitizeText(file.name).replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${auth.userId}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from(parsed.data.bucket).upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false
    });

    if (uploadError) {
      return NextResponse.json({ ok: false, message: "Không thể tải file lên kho lưu trữ" }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from(parsed.data.bucket).getPublicUrl(path);
    const { error: dbError } = await supabase.from("media_assets").insert({
      uploader_id: auth.userId,
      bucket: parsed.data.bucket,
      path,
      public_url: publicUrlData.publicUrl,
      file_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: parsed.data.altText ? sanitizeText(parsed.data.altText) : null
    });

    if (dbError) {
      return NextResponse.json({ ok: false, message: "File đã tải lên nhưng chưa ghi được vào thư viện media" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: "Đã tải file lên thư viện media",
      url: publicUrlData.publicUrl
    });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : "Yêu cầu tải file không hợp lệ" }, { status: 400 });
  }
}
