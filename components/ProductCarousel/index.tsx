import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";

interface IProductCarouselProps {}

const ProductCarousel: React.FC<IProductCarouselProps> = (props) => {
  return (
    <div className="mt-20">
      <div className="pb-1 border-b-2 border-b-gray-300 w-full flex justify-between">
        <h2 className="my-auto">Nam</h2>
        <div className="flex flex-row-reverse w-1/6 items-center">
          <ArrowRightIcon className="text-primary-500 w-6 h-6 ml-2" />
          <h3 className="text-primary-500 my-auto">Xem tất cả</h3>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4 space-x-4">
        <div className=" h-80  border border-gray-200 rounded-lg"></div>
        <div className=" h-80  border border-gray-200 rounded-lg"></div>
        <div className=" h-80 border border-gray-200 rounded-lg"></div>
        <div className=" h-80 border border-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ProductCarousel;
