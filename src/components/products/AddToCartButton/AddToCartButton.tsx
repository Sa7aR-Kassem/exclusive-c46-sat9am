"use client"
import { addToCart } from '@/actions/cart.actions';
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext';
import React from 'react'
import { toast } from 'sonner';


interface AddToCartButtonProps extends React.ComponentProps<typeof Button> {
    productId: string
}

export default function AddToCartButton({ productId, variant, ...props }: AddToCartButtonProps) {
    const { updateNumOfCartItems } = useCart()

    async function addProductToCart(productId: string) {
        console.log("Added", productId);
        // api
        const res = await addToCart(productId)
        console.log(res);
        if (res.status) {
            toast.success(res.message)
            updateNumOfCartItems(res.numOfCartItems)
        } else {
            toast.error(res.error.message)
        }

    }


    return (
        <Button onClick={() => addProductToCart(productId)} variant={variant} {...props} className="capitalize w-full">
            add to cart
        </Button>
    )
}
