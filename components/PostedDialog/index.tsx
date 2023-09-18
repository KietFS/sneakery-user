import axios from 'axios'
import React, { useEffect, useState } from 'react'

import PostedCard from '@/designs/PostedCard'
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { XMarkIcon } from '@heroicons/react/20/solid'

//hooks
import { useAppSelector } from '@/hooks/useRedux'

//store
import { IRootState } from '@/redux'

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

  const getPostedItems = async () => {
    try {
      const response = await axios.get(
        'https://sneakery.herokuapp.com/api/bids/get_uploaded_products',
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )
      response && setItems(response?.data?.data)
      response && console.log('REPONSE', response)
    } catch (error) {
      console.log('POSTED ITEMS ERROR', error)
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
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostedDialog
