import Head from "next/head";
import React from "react";
import FooterSection from "../../components/FooterSection";
import HeaderV2 from "../../components/HeaderV2";
import LeftSide from "../../containers/createProduct/LeftSide";
import RightSide from "../../containers/createProduct/RightSide";

interface ICreateProductProps {}

const CreateProduct: React.FC<ICreateProductProps> = (props) => {
  return (
    <>
      <div className="bg-white">
        <Head>
          <title>Sneakery - Đăng sản phẩm</title>
          <link rel="icon" />
        </Head>
        <div className="pb-16 bg-white">
          <HeaderV2 />
        </div>
        <div className="w-5/6 flex mx-auto gap-x-5   bg-white h-fit rounded-xl p-1">
          <div className="w-2/3">
            <LeftSide />
          </div>
          <div className="w-1/3">
            <RightSide />
          </div>
        </div>
        <FooterSection />
      </div>
    </>
  );
};

export default CreateProduct;
