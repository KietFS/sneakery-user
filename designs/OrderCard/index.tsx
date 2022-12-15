import React from "react";
import Image from "next/image";
import { ClockIcon } from "@heroicons/react/24/outline";
import { IBidHistoryItem } from "../../components/OrderHistoryDialog";

interface IOrderCardProps {
  order: IBidHistoryItem;
}

const OrderCard: React.FC<IOrderCardProps> = (props) => {
  const { order } = props;
  return (
    <div className="rounded-lg border border-gray-200 px-2 py-2 flex flex-col gap-y-5 w-full cursor-pointer hover:opacity-80">
      <div className="flex gap-x-3 items-center">
        <Image src={order.imagePath} width={80} height={80} />
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-gray-600 font-semibold">
            {order.productName}
          </p>
          <div className="flex gap-x-1 items-center">
            <ClockIcon className="w-4 h-4 text-gray-600" />
            <p className="text-xs text-gray-600">
              {order.createdAt?.toString().prettyDate()}
            </p>
          </div>
          {order.status === "success" && (
            <div className="rounded-full bg-green-200 text-green-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
              Thành công
            </div>
          )}
          {order.status === "pending" && (
            <div className="rounded-full bg-yellow-100 text-yellow-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
              Đang chờ
            </div>
          )}
          {order.status === "failed" && (
            <div className="rounded-full bg-red-200 text-red-800 font-semibold px-[5px] py-[2px] text-[8px] w-fit">
              Thất bại
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
