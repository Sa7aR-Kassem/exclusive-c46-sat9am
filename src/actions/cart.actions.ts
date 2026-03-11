"use server"

import { getUserToken } from "@/lib/server-utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export async function getUserCart() {
    try {

        const token = await getUserToken()

        const resp = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            next: { tags: ['cartDetails'] }
        });

        const data = await resp.json()


        if (!resp.ok) {
            throw new Error(data.message || "Failed to fetch cart items");
        }
        // (await cookies()).set('cartId', data.cartId)

        return {
            ...data,
            status: true
        }


    } catch (error) {
        return {
            error,
            status: false
        }
    }
}
export async function addToCart(productId: string) {
    try {

        const token = await getUserToken()

        const resp = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            body: JSON.stringify({ productId })
        });

        const data = await resp.json()


        if (!resp.ok) {
            throw new Error(data.message || "Failed to add item to cart");
        }
        const successRes = {
            ...data,
            status: true
        }
        if (successRes.status) {
            revalidateTag("cartDetails", "max")
        }
        return successRes


    } catch (error) {
        return {
            error,
            status: false
        }
    }
}
export async function updateProductQty(productId: string, count: number) {
    try {

        const token = await getUserToken()

        const resp = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            body: JSON.stringify({ count })

        });

        const data = await resp.json()


        if (!resp.ok) {
            throw new Error(data.message || "Failed to update product qty");
        }

        const successRes = {
            ...data,
            status: true
        }

        if (resp.status) {
            // revalidatePath('/cart')
            revalidateTag("cartDetails", "max")
        }

        return successRes


    } catch (error) {
        return {
            error,
            status: false
        }
    }
}