import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { IRootState } from "../redux";
import React, { useEffect } from "react";
import { setUser } from "../redux/slices/auth";
import Head from "next/head";

import HeaderV2 from "../components/HeaderV2";
import HeroSection from "../containers/home/Hero";
import TopSlider from "../containers/home/TopSlider";
import ProductGrid from "../containers/home/ProductGrid";
import VideoSection from "../containers/home/VideoSection";
import StepSection from "../containers/home/StepSection";
import PartnerSection from "../containers/home/PartnerSection";
import ContactSection from "../containers/home/ContactSection";
import FooterSection from "../components/FooterSection";
import axios from "axios";
import { IUser } from "../types/user";

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const storageUser = localStorage.getItem("user");
    console.log("Called");
    storageUser && dispatch(setUser(JSON.parse(storageUser)));
  }, []);
  const { user } = useAppSelector((state: IRootState) => state.auth);

  const setUserFromStorage = async () => {
    try {
      const data = await localStorage.getItem("user");
      const newData = JSON.parse(data as string) as IUser;
      dispatch(setUser(newData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserFromStorage();
  }, []);

  useEffect(() => {
    console.log("USER FROM HOME PAGE", user);
  }, [user]);

  return (
    <>
      <Head>
        <title>Trang chủ - Sneakery</title>
        <link rel="icon" />
      </Head>
      <div className="pb-32">
        <HeaderV2 />
        <HeroSection />
        <div className="w-5/6 mx-auto space-y-20">
          <TopSlider />
          <ProductGrid
            listProducts={props.products as IProductHomePageResponse[]}
          />
          <VideoSection />
          <StepSection />
          <PartnerSection />
          <ContactSection />
        </div>
        <FooterSection />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  products: IProductHomePageResponse[];
}> = async (context) => {
  // Fetch data from external API
  const data = await axios.get(
    "https://sneakery.herokuapp.com/api/products/homepage"
  );
  let products: IProductHomePageResponse[] = [];
  if (data.data.data.products) {
    products = data.data?.data?.products as IProductHomePageResponse[];
  }

  console.log("PRODUCT IS", data.data.data.products);

  return { props: { products } };
};

export default Home;
