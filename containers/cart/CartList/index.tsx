import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { PlayIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useAppSelector } from "../../../hooks/useRedux";
import { IRootState } from "../../../redux";

interface ICartList {}

const CartList: React.FC<ICartList> = (props) => {
  const { user } = useAppSelector((state: IRootState) => state.auth);

  const items: any[] = [];

  return (
    <div className="h-fit laptop:min-h-[600px] laptop:w-4/5 w-full bg-white rounded-lg border border-gray-200 shadow-lg px-8 py-4">
      <h3 className="text-xl laptop:text-2xl text-blue-500 font-bold">
        Giỏ hàng của bạn (1)
      </h3>
      <p className=" text-xs laptop:text-sm text-gray-500 w-full laptop:w-1/2">
        *Đây là những sản phẩm bạn đã thắng được qua đấu giá, nếu bạn không hoàn
        tất thanh toán trong khoảng thời gian quy định thì bạn sẽ bị mất lượt
      </p>
      <div className="flex flex-col gap-y-5 mt-10">
        <div className="grid grid-cols-3 laptop:grid-cols-6 gap-x-10 py-2 px-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600 font-semibold text-xs laptop:text-lg ">
            Tên
          </p>
          <p className="text-gray-600 font-semibold text-lg hidden laptop:flex">
            Size
          </p>
          <p className="text-gray-600 font-semibold text-lg hidden laptop:flex">
            Hình ảnh
          </p>
          <p className="text-gray-600 font-semibold text-lg hidden laptop:flex">
            Mua từ
          </p>
          <p className="text-gray-600 font-semibold text-xs laptop:text-lg">
            Giá
          </p>
          <p className="text-gray-600 font-semibold text-xs laptop:text-lg">
            Action
          </p>
        </div>
        {items.map((item, index) => (
          <div
            className="grid grid-cols-3 laptop:grid-cols-6 gap-x-10 py-2 px-4 border border-gray-200 rounded-lg items-center"
            key={index.toString()}
          >
            <h3 className="text-gray-600 font-regular text-xs laptop:text-lg">
              {item.product.name}
            </h3>
            <h3 className="text-gray-600 font-regular text-lg laptop:flex hidden">
              10.5 (US)
            </h3>
            <div className="hidden laptop:flex">
              <Image
                src="https://sneakerdaily.vn/wp-content/uploads/2022/04/giay-air-jordan-1-retro-high-obsidian-unc-575441-140-10.png.webp"
                width={100}
                height={100}
                layout="fixed"
                className="mx-auto"
              />
            </div>
            <div className="hidden laptop:flex cursor-pointer">
              <h3 className="text-blue-500 font-semibold text-lg">Quoc Sieu</h3>
              <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="text-gray-600 font-regular text-xs laptop:text-lg">
              213.112.000đ
            </h3>
            <div className="flex">
              <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
                <PlayIcon className="text-gray-500 w-3 h-3 laptop:w-6 laptop:h-6" />
              </div>
              <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
                <TrashIcon className="text-gray-500 w-3 h-3 laptop:w-6 laptop:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;
