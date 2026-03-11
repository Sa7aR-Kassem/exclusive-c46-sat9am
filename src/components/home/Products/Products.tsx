import ProductCard from "@/components/products/ProductCard/ProductCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/products.service";
import { ProductsResponse } from "@/types/response.type";
import Link from "next/link";

export default async function Products() {
  const products: ProductsResponse = await getProducts(8);
  console.log(products);
  const popular = products.data.filter((product) => product.sold >= 1000);

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle title="Products" subtitle="Explore our products" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {popular.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="capitalize" variant={"destructive"} asChild>
            <Link href={"/products"}>view all products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
