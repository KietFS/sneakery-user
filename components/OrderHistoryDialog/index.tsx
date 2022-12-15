import { XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderCard from "../../designs/OrderCard";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";

interface IOrderHistoryDialogProps {
  open: boolean;
  onClose: () => void;
}

type IOrderStatus = "success" | "pending" | "failed";

export interface IBidHistoryItem {
  productName: string;
  imagePath: string;
  price: number;
  createdAt: string;
  status: IOrderStatus;
}

const OrderHistoryDialog: React.FC<IOrderHistoryDialogProps> = (props) => {
  const { open, onClose } = props;
  const [bids, setBids] = useState<IBidHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state: IRootState) => state.auth);

  const getBidHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://sneakery.herokuapp.com/api/bid_history/user/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response) {
        setBids(response.data.data);
      }
    } catch (error) {
      console.log("BID HISTORY ERRORS", { error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBidHistory();
  }, []);

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
            {bids.map((item) => (
              <OrderCard order={item} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistoryDialog;
