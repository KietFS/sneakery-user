import { ISellerFeedBacks } from '@/types'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

interface ISellerFeedbackCardPros extends ISellerFeedBacks {}

const SellerFeedBackCard: React.FC<ISellerFeedbackCardPros> = props => {
  const { seller, winner, feedbackText, product } = props

  const router = useRouter()

  return (
    <div className="flex justify-between w-full border-gray-300 border-b pb-4">
      <div className="flex gap-x-2">
        <Avatar sx={{ bgcolor: '#3b82f6', marginTop: 1 }}>
          {winner?.username?.[0]}
        </Avatar>
        <div>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-800">
              {winner?.username}
            </p>
            <p className="text-gray-500 text-xs text-sm ml-1">
              đã đánh giá vào ngày{' '}
              {props.createdAt?.toString().prettyDate() || ''}
            </p>
          </div>

          <p className="text-gray-600 text-sm">{feedbackText}</p>
          <div className="flex items-center gap-x-1">
            <p className="text-gray-500 text-xs text-sm">Đã thắng sản phẩm</p>
            <button
              className="text-blue-500 text-xs text-sm"
              onClick={() => router.replace(`/products/${product?.id}`)}
            >
              {product?.name}
            </button>
          </div>

          <p className="text-green-600 text-xs mt-1 font-bold">
            Người dùng đã được xác thực
          </p>
        </div>
      </div>
    </div>
  )
}

export default SellerFeedBackCard
