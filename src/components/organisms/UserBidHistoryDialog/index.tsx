import React, { useEffect, useState } from 'react'

//styles
import OrderCard from '@/components/molecules/OrderCard'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogContent, Tooltip } from '@mui/material'

//utils
import axios from 'axios'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import { useAuth } from '@/hooks/useAuth'

interface IUserBidHistoryDialog {
  open: boolean
  onClose: () => void
}

export interface ICart {
  orderId: number
  product: IProductInCart
  amount: number
}

export interface IUserBidHistoryItem {
  //remove this
  orderId: number
  product: IProductInCart
  amount: number
  bidHistoryId: number
  status: 'SUCCESS' | 'REMOVE'
}

interface IProductInCart {
  id: string
  name: string
  startPrice: number
  currentPrice: number
  imagePath: string
  seller: {
    username: string
    id: string
  }
  bidIncrement: number
  bidClosingDate: string
}

const UserBidHistoryDialog: React.FC<IUserBidHistoryDialog> = props => {
  const { open, onClose } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<IUserBidHistoryItem[]>([])
  const { accessToken } = useAuth()

  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [orderSelected, setOrderSelected] = useState<number | string>('')

  const getAllItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${Config.API_URL}/bid-history/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const { isSuccess, error, data } = configResponse(response)
      if (isSuccess) {
        setItems(data.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const resetAllItems = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/bid-history/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const { isSuccess, error, data } = configResponse(response)
      if (isSuccess) {
        setItems(data.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    getAllItems()
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
                Lịch sử đấu giá của bạn
              </h1>
              <Tooltip onClick={() => onClose()} title="Đóng">
                <XMarkIcon className="w-8    h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
              </Tooltip>
            </div>
            <div className="flex flex-col gap-y-5">
              {loading ? (
                <>
                  <div className="w-full h-[110px] animate-pulse rounded-lg bg-gray-300"></div>
                  <div className="w-full h-[110px] animate-pulse rounded-lg bg-gray-300"></div>
                  <div className="w-full h-[110px] animate-pulse rounded-lg bg-gray-300"></div>
                  <div className="w-full h-[110px] animate-pulse rounded-lg bg-gray-300"></div>
                  <div className="w-full h-[110px] animate-pulse rounded-lg bg-gray-300"></div>
                  <div className="w-full h-[110px] animate-pulse rounded-lg bg-gray-300"></div>
                  <div className="w-full h-[110px] animate-pulse rounded-lg bg-gray-300"></div>
                </>
              ) : (
                <>
                  {items.map((item, index) => (
                    <OrderCard
                      order={item}
                      key={index.toString()}
                      handleCloseDialog={onClose}
                      handlePressCancel={id => {
                        setOpenConfirmDialog(true)
                        setOrderSelected(id)
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserBidHistoryDialog
