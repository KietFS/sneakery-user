import {
  Bars3Icon,
  BuildingStorefrontIcon,
  HeartIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  ShoppingBagIcon as ShoppingBagIconOutline,
  UserCircleIcon as UserCircleIconOutline,
  HeartIcon as HeartIconOutline,
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface IHomeHeaderProps {}

const HomeHeader: React.FC<IHomeHeaderProps> = (props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  return (
    <>
      <div className="bg-white tablet:bg-secondary-500 px-2 laptop:px-6 laptop:w-full py-4 mt-2 laptop:mt-0 h-10 items-center flex flex-row-reverse tablet:flex-row-reverse  justify-between">
        <div className="flex flex-row-reverse tablet:hidden  items-center w-1/3">
          <ShoppingBagIconOutline className="w-6 h-6  text-secondary-500" />
          <HeartIconOutline className="w-6 h-6 mr-1  text-secondary-500" />
          <UserCircleIconOutline className="w-6 h-6 mr-1 text-secondary-500" />
        </div>

        <p className="text-secondary-500 font-serif  text-xl mx-auto w-1/3 tablet:w-0 tablet:hidden font-extrabold uppercase text-center ">
          Sneakery
        </p>

        <div className="hidden tablet:flex tablet:w-5/6 laptop:w-1/2  justify-between items-center">
          <div className="flex group items-center cursor-pointer group-hover:text-primary-500 hover:text-primary-500">
            <BuildingStorefrontIcon
              className="mr-1 text-white h-4 w-4 group-hover:text-primary-500"
              color="white"
            />
            <p className="text-white text-sm group-hover:text-primary-500">
              Tra cứu đơn hàng
            </p>
          </div>
          <div className="flex group items-center cursor-pointer group-hover:text-primary-500 hover:text-primary-500">
            <MapPinIcon
              className="mr-1 text-white h-4 w-4 group-hover:text-primary-500"
              color="white"
            />
            <p className="text-white text-sm group-hover:text-primary-500">
              Tìm cửa hàng
            </p>
          </div>
          <div className="flex group items-center cursor-pointer group-hover:text-primary-500 hover:text-primary-500">
            <HeartIcon
              className="mr-1 text-white h-4 w-4 group-hover:text-primary-500"
              color="white"
            />
            <p className="text-white text-sm group-hover:text-primary-500">
              Yêu thích
            </p>
          </div>
          <div className="flex group items-center cursor-pointer group-hover:text-primary-500 hover:text-primary-500">
            <UserCircleIcon
              className="mr-1 text-white h-4 w-4 group-hover:text-primary-500"
              color="white"
            />
            <p className="text-white text-sm group-hover:text-primary-500">
              Đăng nhập
            </p>
          </div>
          <div className="flex group items-center cursor-pointer group-hover:text-primary-500 hover:text-primary-500">
            <ShoppingBagIcon
              className="mr-1 text-white h-4 w-4 group-hover:text-primary-500"
              color="white"
            />
            <p className="text-white text-sm group-hover:text-primary-500">
              Giỏ hàng
            </p>
          </div>
        </div>
        {isMobile ? (
          <div className="w-1/3 tablet:w-0">
            <XMarkIcon
              className="flex tablet:hidden text-secondary-500 w-8 h-8 hover:text-primary-500"
              onClick={() => setIsMobile(false)}
            />
          </div>
        ) : (
          <div className="w-1/3 tablet:w-0">
            <Bars3Icon
              className="flex tablet:hidden text-secondary-500 w-8 h-8 hover:text-primary-500"
              onClick={() => setIsMobile(true)}
            />
          </div>
        )}
      </div>
      {isMobile === true && (
        <div className="flex absolute top-10 tablet:hidden h-60 w-full bg-white shadow-lg flex-col justify-between py-4 px-2  mt-2 ">
          <div className="flex items-center group justify-between w-full ">
            <p className="text-lg text-secondary-500 group-hover:text-primary-500 mr-2">
              Nam
            </p>
            <ArrowRightIcon className="mr-1 text-secondary-500 h-6 w-6 group-hover:text-primary-500" />
          </div>
          <div className="flex items-center group justify-between w-full ">
            <p className="text-lg text-secondary-500 group-hover:text-primary-500 mr-2">
              Nữ
            </p>
            <ArrowRightIcon className="mr-1 text-secondary-500 h-6 w-6 group-hover:text-primary-500" />
          </div>
          <div className="flex items-center group justify-between w-full ">
            <p className="text-lg text-secondary-500 group-hover:text-primary-500 mr-2">
              Về Snearky
            </p>
            <ArrowRightIcon className="mr-1 text-secondary-500 h-6 w-6 group-hover:text-primary-500" />
          </div>
          <div className="flex items-center group justify-between w-full ">
            <p className="text-lg text-secondary-500 group-hover:text-primary-500 mr-2">
              Khuyến mãi
            </p>
            <ArrowRightIcon className="mr-1 text-secondary-500 h-6 w-6 group-hover:text-primary-500" />
          </div>
          <div className="flex items-center group justify-between w-full ">
            <p className="text-lg text-secondary-500 group-hover:text-primary-500 mr-2">
              Tuyển dụng
            </p>
            <ArrowRightIcon className="mr-1 text-secondary-500 h-6 w-6 group-hover:text-primary-500" />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeHeader;
