import CommonSlider from "@/components/shared/CommonSlider/CommonSlider";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/interfaces/categories.interface";
import { getCategories } from "@/services/categories.service";
import { CategoriesResponse } from "@/types/response.type";
import { SwiperOptions } from "swiper/types";

export default async function Categories() {
  const categories: CategoriesResponse = await getCategories();
  // console.log(categories);

  const images = categories.data.map(function (cat: Category) {
    return {
      path: cat.image,
      name: cat.name,
    };
  });
  // console.log(images);

  const categoriesSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 5,
      },
      1500: {
        slidesPerView: 6,
      },
    },
  };

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle title="Categories" subtitle="Shop by categories" />

        <CommonSlider
          images={images}
          swiperOptions={categoriesSwiperOptions}
          isMainSlider={false}
        />

        <Separator className="my-12" />
      </div>
    </section>
  );
}
