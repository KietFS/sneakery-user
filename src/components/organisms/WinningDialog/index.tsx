import axios from 'axios'
import React, { useEffect, useState } from 'react'

//styles
import PostedCard from '@/components/molecules/PostedCard'
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'
import {
  InformationCircleIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//store
import { IRootState } from '@/redux'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import ConfirmDialog from '../ConfirmDialog'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import { PaymentOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setWonProductSelected } from '@/redux/slices/payment'
import { IWonProduct } from '@/types/product'

interface IWinningDialogProps {
  open: boolean
  onClose: () => void
}

interface ICartItem {
  id: number
  product: {
    id: number
    name: string
    startPrice: 126
    imagePath: string
    userName: string
    bidClosingDate: string
  }
  priceWin: number
  status: 'PENDING' | 'APPROVED'
}

const WinningDialog: React.FC<IWinningDialogProps> = props => {
  const { open, onClose } = props
  const [items, setItems] = useState<IWonProduct[]>([])
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [orderSelected, setOrderSelected] = useState<string | number>('')
  const { accessToken } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()

  const getWinningItems = async () => {
    try {
      setIsLoading(true)
      //THIS NEED TO FIX
      const response = await axios.get(`${Config.API_URL}/bids/win`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        setIsLoading(false)
        setItems(data?.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('Client Error', error)
    }
  }

  const resetWinningItems = async () => {
    try {
      //THIS NEED TO FIX
      const response = await axios.get(`${Config.API_URL}/bids/win`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        setItems(data?.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
      console.log('Client Error', error)
    }
  }

  const approveWinningItem = async () => {
    try {
      setActionLoading(true)
      //THIS NEED TO FIX
      const response = await axios.put(
        `${Config.API_URL}/orders/${orderSelected}/`,
        {
          status: 'APPROVED',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        setActionLoading(false)
        setOpenConfirmDialog(false)
        resetWinningItems()
        toast.success('Thêm sản phẩm vào giỏ hàng thành công')
      } else {
        console.log('Error', error)
      }
    } catch (error) {
      setActionLoading(false)
      console.log('Client Error', error)
    }
  }

  useEffect(() => {
    getWinningItems()
  }, [])

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        className="rounded-lg"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogContent className="max-h-[600px]">
          <div className="flex flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-600 font-bold text-2xl mb-2">
                Sản phẩm bạn đã thắng
              </h1>
              <Tooltip onClick={() => onClose()} title="Đóng">
                <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
              </Tooltip>
            </div>
            {isLoading ? (
              <div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>{' '}
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
                <div className="mt-4 animate-pulse bg-gray-300 w-full h-[100px] rounded-md"></div>
              </div>
            ) : (
              <>
                {items.length > 0 ? (
                  <div className="flex flex-col gap-y-5">
                    {items.map((item, index) => (
                      <div className="flex w-full gap-x-3 items-center">
                        <img
                          src={item.product.imagePath as string}
                          width={120}
                          height={80}
                        />
                        <div className="flex flex-col gap-y-2 w-2/3">
                          <div className="flex gap-x-1 items-center">
                            <p className="text-sm text-gray-600 font-semibold">
                              {item.product.name}
                            </p>
                          </div>

                          <div className="flex gap-x-1 items-center">
                            <p className="text-xs text-gray-600">
                              Giá cuối cùng:{' '}
                              {item.priceWin?.toString().prettyMoney()}$
                            </p>
                          </div>
                          <div className="flex gap-x-1 items-center">
                            <p className="text-xs text-gray-600">
                              Số lượt đấu giá: {item?.product?.numberOfBids}
                            </p>
                          </div>
                        </div>
                        <Tooltip title="Thanh toán">
                          <IconButton
                            onClick={() => {
                              dispatch(setWonProductSelected(item))
                              router.replace('/checkOut')
                            }}
                          >
                            <PaymentOutlined width={20} height={20} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <InformationCircleIcon
                      width={20}
                      height={20}
                      className="text-gray-600 mr-2"
                    />
                    <h1 className="text-gray-500 font-regular text-md">
                      Bạn chưa thắng sản phẩm nào
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={openConfirmDialog}
        title="Bạn có chắc muốn hủy lượt đấu giá cho sản phẩm này"
        description="Hành động này không thể quay lại"
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={approveWinningItem}
        isConfirmLoadingButton={actionLoading}
      />
    </>
  )
}

export default WinningDialog
