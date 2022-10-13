import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { IRootState } from "../redux";
import React from "react";
import { setUser } from "../redux/slices/auth";

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
    <h1 onClick={() => router.push("/cart")}>Xin chào {user?.username}</h1>
  );
};

export default Home;
