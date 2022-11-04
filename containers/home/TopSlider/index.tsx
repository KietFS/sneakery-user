import React, { ReactNode, useState } from "react";
import Image from "next/image";
import {
  BanknotesIcon,
  CheckBadgeIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";

interface ITopSliderProps {}

const TopSlider: React.FC<ITopSliderProps> = (props) => {
  const benefits: { title: string; subTitle: string; icon: ReactNode }[] = [
    {
      title: "Giá cả hợp lý",
      subTitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Perferendis quis velit iure at, doloribus eum veritatis tempora",
      icon: (
        <BanknotesIcon className="text-blue-500 h-12 w-12 tablet:h-20 tablet:w-20 laptop:h-32 laptop:w-32 mx-auto" />
      ),
    },
    {
      title: "Giá cả hợp lý",
      subTitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Perferendis quis velit iure at, doloribus eum veritatis tempora",
      icon: (
        <CheckBadgeIcon className="text-blue-500 h-12 w-12 tablet:h-20 tablet:w-20 laptop:h-32 laptop:w-32 mx-auto" />
      ),
    },
    {
      title: "Giá cả hợp lý",
      subTitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Perferendis quis velit iure at, doloribus eum veritatis tempora",
      icon: (
        <TruckIcon className="text-blue-500 h-12 w-12 tablet:h-20 tablet:w-20 laptop:h-32 laptop:w-32 mx-auto" />
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-5 justify-center mt-20 ">
      <h2 className="text-gray-500 font-bold text-3xl text-center">
        Những lợi ích khi bạn tham gia cùng chúng tôi
      </h2>
      <div className="grid space-x-0 space-y-5 laptop:space-y-0 laptop:grid-cols-3 laptop:space-x-5">
        {benefits?.map((item, index) => (
          <div className="border-2 border-gray-200 rounded-lg h-40 laptop:h-80 justify-between px-4 laptop:px-0 laptop:justify-center items-center flex flex-row laptop:flex-col space-y-2 cursor-pointer hover:opacity-70 ">
            {item.icon}
            <div className="space-y-1 justify-center laptop:px-4 w-2/3 laptop:w-full">
              <p className="text-gray-500 font-semibold text-2xl laptop:text-center">
                {item.title}
              </p>
              <p className="text-gray-500 text-sm laptop:text-center">
                {item.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSlider;
