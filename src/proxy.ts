import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/cart", "/checkout", "/allorders", "/profile"]
const authRoutes = ["/login", "/register"]

export async function proxy(request: NextRequest) {
    // 

    const { pathname } = request.nextUrl

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production"
    });

    if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (token && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }


    console.log("token", token);


    return NextResponse.next()
}


export const config = {
    matcher: [
        "/cart/:path*",
        "/profile/:path*",
        "/login",
        "/register"
    ]
}