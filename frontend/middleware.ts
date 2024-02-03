import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const token = request.cookies.get("auth");
  // const isLogin = pathname === "/login";
  // const isDashboard = pathname.startsWith("/dashboard");

  // if (isLogin) {
  //   if (token) {
  //     await verifyToken(token.value);
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  //   return NextResponse.next();
  // }

  // if (isDashboard) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  //   try {
  //     await verifyToken(token.value);
  //     return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // }

  return NextResponse.next();
}
