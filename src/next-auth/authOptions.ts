import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from 'jwt-decode'
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Exclusive",
            credentials: {
                email: { label: "User Email", placeholder: "example@domain.com", type: "email" },
                password: { label: "User password", placeholder: "*******", type: "password" }
            },
            async authorize(credentials, req) {
                // execute when signing in
                // call api signin
                // credentials => values form
                // success => User data (obj)
                // error => false / null

                try {

                    const resp = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        }),
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    })

                    const data = await resp.json()



                    if (!resp.ok) {
                        throw new Error(data.message || "Invalid Credentials");

                    }

                    console.log('authorize', data);

                    // const decoded = JSON.parse(atob(data.token).split(".")[1])
                    interface DecodedToken {
                        id: string
                    }

                    const decoded = jwtDecode<DecodedToken>(data.token)

                    return {
                        id: decoded.id,
                        email: data.user.email,
                        name: data.user.name,
                        accessToken: data.token
                    }


                } catch (error) {
                    console.log(error);
                    throw new Error((error as Error).message);

                }




            },
        })
    ],


    session: {
        maxAge: 60 * 60 * 24 * 7,
    },


    callbacks: {
        jwt({ token, user }) {
            console.log("jwt", { token, user });

            if (user) {
                token.accessToken = user.accessToken;
                token.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }

            return token
        },

        session({ token, session }) {
            // 1. useSession , 2. getServerSession, 3. /api/auth/session
            console.log("session", { token, session });

            if (token) {
                session.user = token.user

            }

            return session
        },
    },

    pages: {
        signIn: "/login"
    }
}