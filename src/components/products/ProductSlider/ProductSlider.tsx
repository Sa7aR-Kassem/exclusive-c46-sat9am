"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import Image from "next/image";
import { useState } from "react";

interface ProductSliderProps {
  images: string[];
}

export default function ProductSlider({ images }: ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mb-3">
        {images.map((src, idx) => (
          <SwiperSlide key={src}>
            <div className="bg-gray-100 mb-2 min-h-64 flex justify-center items-center">
              <Image
                className={"mx-auto"}
                src={src}
                alt={`${src}-${idx}`}
                width={180}
                height={190}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper">
        {images.map((src, idx) => (
          <SwiperSlide key={src}>
            <div className="bg-gray-100 mb-2 min-h-8 flex justify-center items-center">
              <Image
                className={"mx-auto"}
                src={src}
                alt={`${src}-${idx}`}
                width={80}
                height={90}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
