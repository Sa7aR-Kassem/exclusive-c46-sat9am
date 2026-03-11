import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatePrice } from "@/lib/formatter";
import { Product } from "@/interfaces/products.interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="col-span-1" key={product.id}>
      <div className="bg-gray-100  mb-4  relative group overflow-hidden ">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={180}
          height={190}
          className="mx-auto"
        />

        {/* <Button className="capitalize w-full absolute -bottom-10 group-hover:bottom-0 invisible group-hover:visible z-0">
          add to cart
        </Button> */}
        <AddToCartButton productId={product.id} className="absolute -bottom-10 group-hover:bottom-0 invisible group-hover:visible z-0" />

      </div>
      <h3 className="text-lg font-semibold mb-2 truncate" title={product.title}>
        <Link href={`/products/${product._id}`}> {product.title}</Link>
      </h3>
      <div className="flex justify-between mb-2">
        <p
          className={
            product.priceAfterDiscount
              ? "text-gray-500 line-through"
              : "text-red-600 "
          }>
          {formatePrice(product.price)}
        </p>
        {product?.priceAfterDiscount && (
          <p className="text-red-600">
            {formatePrice(product.priceAfterDiscount)}
          </p>
        )}
      </div>

      <div className="flex gap-1">
        <Star className="text-yellow-500 fill-yellow-500" />
        <span>{product.ratingsAverage}</span>
        <span className="text-gray-500">({product.ratingsQuantity})</span>
      </div>
    </div>
  );
}
