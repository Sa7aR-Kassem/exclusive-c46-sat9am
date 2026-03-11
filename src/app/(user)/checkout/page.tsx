import CheckoutForm from '@/components/checkout/Form/CheckoutForm';
import { redirect } from 'next/navigation';
import React from 'react'

interface CheckoutPageProps {
    searchParams: {
        cartId?: string
    }
}

export type shippingAddressType = {

    details: string;
    phone: string;
    city: string;
    postalCode: string;
    paymentMethod: string;

}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
    const { cartId } = searchParams
    console.log(cartId);
    if (!cartId)
        redirect('/cart')

    return (

        <section className='py-12'>
            <div className="container">
                <CheckoutForm cartId={cartId} />
            </div>
        </section>
    )
}
