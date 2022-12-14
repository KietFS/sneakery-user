import {
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import InputSearch from "../../designs/InputSearch";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import { setCategory } from "../../redux/slices/filter";
import UserCard from "../UserCard";

interface IHeaderV2Props {}

const HeaderV2: React.FC<IHeaderV2Props> = (props) => {
  const { user, isAuth } = useAppSelector((state: IRootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="w-full shadow-lg pb-4 laptop:pb-0 ">
      <div className="w-full flex space-x-4 tablet:space-x-6 laptop:space-x-6 desktop:space-x-8 items-center px-4 py-4  justify-between laptop:justify-around">
        <div className="flex laptop:hidden  w-1/3 laptop:w-0">
          <div className="bg-gray-100 p-2 rounded-lg active:bg-gray-300">
            <Bars3Icon className="text-gray-500 font-bold w-5 h-5" />
          </div>
        </div>
        <p
          className="text-3xl font-bold text-blue-500 w-1/3 laptop:w-fit text-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          Sneakery
        </p>
        <div className="flex w-1/3 laptop:hidden laptop:w-0 flex-row-reverse">
          {isAuth ? (
            <UserCard />
          ) : (
            <div className="flex flex-row-reverse laptop:hidden  w-1/3 laptop:w-0">
              <div className="p-2 rounded-full bg-gray-100 active:bg-gray-300 justify-center items-center flex">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="p-2 rounded-full bg-gray-100 active:bg-gray-300 justify-center items-center flex mr-2">
                <UserPlusIcon className="w-5 h-5 text-gray-600 mx-auto" />
              </div>
            </div>
          )}
        </div>
        {/* <Image
        src="https://t4.ftcdn.net/jpg/04/60/99/63/360_F_460996349_bIzl423o41oLdi5hJIgNT3OD8SViuo9i.jpg"
        width={100}
        height={60}
      /> */}
        <div className="laptop:w-[230px] desktop:w-[400px] hidden laptop:flex">
          <InputSearch />
        </div>
        <div className="laptop:flex justify-between items-center space-x-10 hidden">
          <p
            className=" text-gray-500 font-bold text-sm cursor-pointer hover:text-gray-700"
            onClick={() => {
              dispatch(setCategory("nam"));
              router.push("/category");
            }}
          >
            Nam
          </p>
          <p
            className=" text-gray-500 font-bold text-sm cursor-pointer hover:text-gray-700 "
            onClick={() => {
              dispatch(setCategory("nu"));
              router.push("/category");
            }}
          >
            Nữ
          </p>
          <p
            className=" text-gray-500 font-bold text-sm cursor-pointer hover:text-gray-700"
            onClick={() => {
              dispatch(setCategory("unisex"));
              router.push("/category");
            }}
          >
            Unisex
          </p>
          <p
            className=" text-gray-500 font-bold text-sm cursor-pointer hover:text-gray-700"
            onClick={() => router.push("/cart")}
          >
            Giỏ hàng
          </p>
        </div>
        <div className="hidden laptop:flex">
          {isAuth ? (
            <UserCard />
          ) : (
            <div className="hidden laptop:flex flex-end space-x-0.5 items-center w-64">
              <button
                className="items-center rounded-xl px-4 py-2 text-center text-gray-600  text-sm w-fit flex hover:bg-gray-100"
                onClick={() => router.push("/auth/register")}
              >
                <UserPlusIcon className="w-5 h-5 text-gray-600 mr-1" />
                Đăng ký
              </button>
              <button
                className=" rounded-xl px-4 py-2 text-center text-gray-600  text-sm w-fit flex space-x-1 items-center hover:bg-gray-100"
                onClick={() => router.push("/auth/login")}
              >
                <UserIcon className="w-5 h-5 text-gray-600 mr-1" />
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex laptop:hidden px-2">
        <InputSearch />
      </div>
    </div>
  );
};

export default HeaderV2;
