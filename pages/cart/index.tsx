import Head from "next/head";
import React from "react";
import { withAuthorization } from "../../common/config/HOC/withAuth";
import CartList from "../../containers/cart/CartList";
import CartPayment from "../../containers/cart/CartPayment";

import FooterSection from "../../components/FooterSection";
import HeaderV2 from "../../components/HeaderV2";

interface ICartPageProps {}

const Cart: React.FC<ICartPageProps> = (props) => {
  return (
    <div className="bg-white">
      <Head>
        <title>Giỏ hàng - Sneakery</title>
        <link rel="icon" />
      </Head>
      <div className="pb-16 bg-white">
        <HeaderV2 />
        <div className="flex flex-col laptop:flex-row gap-y-10  justify-between mt-10 mx-auto laptop:px-0 px-8 laptop:w-5/6 gap-x-10 ">
          <CartList />
          <CartPayment />
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default withAuthorization(Cart);
