"use client"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { formatePrice } from '@/lib/formatter';
import { Button } from '@/components/ui/button';
import { ProductCart } from "@/interfaces/cart.interface";
import { updateProductQty } from "@/actions/cart.actions";
import { toast } from "sonner";


export default function CartTableRow({ product }: { product: ProductCart }) {

    async function updateProductQuantity(id: string, count: number) {
        const res = await updateProductQty(id, count)
        if (res.status) {
            toast.success(res.message)
        } else {
            toast.error(res.error.message)

        }
    }

    return (
        <TableRow >
            <TableCell className="font-medium">
                <div className='flex items-center gap-2'>

                    <Image src={product.product.imageCover} alt={product.product.title} width={54} height={54} />
                    <h2 className='truncate' title={product.product.title} >{product.product.title} </h2>
                </div>
            </TableCell>
            <TableCell>{formatePrice(product.price)}</TableCell>
            <TableCell>
                <div className='flex items-center gap-1'>
                    <Button onClick={() => updateProductQuantity(product.product.id, product.count - 1)} variant={'outline'} size={"xs"}>-</Button>

                    {product.count}
                    <Button onClick={() => updateProductQuantity(product.product.id, product.count + 1)} variant={'outline'} size={"xs"}>+</Button>
                </div>

            </TableCell>
            <TableCell className="text-right " >{formatePrice(product.price * product.count)}</TableCell>
        </TableRow>
    )
}
