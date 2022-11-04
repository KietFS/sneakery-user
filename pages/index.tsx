import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { IRootState } from "../redux";
import React from "react";
import { setUser } from "../redux/slices/auth";
import Head from "next/head";

import HeaderV2 from "../containers/home/HeaderV2";
import HeroSection from "../containers/home/Hero";
import TopSlider from "../containers/home/TopSlider";
import ProductGrid from "../containers/home/ProductGrid";
import VideoSection from "../containers/home/VideoSection";
import StepSection from "../containers/home/StepSection";
import PartnerSection from "../containers/home/PartnerSection";
import ContactSection from "../containers/home/ContactSection";
import FooterSection from "../containers/home/FooterSection";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const storageUser = localStorage.getItem("user");
    console.log("Called");
    storageUser && dispatch(setUser(JSON.parse(storageUser)));
  }, []);
  const { user } = useAppSelector((state: IRootState) => state.auth);

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
          <ProductGrid />
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

export default Home;
