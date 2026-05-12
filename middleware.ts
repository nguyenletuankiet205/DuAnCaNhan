import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { csrfCookieName } from "@/lib/security/constants";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database.types";

function ensureCsrfCookie(request: NextRequest, response: NextResponse) {
  if (!request.cookies.get(csrfCookieName)?.value) {
    response.cookies.set(csrfCookieName, crypto.randomUUID().replace(/-/g, ""), {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8
    });
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  ensureCsrfCookie(request, response);

  const { enabled, url, anonKey } = getSupabaseEnv();
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = request.nextUrl.pathname.startsWith("/dang-nhap");

  if (!enabled || !url || !anonKey) {
    if (isDashboard) {
      return NextResponse.redirect(new URL("/dang-nhap?reason=missing-env", request.url));
    }
    return response;
  }

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        ensureCsrfCookie(request, response);
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (isDashboard && !user) {
    const redirectUrl = new URL("/dang-nhap", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLogin && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)"]
};
