import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface IProductGridProps {}

const ProductGrid: React.FC<IProductGridProps> = (props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProductHomePage = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        "http://sneakery.herokuapp.com/api/products/homepage"
      );
      if (data) {
        setProducts(data as unknown as IProduct[]);
      }
    } catch (error) {
      console.log("Product Home page error", { error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductHomePage();
  }, []);

  return (
    <div className="flex flex-col space-y-10 items-center justify-center">
      <div className="space-y-2">
        <h2 className="text-gray-500 font-bold text-3xl text-center">
          Những deal đấu giá đang hot tại sàn của chúng tôi
        </h2>
        <p className="text-lg text-gray-500 font-normal text-center">
          Những đôi giày cực hiếm, cực đẹp
        </p>
        <p className="text-lg font-semibold text-center underline text-blue-500 hover:opacity-70 cursor-pointer">
          Xem tất cả
        </p>
      </div>

      <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 w-full gap-x-5 gap-y-10">
        {products.map((item, index) => {
          return (
            <div
              className="h-fit py-4 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
              key={index.toString()}
            >
              <Image
                src="https://sneakerdaily.vn/wp-content/uploads/2022/04/giay-air-jordan-1-retro-high-obsidian-unc-575441-140-10.png.webp"
                width={200}
                height={200}
              />
              <div className="justify-center px-4 space-y-1 mx-auto">
                <h1 className="text-lg text-gray-600 font-bold text-center my-auto">
                  {item.name}
                </h1>
                <p className="text-sm text-gray-500 font-normal text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  repudiandae molestias dicta ipsa architecto velit tenetur
                  sequi
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:opacity-70 active:opacity-80">
        Xem thêm
      </button>
    </div>
  );
};

export default ProductGrid;
