// import Categories from "@/components/home/Categories/Categories";
import MainSlider from "@/components/home/MainSlider/MainSlider";
import { lazy, Suspense } from "react";
import { SkeletonListing } from "@/components/shared/SkeletonListing/SkeletonListing";
// import Products from "@/components/home/Products/Products";

const Categories = lazy(
  () => import("@/components/home/Categories/Categories"),
);
const Products = lazy(() => import("@/components/home/Products/Products"));

export default function Home() {

  async function getBrands() {
    const res = await fetch('http://localhost:3000/api/brands');
    const data = await res.json()
    console.log(data);

  }

  getBrands()





  return (
    <>
      {/* Main Slider */}
      <MainSlider />
      {/* Categories */}
      <Suspense fallback={<SkeletonListing />}>
        <Categories />
      </Suspense>
      {/* Products */}
      <Suspense fallback={<SkeletonListing />}>
        <Products />
      </Suspense>
    </>
  );
}
