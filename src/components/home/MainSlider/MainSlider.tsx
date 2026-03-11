import slide1 from "@/assets/images/slider-image-1.jpeg";
import slide2 from "@/assets/images/slider-image-2.jpeg";
import slide3 from "@/assets/images/slider-image-3.jpeg";
import CommonSlider from "@/components/shared/CommonSlider/CommonSlider";

const images = [
  {
    path: slide1.src,
    name: "Slide 1",
  },
  {
    path: slide2.src,
    name: "Slide 2",
  },
  {
    path: slide3.src,
    name: "Slide 3",
  },
];

export default function MainSlider() {
  return (
    <section>
      <div className="container">
        <CommonSlider images={images} />
      </div>
    </section>
  );
}
