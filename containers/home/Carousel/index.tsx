import Image from "next/image";
import React from "react";
import Slider from "react-slick";

interface ICarsoselProps {}

const Carousel: React.FC<ICarsoselProps> = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <div className="shadow-lg mt-5">
      <Slider {...settings}>
        <div className="w-screen">
          <Image
            src="https://theme.hstatic.net/200000384421/1000931147/14/home_slider_image_1.jpg?v=18"
            height={500}
            width={1500}
            className="bg-contain"
            layout="responsive"
          />
        </div>
        <div className="w-screen">
          <Image
            src="https://theme.hstatic.net/200000384421/1000931147/14/home_slider_image_2.jpg?v=18"
            height={500}
            width={1500}
            className="bg-contain"
            layout="responsive"
          />
        </div>
        <div className="w-screen">
          <Image
            src="https://theme.hstatic.net/200000384421/1000931147/14/home_slider_image_3.jpg?v=18"
            height={500}
            width={1500}
            className="bg-contain"
            layout="responsive"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
