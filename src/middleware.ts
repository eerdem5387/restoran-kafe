import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/session-token";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-DNS-Prefetch-Control": "off",
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

function isPublicApi(pathname: string, method: string): boolean {
  if (pathname === "/api/auth/login" && method === "POST") return true;
  if (pathname === "/api/auth/logout" && method === "POST") return true;
  if (pathname === "/api/menu" && method === "GET") return true;
  if (pathname === "/api/categories" && method === "GET") return true;
  if (pathname === "/api/settings/menu" && method === "GET") return true;
  if (pathname === "/api/reservations" && method === "POST") return true;
  return false;
}

function isProtectedApi(pathname: string, method: string): boolean {
  if (!pathname.startsWith("/api/")) return false;
  if (isPublicApi(pathname, method)) return false;

  if (pathname.startsWith("/api/reservations")) return true;
  if (pathname.startsWith("/api/upload")) return true;
  if (pathname.startsWith("/api/settings/")) return true;
  if (pathname.startsWith("/api/menu")) return method !== "GET";
  if (pathname.startsWith("/api/categories")) return method !== "GET";

  return false;
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    (process.env.NODE_ENV === "production" ? "" : "dev-insecure-session-secret-not-for-production");

  if (!secret) return false;
  return verifySessionToken(token, secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const needsAuth = isAdminPage || isProtectedApi(pathname, method);

  if (needsAuth && !(await hasValidSession(request))) {
    if (pathname.startsWith("/api/")) {
      return applySecurityHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      );
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
