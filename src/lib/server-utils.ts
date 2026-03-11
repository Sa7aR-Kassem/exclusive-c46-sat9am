import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const cookie = await cookies()
    const token =
        cookie.get("next-auth.session-token")?.value ||
        cookie.get("__Secure-next-auth.session-token")?.value;
    // console.log("addToCart", token);
    if (!token) {
        return null;
    }

    const decoded = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    // console.log("addToCart encodedToken", encodedToken?.accessToken);

    return decoded?.accessToken ?? null;
}