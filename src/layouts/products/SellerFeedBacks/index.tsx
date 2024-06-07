import React, { useEffect, useState } from 'react'

//styles
import Image from 'next/image'

//utils
import {
  IProductComment,
  IProductDetail,
  ISellerFeedBacks,
  TypeId,
} from '@/types'
import ProductCommentCard from '@/components/molecules/ProductCommentCard'
import CommentInput from '@/components/atoms/CommentInput'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import { configResponse, forceLogOut } from '@/utils/request'
import { toast } from 'react-toastify'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import SellerFeedBackCard from '@/components/molecules/SellerFeedBackCard'
import { Avatar } from '@mui/material'

interface ISellerFeedBackProps {
  productDetail: IProductDetail
}

const SellerFeedBacks: React.FC<ISellerFeedBackProps> = props => {
  const { productDetail } = props
  const [feedBacks, setFeedBacks] = useState<ISellerFeedBacks[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  console.log('product feedbacks', feedBacks)

  const getSellerFeedBacks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${Config.API_URL}/feedbacks/seller/${productDetail.seller?.id}`,
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
    if (!!productDetail) {
      getSellerFeedBacks()
    }
  }, [productDetail])

  return (
    <div className="h-fit rounded-lg shadow-lg bg-white mt-4 border border-gray-200 w-full px-8 pt-4 pb-8">
      <div className="flex items-center gap-x-2">
        <p className="text-blue-500 text-xl laptop:text-2xl font-semibold">
          Đánh giá về người bán
        </p>
        <button className="text-blue-500 text-xl laptop:text-2xl font-semibold underline">
          {productDetail?.seller?.username}
        </button>
        <p className="text-gray-500 text-xl laptop:text-2xl font-semibold">
          {feedBacks?.length > 0 && `( ${feedBacks?.length} )`}
        </p>
      </div>

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
  )
}

export default SellerFeedBacks
