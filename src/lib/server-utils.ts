import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const cookie = await cookies()
    const token = cookie.get('next-auth.session-token')?.value
    // console.log("addToCart", token);
    const encodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    // console.log("addToCart encodedToken", encodedToken?.accessToken);


    return encodedToken?.accessToken

}