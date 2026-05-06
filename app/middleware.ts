import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const authCookie = req.cookies.get("admin_auth")?.value;

  if (isAdminPage && authCookie !== "true") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/login" && authCookie === "true") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
