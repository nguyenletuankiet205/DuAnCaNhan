import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { hashRequestValue } from "@/lib/security/hash";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/types/database.types";

function verifySignature(rawBody: string, signature: string | null) {
  const secret = process.env.WEBHOOK_SIGNING_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const left = Buffer.from(expected);
  const right = Buffer.from(signature);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "webhook";
  const limited = checkRateLimit(`webhook:${hashRequestValue(ip)}`, { limit: 60, windowMs: 60 * 1000 });
  if (!limited.allowed) {
    return NextResponse.json({ ok: false, message: "Webhook gửi quá nhanh" }, { status: 429 });
  }

  const rawBody = await request.text();
  if (!verifySignature(rawBody, request.headers.get("x-midigi-signature"))) {
    return NextResponse.json({ ok: false, message: "Chữ ký webhook không hợp lệ" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as { type?: string; data?: unknown };
  const safeData = JSON.parse(JSON.stringify(payload.data ?? null)) as Json;
  const supabase = getSupabaseAdminClient();
  await supabase?.from("audit_logs").insert({
    event_type: "resend_webhook_received",
    entity_type: "email",
    metadata: {
      type: payload.type ?? "unknown",
      data: safeData
    }
  });

  return NextResponse.json({ ok: true });
}
