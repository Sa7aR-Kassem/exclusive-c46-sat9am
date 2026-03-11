"use server"

import { shippingAddressType } from "@/app/(user)/checkout/page";
import { getUserToken } from "@/lib/server-utils";
import { revalidatePath, revalidateTag } from "next/cache";



export async function createAnOrder(cartId: string, formValues: shippingAddressType) {
    try {
        console.log('createAnOrder', cartId, formValues);
        const { paymentMethod, ...shippingAddress } = formValues
        const endpoint = paymentMethod === "cash" ? `/api/v2/orders/${cartId}` : `/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`
        const token = await getUserToken()

        const resp = await fetch(`https://ecommerce.routemisr.com${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },
            body: JSON.stringify({ shippingAddress })
        });

        const data = await resp.json()


        if (!resp.ok) {
            throw new Error(data.message || "Failed to add item to cart");
        }
        const successRes = {
            ...data,
            status: true
        }

        console.log('successRes sucess', successRes);

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
