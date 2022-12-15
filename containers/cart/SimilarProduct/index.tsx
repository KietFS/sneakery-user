import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface ISimilarProduct {
  brand: string;
  currentProductId: number;
  category: string;
}

const SimilarProduct: React.FC<ISimilarProduct> = (props) => {
  const [listProduct, setListProduct] = useState<IProductHomePageResponse[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getSimilarProducts = async () => {
    try {
      setLoading(true);
      const url = `https://sneakery.herokuapp.com/api/products?category=${props.category}&brand=${props.brand}`;
      const data = await axios.get(url);
      if (data) {
        setListProduct(data.data.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSimilarProducts();
  }, []);

  return (
    <div className="h-fit rounded-lg shadow-lg bg-white mt-10 border border-gray-200 w-full px-8 pt-4 pb-8">
      <h2 className="text-xl laptop:text-2xl text-blue-500 font-bold">
        Sản phẩm tương tự
      </h2>
      <div className="mt-10 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-x-5 gap-y-5">
        {listProduct.map((item, index) => {
          if (index <= 7 && Number(item.id) !== props.currentProductId)
            return (
              <div
                className="h-fit py-10 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
                key={index.toString()}
              >
                <Image src={item.imagePath} width={200} height={150} />
                <div className="justify-center px-4 space-y-1 mx-auto">
                  <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                    {item.name.truncate(30)}
                  </h1>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Được bán bởi:{" "}
                    </p>
                    <p className="text-xs font-semibold text-blue-500">
                      {item.username}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Giá khởi điểm:{" "}
                    </p>
                    <p className="text-xs font-bold text-gray-500">
                      {item.startPrice.toString().prettyMoney()}$
                    </p>
                  </div>
                </div>
              </div>
            );
          else {
            return null;
          }
        })}
      </div>
      {/* <div className="mt-10 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-5 gap-x-5 gap-y-5">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div
            className="h-fit py-10 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
            key={index.toString()}
          >
            <Image
              src="https://sneakerdaily.vn/wp-content/uploads/2022/04/giay-air-jordan-1-retro-high-obsidian-unc-575441-140-10.png.webp"
              width={150}
              height={150}
            />
            <div className="justify-center px-4 space-y-1 mx-auto">
              <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                Jordan 1 Blue
              </h1>
              <div className="flex items-center justify-center">
                <p className="text-xs text-gray-500 font-normal text-center mr-1">
                  Được bán bởi:{" "}
                </p>
                <p className="text-xs font-semibold text-blue-500">Quốc Siêu</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-xs text-gray-500 font-normal text-center mr-1">
                  Giá khởi điểm:{" "}
                </p>
                <p className="text-xs font-bold text-gray-500">131.000.000</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SimilarProduct;
