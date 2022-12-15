import { XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../designs/Button";
import OrderCard from "../../designs/OrderCard";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import Spinner from "../Spinner";

interface IWalletDialogProps {
  open: boolean;
  onClose: () => void;
}

const WalletDialog: React.FC<IWalletDialogProps> = (props) => {
  const { open, onClose } = props;
  const { user } = useAppSelector((state: IRootState) => state.auth);
  const [money, setMoney] = useState<number | null>(null);
  const [isExisted, setIsExisted] = useState<boolean | null>(null);
  const [createSuccess, setCreateSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionCharge, setActionCharge] = useState<boolean>(false);

  const getWallet = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://sneakery.herokuapp.com/api/wallet/get/${user?.id}`
      );
      data && console.log("WALLET DATA", data);
      if (data) {
        if (data.data?.data === null) {
          setIsExisted(false);
        } else {
          setIsExisted(true);
          setMoney(data.data?.data.balance);
        }
      }
    } catch (error) {
      console.log("GET WALLET ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const createWallet = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        "https://sneakery.herokuapp.com/api/wallet/create",
        {
          email: user?.email,
        }
      );
      if (data) {
        setCreateSuccess(true);
        await getWallet();
      }
    } catch (error) {
      console.log("CREATE WALLET ERROR", error);
      setCreateSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const charge = async () => {
    try {
      const data = await axios.post(
        "https://sneakery.herokuapp.com/api/paypal/deposit",
        {
          userId: Number(user?.id),
          amount: 5,
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    console.log("EXISTED", isExisted);
  }, [isExisted]);

  useEffect(() => {
    getWallet();
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
            <h1 className="text-gray-600 font-bold text-2xl">Ví của bạn</h1>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8 h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full text-white text-[60px] text-center items-center flex justify-center font-semibold">
              {user?.username?.[0].toUpperCase()}
            </div>
            <p className="text-gray-600 font-semibold text-xl mt-2">
              {user?.username}
            </p>
            <>
              {loading && (
                <div className="mt-2">
                  <Spinner size={20} />{" "}
                </div>
              )}
              {isExisted === true && loading === false ? (
                <>
                  <div className="flex w-fit gap-x-2 justify-between items-center mt-2">
                    <p className="text-gray-500 text-sm font-semibold">
                      Số dư ví Paypal:
                    </p>
                    <p className="text-sm font-semibold px-2 py-1 bg-blue-50 text-blue-900 rounded-full">
                      {money}$
                    </p>
                  </div>
                  <p className="text-sm font-semibold px-4 py-1 bg-blue-500 text-white rounded-full mt-2 cursor-pointer hover:opacity-80">
                    Nạp thêm tiền
                  </p>
                </>
              ) : (
                <>
                  {loading === false ? (
                    <>
                      <p className="text-gray-500 text-sm font-semibold mt-2 text-center">
                        Bạn hiện chưa liên tài khoản thanh toán PayPal trên hệ
                        thống của chúng tôi
                      </p>
                      <p
                        className="text-sm font-semibold px-4 py-1 bg-blue-50 text-blue-900 rounded-full mt-4 cursor-pointer hover:opacity-80"
                        onClick={() => createWallet()}
                      >
                        Tạo ngay bằng email của bạn
                      </p>
                    </>
                  ) : null}
                </>
              )}
            </>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
