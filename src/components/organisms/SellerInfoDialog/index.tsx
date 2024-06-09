import React, { useEffect, useState } from 'react'

//styles
import { Dialog, DialogContent, Tooltip } from '@mui/material'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { ISellerFeedBacks, IUser, TypeId } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { Config } from '@/config/api'
import SellerFeedBackCard from '@/components/molecules/SellerFeedBackCard'

interface ISellerInfoDialogProps {
  open: boolean
  onClose: () => void
  seller: IUser
}

const SellerInfoDialog: React.FC<ISellerInfoDialogProps> = props => {
  const { open, onClose, seller } = props
  const [feedBacks, setFeedBacks] = useState<ISellerFeedBacks[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const getSellerFeedBacks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${Config.API_URL}/feedbacks/seller/${seller?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response?.data?.success) {
        setFeedBacks(response?.data?.data)
      } else {
        setFeedBacks([])
      }
    } catch (error) {
      console.log('GET PRODUCT FEEDBACk ERROR', error)
      setFeedBacks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (seller) {
      getSellerFeedBacks()
    }
  }, [seller])

  return (
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
            <div className="flex items-center gap-x-2">
              <p className="text-blue-500 text-xl laptop:text-2xl font-semibold">
                Thông tin đánh giá người bán {seller?.username}
              </p>
            </div>
            <Tooltip onClick={() => onClose()} title="Đóng">
              <XMarkIcon className="w-8 h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer" />
            </Tooltip>
          </div>
          <div className="h-fit rounded-lg bg-white w-full">
            {loading ? (
              <div className="flex flex-col gap-y-5 mt-4">
                <div className="w-full h-[80px] rounded-xl bg-gray-100 animate-pulse"></div>
                <div className="w-full h-[80px] rounded-xl bg-gray-100 animate-pulse"></div>
                <div className="w-full h-[80px] rounded-xl bg-gray-100 animate-pulse"></div>
                <div className="w-full h-[80px] rounded-xl bg-gray-100 animate-pulse"></div>
                <div className="w-full h-[80px] rounded-xl bg-gray-100 animate-pulse"></div>
                <div className="w-full h-[80px] rounded-xl bg-gray-100 animate-pulse"></div>
              </div>
            ) : (
              <>
                {feedBacks?.length > 0 ? (
                  <>
                    <div className="mt-2">
                      {feedBacks?.map((item, index) => (
                        <SellerFeedBackCard key={index} {...item} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-x-1  mt-4">
                    <InformationCircleIcon className="text-gray-500 w-[20px] h-[20px]" />
                    <p className="text-gray-500 font-bold italic text-sm">
                      Người bán chưa có đánh giá nào
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SellerInfoDialog
