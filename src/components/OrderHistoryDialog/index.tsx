import React, { useEffect, useState } from 'react'

//styles
import OrderCard from '@/designs/OrderCard'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogContent, Tooltip } from '@mui/material'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//utils
import axios from 'axios'
import { IRootState } from '@/redux'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'

interface IOrderHistoryDialogProps {
  open: boolean
  onClose: () => void
}

type IOrderStatus = 'success' | 'pending' | 'failed'

export interface ICart {
  orderId: number
  product: IProductInCart
  amount: number
}

interface IProductInCart {
  id: string
  name: string
  condition: IProductCondition
  startPrice: number
  currentPrice: number
  imagePath: string
  category: ICategoryProps
  brand: string
  color: string
  username: string
  size: string
  bidIncrement: number
  bidClosingDate: string
}

const OrderHistoryDialog: React.FC<IOrderHistoryDialogProps> = props => {
  const { open, onClose } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<ICart[]>([])
  const { user } = useAppSelector((state: IRootState) => state.auth)

  const getAllItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${Config.API_URL}/bid-history/user`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      console.log('token', user.token)

      const { isSuccess, error, data } = configResponse(response)
      if (isSuccess) {
        console.log('succes kiet')
        setItems(data.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllItems()
  }, [])

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
            {items.map((item, index) => (
              <OrderCard order={item} key={index.toString()} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderHistoryDialog
