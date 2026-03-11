import { getUserCart } from '@/actions/cart.actions'
import { CartResponse } from '@/interfaces/cart.interface';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import Image from 'next/image';
import { formatePrice } from '@/lib/formatter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import CartTableRow from '@/components/cart/CartTableRow/CartTableRow';

export default async function CartPage() {

  const cartDetails: CartResponse = await getUserCart()

  console.log(cartDetails);

  const products = cartDetails.data?.products

  return (

    <section className='py-12'>
      <div className="container">

        {products?.length > 0 ? <>
          <section className='mb-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='max-w-96 '>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Sub Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  products.map(product => (
                    <CartTableRow key={product.product._id} product={product} />
                  ))
                }
              </TableBody>
            </Table>
          </section>

          <section className='flex items-center justify-between mb-6'>
            <Button className='capitalize' variant={'outline'} asChild>
              <Link href={'/products'}>Return to shop</Link>
            </Button>
            <Button className='capitalize' variant={"destructive"} >
              Remove all products
            </Button>
          </section>


          <section className='flex items-center justify-between mb-6'>
            <form className='flex items-center gap-2'>
              <Input />
              <Button className='capitalize' variant={"destructive"} >
                apply coupon
              </Button>
            </form>

            <Card className=''>
              <CardContent>
                <div>

                  <h3>Cart Total</h3>
                  Total: {cartDetails.data.totalCartPrice}
                </div>

                <Button className='capitalize' variant={"destructive"} asChild>
                  <Link href={`/checkout?cartId=${cartDetails.cartId}`}> Proceed to checkout  </Link>
                </Button>
              </CardContent>
            </Card>

          </section>
        </>
          :

          <div className='text-center'>
            <h1>Cart is Empty , Continue shopping from <Link href={'/products'}> here</Link></h1>
          </div>

        }


      </div>
    </section>
  )
}
