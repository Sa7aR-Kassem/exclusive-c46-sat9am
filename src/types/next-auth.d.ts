import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
    interface User {
        id: string;
        email: string;
        name: string;
        accessToken: string;
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {

            id: string
            email: string
            name: string

        }
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken: string
        user: {
            id: string
            email: string
            name: string
        }
    }
}