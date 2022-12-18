import { XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogContent, Tooltip } from "@mui/material";
import React from "react";
import { IProductBidHistoryItem } from "../../containers/products/RightSide";
import OrderCard from "../../designs/OrderCard";
import Image from "next/image";

interface IProductBidHistoryDialogProps {
  onClose: () => void;
  open: boolean;
  bidHistory: IProductBidHistoryItem[];
}

const ProductBidHistoryDialog: React.FC<IProductBidHistoryDialogProps> = (
  props
) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      className="rounded-lg"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogContent className="max-h-[600px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Lịch sử đấu giá của sản phẩm
            </h1>
            <Tooltip onClick={props.onClose} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-y-5">
            {props.bidHistory.map((item, index) => (
              <div className="w-full flex gap-x-5 items-center px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-lg justify-between">
                <p className="text-lg text-gray-500 font-bold">
                  {item.userName}
                </p>
                <p className="text-blue-500 font-bold text-sm cursor-pointer mr-1 ">
                  {item.bidAmount.toString().prettyMoney()}$
                </p>
                <p className="text-gray-600 text-sm cursor-pointer">
                  {item.createdAt.toString().replace("T", " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductBidHistoryDialog;
