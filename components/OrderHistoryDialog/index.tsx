import { XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import React, { useState } from "react";
import OrderCard from "../../designs/OrderCard";

interface IOrderHistoryDialogProps {
  open: boolean;
  onClose: () => void;
}

const OrderHistoryDialog: React.FC<IOrderHistoryDialogProps> = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog
      onClose={onClose}
      open={open}
      className="rounded-lg"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogContent className="max-h-[600px]">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 font-bold text-2xl mb-2">
              Lịch sử đấu giá của bạn
            </h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-y-5">
            <OrderCard title="Air Jordan Dior Travis Scott" status="pending" />
            <OrderCard title="Air Jordan Dior Travis Scott" status="pending" />
            <OrderCard title="Air Jordan Dior Travis Scott" status="pending" />
            <OrderCard title="Air Jordan Dior Travis Scott" status="success" />
            <OrderCard title="Air Jordan Dior Travis Scott" status="success" />
            <OrderCard title="Air Jordan Dior Travis Scott" status="failed" />
            <OrderCard title="Air Jordan Dior Travis Scott" status="failed" />
            <OrderCard title="Air Jordan Dior Travis Scott" status="success" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistoryDialog;
