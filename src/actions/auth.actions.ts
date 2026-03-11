"use server";

import { LoginPayloadType } from "@/schema/login.schema";
import { cookies } from "next/headers";

export async function loginHandler(formValues: LoginPayloadType) {
    try {

        const resp = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": 'application/json'
            }
        })

        const data = await resp.json()



        if (!resp.ok) {
            throw new Error(data.message || "Invalid Credentials");

        }

        const cookie = await cookies()
        cookie.set("user-token", data.token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            // secure : {}
        })

        return data


    } catch (error) {
        console.log(error);
        return error
    }
}
export async function registerHandler(formValues: LoginPayloadType) {
    try {

        const resp = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": 'application/json'
            }
        })

        const data = await resp.json()



        if (!resp.ok) {
            throw new Error(data.message || "Invalid Credentials");

        }


        return {
            ...data,
            ok: true
        }


    } catch (error) {
        console.log(error);
        return {
            error,
            ok: false
        }
    }
}





// localStore .. 
// Cookies 
// 1. 4kb 
// 2. customized  .. expired 
// 3. Access SS , CS



// Next 
// NextAuth .. login 
// 1. Route Handler
// 1. - Secure API
//    - Secure Response
//    - Secure Token (Optional but recommend)     
// 2. Providers  

// 2. Server Actions