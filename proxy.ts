import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define protected routes (everything under /dashboard)
  const isDashboardRoute = path.startsWith("/dashboard");
  const isHomeRoute = path === "/";
  // The login page itself is public
  const isLoginRoute = path === "/login";
  
  // Check for the authentication cookie
  const session = request.cookies.get("admin_session")?.value;
  
  // Rules:
  // 1. If trying to access dashboard/home and NO session -> redirect to login
  if ((isDashboardRoute || isHomeRoute) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // 2. If trying to access login and HAS session -> redirect to dashboard
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

// Config to specify which paths the middleware should apply to
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes starting with /api/auth (authentication logic)
     * - static files (/_next/static, /_next/image, favicon.ico, etc.)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
