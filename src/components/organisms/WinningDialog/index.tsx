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
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import { PaymentOutlined, PaymentsSharp } from '@mui/icons-material'
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

  const handlePressCheckout = async (item: IWonProduct) => {
    try {
      await localStorage.setItem('productId', String(item.bidId))
      await localStorage.setItem('paymentType', 'PAID')
      dispatch(setWonProductSelected(item))
      router.replace('/checkOut')
    } catch (error) {
      toast.error('Không thể thanh toán sản phẩm này. Vui lòng thử lại sau!')
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
                            <p className="text-xs text-gray-500 font-semibold">
                              Giá cuối cùng:{' '}
                            </p>
                            <p className="text-green-500 font-semibold text-xs">
                              {' '}
                              {item.priceWin?.toString().prettyMoney()}$
                            </p>
                          </div>
                          <div className="flex gap-x-1 items-center">
                            <p className="text-xs text-gray-500 font-semibold">
                              Số lượt đấu giá: {item?.product?.numberOfBids}
                            </p>
                          </div>
                          <div className="flex gap-x-1 items-center">
                            <p className="text-xs text-gray-500 font-semibold">
                              Trạng thái:
                            </p>
                          </div>
                          <div className="flex gap-x-1 items-center">
                            <p className="text-xs text-gray-500 font-semibold">
                              Thời gian còn lại để thanh toán:
                            </p>
                          </div>
                        </div>
                        <Tooltip title="Thanh toán">
                          <IconButton onClick={() => handlePressCheckout(item)}>
                            <PaymentsSharp
                              width={20}
                              height={20}
                              className="text-green-500"
                            />
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
    </>
  )
}

export default WinningDialog
