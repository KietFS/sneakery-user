import {
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import InputSearch from "../../../components/InputSearch";
import {
  ShoppingBagIcon as ShoppingBagIconOutline,
  UserCircleIcon as UserCircleIconOutline,
  HeartIcon as HeartIconOutline,
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface INavBarProps {}

const NavigationBar: React.FC<INavBarProps> = (props) => (
  <div className="flex justify-between items-center px-4 tablet:px-8  laptop:px-14 py-4 shadow-lg">
    <div className="hidden tablet:flex w-0 tablet:w-3/4 laptop:w-2/3 ">
      <h1 className="text-secondary text-3xl uppercase h-10 my-auto mr-0 tablet:mr-4 laptop:mr-6  desktop:mr-24 hidden tablet:flex font-serif cursor-pointer">
        Sneakery
      </h1>
      {/* <div className="tablet:mr-4 laptop:mr-6 desktop:mr-24 hidden tablet:flex">
          <Image
            src="https://drake.vn/image/catalog/H%C3%ACnh%20content/logo-vans/vans-logo_2.jpg"
            width={210}
            height={120}
          />
        </div> */}
      <div className="hidden w-0 tablet:flex tablet:w-full items-center cursor-pointer">
        <div className="flex items-center group mr-2 laptop:mr-4 desktop:mr-6 ">
          <h1 className="font-semibold tablet:text-sm laptop:text-xl my-auto mr-1 group-hover:text-primary-500 group-hover:border-b-2 group-hover:border-b-primary-500">
            Nam
          </h1>
          <ChevronDownIcon className="w-4 h-4 mt-1 group-hover:text-primary-500" />
        </div>
        <div className="flex items-center group mr-2 laptop:mr-4 desktop:mr-6">
          <h1 className="font-semibold tablet:text-sm laptop:text-xl my-auto mr-1 group-hover:text-primary-500 group-hover:border-b-2 group-hover:border-b-primary-500">
            Nữ
          </h1>
          <ChevronDownIcon className="w-4 h-4 mt-1 group-hover:text-primary-500" />
        </div>

        <div className="flex items-center group mr-2 laptop:mr-4 desktop:mr-6">
          <h1 className="font-semibold tablet:text-sm laptop:text-xl my-auto mr-1 group-hover:text-primary-500 group-hover:border-b-2 group-hover:border-b-primary-500">
            Về Sneakery
          </h1>
          <ChevronDownIcon className="w-4 h-4 mt-1 group-hover:text-primary-500" />
        </div>
        <div className="flex items-center group mr-2 laptop:mr-4 desktop:mr-6">
          <h1 className="font-semibold tablet:text-sm laptop:text-xl my-auto mr-1 group-hover:text-primary-500 group-hover:border-b-2 group-hover:border-b-primary-500">
            Tuyển dụng
          </h1>
          <ChevronDownIcon className="w-4 h-4 mt-1 group-hover:text-primary-500" />
        </div>
      </div>
    </div>

    <div className="w-full tablet:flex tablet:w-1/4 laptop:w-1/3 justify-between items-center">
      <InputSearch />

      <div className="hidden tablet:flex flex-row-reverse items-center ml-4">
        <ShoppingBagIconOutline className="w-6 h-6  text-secondary-500 cursor-pointer" />
        <HeartIconOutline className="w-6 h-6 mr-2  text-secondary-500 cursor-pointer" />
        <UserCircleIconOutline className="w-6 h-6 mr-2 text-secondary-500 cursor-pointer" />
      </div>
    </div>
  </div>
);

export default NavigationBar;
