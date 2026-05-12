import "server-only";
import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { csrfCookieName } from "@/lib/security/constants";

function safeCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function parseCookie(header: string | null, name: string) {
  if (!header) return null;
  const part = header
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));
  return part ? decodeURIComponent(part.split("=").slice(1).join("=")) : null;
}

export async function getCsrfToken() {
  const cookieStore = await cookies();
  return cookieStore.get(csrfCookieName)?.value ?? "";
}

export async function assertServerActionCsrf(submittedToken: string) {
  const cookieToken = await getCsrfToken();
  if (!cookieToken || !submittedToken || !safeCompare(cookieToken, submittedToken)) {
    throw new Error("Phiên bảo mật đã hết hạn. Vui lòng tải lại trang và thử lại.");
  }
}

export function assertRequestCsrf(request: Request) {
  const headerToken = request.headers.get("x-csrf-token");
  const cookieToken = parseCookie(request.headers.get("cookie"), csrfCookieName);
  if (!cookieToken || !headerToken || !safeCompare(cookieToken, headerToken)) {
    throw new Error("Phiên bảo mật không hợp lệ.");
  }
}
