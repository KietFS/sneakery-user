import React, { useState } from "react";
import OrderShippingDetailDialog from "../../../components/OrderShippingInfoDialog";

interface ICartPaymentProps {}

const CartPayment: React.FC<ICartPaymentProps> = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <div className="laptop:w-1/5 w-full h-fit laptop:min-h-[600px] bg-white rounded-lg border border-gray-200 shadow-lg px-4 py-4 justify-between flex flex-col">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-xl text-blue-500 font-bold"> Review</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm laptop:text-lg">Tổng cộng</p>
            <p className="text-gray-600 text-sm font-semibold laptop:text-lg">
              +123.811
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm laptop:text-lg">VAT</p>
            <p className="text-gray-600 font-semibold text-sm laptop:text-lg">
              +50.000
            </p>
          </div>

          <div className="flex items-center  justify-between">
            <p className="text-gray-500 text-sm laptop:text-lg">Khuyến mãi</p>
            <p className="text-gray-600 text-sm font-semibold laptop:text-lg">
              -10.000
            </p>
          </div>

          <span className="h-0.5 w-full bg-gray-200"></span>
          <div className="flex items-center  justify-between">
            <p className="text-gray-500 text-sm laptop:text-lg">Tạm tính</p>
            <p className="text-blue-500 text-sm font-semibold laptop:text-lg">
              304.000
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="text-xs italic text-gray-400">*Đơn vị tính: VND</p>
          <button
            className="w-full text-center py-2 rounded-lg bg-red-500 text-white font-semibold hover:opacity-80"
            onClick={() => setOpenDialog(true)}
          >
            Đặt hàng ngay
          </button>
        </div>
      </div>
      <OrderShippingDetailDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default CartPayment;
