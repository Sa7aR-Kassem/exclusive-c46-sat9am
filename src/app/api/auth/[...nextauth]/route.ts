import { authOptions } from "@/next-auth/authOptions";
import NextAuth from "next-auth";

const authHandler = NextAuth(authOptions);


export { authHandler as GET, authHandler as POST }