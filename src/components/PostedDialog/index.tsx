import axios from 'axios'
import React, { useEffect, useState } from 'react'

//styles
import PostedCard from '@/designs/PostedCard'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//store
import { IRootState } from '@/redux'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'

interface IPostedDialogProps {
  open: boolean
  onClose: () => void
}

interface IPostedProduct {
  bidId: string
  bidStartingDate: string
  priceStart: number
  stepBid: number
  priceWin: number | null
  product: {
    id: number
    name: string
    startPrice: number
    imagePath: string
    username: string
    bidClosingDate: string
  }
}

const PostedDialog: React.FC<IPostedDialogProps> = props => {
  const { open, onClose } = props
  const [items, setItems] = useState<IPostedProduct[]>([])
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getPostedItems = async () => {
    try {
      setIsLoading(true)
      //THIS NEED TO FIX
      const response = await axios.get(
        `${Config.API_URL}/bids/uploaded-products/`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )
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

  useEffect(() => {
    getPostedItems()
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
              Sản phẩm bạn đã đăng
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
                    <PostedCard
                      key={index.toString()}
                      title={item.product.name}
                      status={item.priceWin === null ? 'pending' : 'success'}
                      imagePath={item.product.imagePath}
                      createdAt={item.bidStartingDate?.toString().prettyDate()}
                    />
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
                    Bạn chưa đăng sản phẩm nào
                  </h1>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostedDialog
