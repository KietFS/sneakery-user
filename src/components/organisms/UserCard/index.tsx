import * as React from 'react'

//styles
import {
  BuildingLibraryIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import AddressDialog from '@/components/organisms/AddressDialog'
import AccountDialog from '@/components/organisms/AccountDialog'
import LogoutConfirmDialog from '@/components/organisms/LogoutConfirmDialog'
import PostedDialog from '@/components/templates/PostedDialog'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import FormControl from '@mui/material/FormControl'
import { IRootState } from '@/redux'
import WinningDialog from '../WinningDialog'
import HistoryDialog from '../TransactionHisotryDialog'
import { useAuth } from '@/hooks/useAuth'
import UserBidHistoryDialog from '@/components/organisms/UserBidHistoryDialog'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

export default function UserCard() {
  //state
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const { logOut } = useAuth()
  const [personName, setPersonName] = React.useState<string[]>([])
  const [openAddressDialog, setOpenAddressDialog] =
    React.useState<boolean>(false)
  const [openAccountDialog, setOpenAccountDialog] =
    React.useState<boolean>(false)
  const [openOrderHistory, setOpenOrderHistory] = React.useState<boolean>(false)
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState<boolean>(false)
  const [openPostedDialog, setOpenPostedDialog] = React.useState<boolean>(false)
  const [openWinningDialog, setOpenWinningDialog] =
    React.useState<boolean>(false)
  const [openHistoryDialog, setOpenHistoryDialog] =
    React.useState<boolean>(false)
  const [openUserBidDialog, setOpenUserBidDialog] =
    React.useState<boolean>(false)

  //functions
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

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
            borderColor: 'transparent',

            borderRadius: 7,
          }}
          input={<OutlinedInput />}
          renderValue={() => (
            <div className="flex justify-between items-center py-4">
              <p className="w-8 h-8 p-2 rounded-full  border-1 border-gray-200 bg-blue-500 text-white font-semibold items-center justify-center flex text-lg mr-2">
                {user?.username?.[0].toUpperCase()}
              </p>

              <p className="text-gray-600 font-semibold hidden laptop:flex">
                {user?.username || 'Tuan Kiet'}
              </p>
            </div>
          )}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenAccountDialog(true)
            }}
          >
            <p className="text-gray-500 text-sm ">Thông tin tài khoản</p>
            <UserIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenAddressDialog(true)
            }}
          >
            <p className="text-gray-500 text-sm ">Quản lý địa chỉ</p>
            <MapPinIcon className="h-5 w-5 text-gray-500" />
          </div>

          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenWinningDialog(true)
            }}
          >
            <p className="text-gray-500 text-sm ">Sản phẩm đã thắng</p>
            <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenPostedDialog(true)
            }}
          >
            <p className="text-gray-500 text-sm ">Sản phẩm đã đăng</p>
            <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenHistoryDialog(true)
            }}
          >
            <p className="text-gray-500 text-sm ">Lịch sử giao dịch</p>
            <ClockIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenUserBidDialog(true)
            }}
          >
            <p className="text-gray-500 text-sm ">Lịch sử đấu giá của bạn</p>
            <BuildingLibraryIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div
            className="py-2 px-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              setOpenLogoutDialog(true)
            }}
          >
            <p className="text-gray-500 text-sm ">Đăng xuất</p>
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </div>
        </Select>
        <AddressDialog
          open={openAddressDialog}
          onClose={() => setOpenAddressDialog(false)}
        />

        <AccountDialog
          open={openAccountDialog}
          onClose={() => setOpenAccountDialog(false)}
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

        <WinningDialog
          open={openWinningDialog}
          onClose={() => setOpenWinningDialog(false)}
        />

        <HistoryDialog
          open={openHistoryDialog}
          onClose={() => setOpenHistoryDialog(false)}
        />

        <UserBidHistoryDialog
          open={openUserBidDialog}
          onClose={() => setOpenUserBidDialog(false)}
        />
      </FormControl>
    </div>
  )
}
