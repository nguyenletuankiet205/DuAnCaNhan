import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { hashRequestValue } from "@/lib/security/hash";

const vitalsSchema = z.object({
  name: z.string().max(20),
  value: z.number(),
  id: z.string().max(120),
  rating: z.string().max(40).optional(),
  navigationType: z.string().max(80).optional()
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    const limited = checkRateLimit(`vitals:${hashRequestValue(ip)}`, { limit: 120, windowMs: 60 * 1000 });
    if (!limited.allowed) {
      return NextResponse.json({ ok: false, message: "Gửi dữ liệu quá nhanh" }, { status: 429 });
    }

    const body = await request.json();
    const parsed = vitalsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Dữ liệu hiệu suất không hợp lệ" }, { status: 400 });
    }

    if (process.env.NEXT_RUNTIME_LOG_LEVEL === "debug") {
      console.info("MIDIGI web vital", parsed.data);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : "Yêu cầu không hợp lệ" }, { status: 403 });
  }
}
