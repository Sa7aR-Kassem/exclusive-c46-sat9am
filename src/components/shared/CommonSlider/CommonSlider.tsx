"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { SwiperOptions } from "swiper/types";

const basicSwiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4",
    bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500",
  },
  modules: [Pagination],
};

interface Images {
  path: string;
  name: string;
}

// interface breakpoint {
//    key: {
//     slidesPerView: number
//    }
// }

interface CommonSliderProps {
  images: Images[];
  swiperOptions?: SwiperOptions,
  isMainSlider?: boolean;
}

export default function CommonSlider({
  images,
  swiperOptions,
  isMainSlider = true,
}: CommonSliderProps) {
  return (
    <section>
      <div className="container">
        <Swiper
          {...basicSwiperOptions}
          {...swiperOptions}
          className="common-slider">
          {images.map((slide) => (
            <SwiperSlide key={slide.path}>
              <div className="bg-gray-100 mb-2 min-h-64 flex justify-center items-center">
                <Image
                  className={
                    isMainSlider ? "w-full max-h-96 object-cover" : "mx-auto"
                  }
                  src={slide.path}
                  alt={slide.name}
                  width={isMainSlider ? 1920 : 180}
                  height={isMainSlider ? 600 : 190}
                />
              </div>

              {!isMainSlider && (
                <h3 className="text-lg font-semibold">{slide.name}</h3>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
