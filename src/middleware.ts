import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // Check when write path admin
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

// Config middleware
export const config = {
  matcher: [
    /*
     * ดักทุกอย่าง ยกเว้น:
     * - api (เดี๋ยวไปจัดการใน backend แทน)
     * - _next/static (ไฟล์ css, js)
     * - _next/image (รูปภาพ)
     * - favicon.ico (ไอคอน)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
