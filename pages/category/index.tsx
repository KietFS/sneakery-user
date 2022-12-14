import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import HeaderV2 from "../../components/HeaderV2";
import FooterSection from "../../components/FooterSection";
import ProductGridV2 from "../../containers/category/ProductGridV2";
import FilterSideBar from "../../containers/category/FilterSideBar";
import Spinner from "../../components/Spinner";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import { Pagination } from "@mui/material";
import SelectSortType from "../../containers/category/SelectSortType";
import NotFound from "../../assets/images/NotFound.png";
import Image from "next/image";
interface IProductProps {}

const Category = (props: IProductProps) => {
  const [listProduct, setListProduct] = useState<IProductHomePageResponse[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const {
    brand,
    category,
    condition,
    color,
    priceEnd,
    priceStart,
    sortType,
    keyWord,
    size,
  } = useAppSelector((state: IRootState) => state.filter);
  const [pageSelected, setPageSelected] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const url = `https://sneakery.herokuapp.com/api/products?${
        keyWord !== null ? `keyword=${keyWord}` : ""
      }${condition !== null ? `&condition=${condition}` : ""}${
        category !== null ? `&category=${category}` : ""
      }${
        brand.length > 0
          ? `&brand=${brand.map((item, index) =>
              index !== brand.length ? `${item}` : `${item}`
            )}`
          : ""
      }${
        color.length > 0
          ? `&color=${color.map((item, index) =>
              index !== color.length ? `${item}` : `${item}`
            )}`
          : ""
      }${
        size.length > 0
          ? `&size=${size.map((item, index) =>
              index !== size.length ? `${item}` : `${item}`
            )}`
          : ""
      }${priceStart !== null ? `&priceStart=${priceStart}` : ""}${
        priceEnd !== null ? `&priceEnd=${priceEnd}` : ""
      }${sortType !== null ? `&sorting=${sortType}` : ""}`;
      console.log("URL here", url);
      const data = await axios.get(url);
      if (data) {
        setError(false);
        setListProduct(data.data.data.products);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [
    category,
    condition,
    brand,
    size,
    color,
    priceStart,
    priceEnd,
    sortType,
    keyWord,
  ]);

  return (
    <>
      <div className="bg-white">
        <Head>
          <title>Sneakery - Lọc sản phẩm</title>
          <link rel="icon" />
        </Head>
        <div className="pb-16 bg-white">
          <HeaderV2 />
        </div>
        <div className="w-5/6 mx-auto flex gap-x-10">
          <div className="w-1/4">
            <FilterSideBar />
          </div>
          <div className="w-3/4">
            <div className="w-full justify-between flex mb-4 items-center">
              <div></div>
              <SelectSortType />
            </div>
            {loading ? (
              <div className="w-full flex justify-center items-center h-[500px]">
                <Spinner />
              </div>
            ) : (
              <>
                {error === true && loading == false ? (
                  <div className="flex flex-col items-center justify-center gap-y-5 mt-16">
                    <Image
                      src={NotFound}
                      className="rounded-lg border border-red-200"
                      width={300}
                      height={300}
                    />
                    <p className="text-xl text-gray-500 font-semibold">
                      Không tìm thấy sản phẩm mà bạn yêu cầu, vui lòng thử lại
                    </p>
                  </div>
                ) : (
                  <>
                    <ProductGridV2 listProducts={listProduct} />
                    <div className="w-full mt-4 justify-between flex items-center">
                      <div></div>
                      <Pagination
                        count={3}
                        boundaryCount={10}
                        shape="rounded"
                        page={pageSelected}
                        onChange={(event, page) =>
                          setPageSelected(page as number)
                        }
                        color="primary"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <FooterSection />
      </div>
    </>
  );
};

export default Category;
