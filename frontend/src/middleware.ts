import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard && !refreshToken) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};