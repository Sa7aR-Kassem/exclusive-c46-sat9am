import ProductCard from "@/components/products/ProductCard/ProductCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { formatePrice } from "@/lib/formatter";
import { getProducts } from "@/services/products.service";
import { ProductsResponse } from "@/types/response.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductsPage() {
  const products: ProductsResponse = await getProducts();
  console.log(products);

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle title="Products" subtitle="Explore our products" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
