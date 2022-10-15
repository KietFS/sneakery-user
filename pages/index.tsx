import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { IRootState } from "../redux";
import React from "react";
import { setUser } from "../redux/slices/auth";
import Head from "next/head";
import HomeHeader from "../containers/home/Header";
import NavigationBar from "../containers/home/NavBar";
import Carousel from "../containers/home/Carousel";
import ProductCarousel from "../components/ProductCarousel";

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
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/1275/1275421.png"
        />
      </Head>
      <div className="pb-32">
        <HomeHeader />
        <NavigationBar />
        <div className="w-11/12 mx-auto">
          <Carousel />
          <ProductCarousel />
          <ProductCarousel />
          <ProductCarousel />
          <ProductCarousel />
        </div>
      </div>
    </>
  );
};

export default Home;
