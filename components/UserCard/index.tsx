import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../hooks/useRedux";
import { IRootState } from "../../redux";
import {
  ArrowsRightLeftIcon,
  BanknotesIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import AddressDialog from "../AddressDialog";
import AccountDialog from "../AccountDialog";
import OrderHistoryDialog from "../OrderHistoryDialog";
import LogoutConfirmDialog from "../LogoutConfirmDialog";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PostedDialog from "../PostedDialog";
import WalletDialog from "../WalletDialog";
import WithDrawDialog from "../WithDrawDialog";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function MultipleSelectPlaceholder() {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { user } = useAppSelector((state: IRootState) => state.auth);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const router = useRouter();

  const logOut = () => {
    try {
      console.log("LOG OUT");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Đăng xuất thành công", {
        position: "top-right",
        hideProgressBar: true,
        theme: "colored",
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [openAddressDialog, setOpenAddressDialog] =
    React.useState<boolean>(false);
  const [openAccountDialog, setOpenAccountDialog] =
    React.useState<boolean>(false);
  const [openOrderHistory, setOpenOrderHistory] =
    React.useState<boolean>(false);
  const [openLogoutDialog, setOpenLogoutDialog] =
    React.useState<boolean>(false);
  const [openPostedDialog, setOpenPostedDialog] =
    React.useState<boolean>(false);
  const [walletDialog, setWalletDialo] = React.useState<boolean>(false);
  const [openWithDraw, setOpenWithDraw] = React.useState<boolean>(false);

  return (
    <div>
      <FormControl>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          className="outline-none border-0"
          style={{
            border: 0,
            height: 45,

            borderWidth: 0,
            borderColor: "transparent",

            borderRadius: 7,
          }}
          input={<OutlinedInput />}
          renderValue={() => (
            <div className="flex justify-between items-center py-4">
              <p className="w-8 h-8 p-2 rounded-full  border-1 border-gray-200 bg-blue-500 text-white font-semibold items-center justify-center flex text-lg mr-2">
                {user?.username?.[0].toUpperCase()}
              </p>

              <p className="text-gray-600 font-semibold hidden laptop:flex">
                {user?.username || "Tuan Kiet"}
              </p>
            </div>
          )}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenAccountDialog(true);
            }}
          >
            <p className="text-gray-500 text-sm ">Cài đặt tài khoản</p>
            <UserIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenAddressDialog(true);
            }}
          >
            <p className="text-gray-500 text-sm ">Cài đặt địa chỉ</p>
            <MapPinIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenOrderHistory(true);
            }}
          >
            <p className="text-gray-500 text-sm ">Lịch sử đấu giá</p>
            <ClockIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenPostedDialog(true);
            }}
          >
            <p className="text-gray-500 text-sm ">Sản phẩm đã đăng</p>
            <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setWalletDialo(true);
            }}
          >
            <p className="text-gray-500 text-sm ">Nạp tiền vào ví</p>
            <WalletIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenWithDraw(true);
            }}
          >
            <p className="text-gray-500 text-sm ">Rút tiền</p>
            <ArrowsRightLeftIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenLogoutDialog(true);
            }}
          >
            <p className="text-gray-500 text-sm ">Đăng xuất</p>
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </div>
        </Select>
      </FormControl>
      <AddressDialog
        open={openAddressDialog}
        onClose={() => setOpenAddressDialog(false)}
      />
      <AccountDialog
        open={openAccountDialog}
        onClose={() => setOpenAccountDialog(false)}
      />
      <OrderHistoryDialog
        open={openOrderHistory}
        onClose={() => setOpenOrderHistory(false)}
      />
      <LogoutConfirmDialog
        open={openLogoutDialog}
        onConfirm={() => logOut()}
        onClose={() => setOpenLogoutDialog(false)}
      />
      <PostedDialog
        open={openPostedDialog}
        onClose={() => setOpenPostedDialog(false)}
      />
      <WalletDialog open={walletDialog} onClose={() => setWalletDialo(false)} />
      <WithDrawDialog
        open={openWithDraw}
        onClose={() => setOpenWithDraw(false)}
      />
    </div>
  );
}
