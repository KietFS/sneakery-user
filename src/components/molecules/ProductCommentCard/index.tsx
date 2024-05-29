import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { IProductComment, IProductDetail, TypeId } from '@/types'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import CommentInput from '@/components/atoms/CommentInput'
import { useForm } from 'react-hook-form'

interface IProductCommentCardProps extends IProductComment {
  productDetail: IProductDetail
  onReplyingSuccess?: () => void
}

const ProductCommentCard: React.FC<IProductCommentCardProps> = props => {
  const {
    commentText,
    parentCommentId,
    replies,
    userName,
    onReplyingSuccess,
    id,
  } = props
  const { productDetail } = props
  const { seller } = productDetail
  const { register, control, handleSubmit, watch } = useForm()
  const [isReplying, setIsReplying] = React.useState<boolean>(false)
  const [isTurningOnReply, setIsTurningOnReply] = React.useState<boolean>(false)
  const { accessToken } = useAuth()

  const handlePostReply = async () => {
    try {
      console.log('parent comment id', id)
      setIsReplying(true)
      if (watch('reply')?.length > 0) {
        const response = await axios.post(
          `${Config.API_URL}/comments`,
          {
            commentText: watch('reply') || '',
            parentCommentId: id || null,
            productId: productDetail.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        if (response?.data?.success) {
          setIsTurningOnReply(false)
          onReplyingSuccess?.()
        }
      }
    } catch (error) {
    } finally {
      setIsReplying(false)
    }
  }

  const handleTurnOnReply = () => {
    setIsTurningOnReply(true)
  }

  return (
    <div className="my-2 py-3 pl-4 rounded-xl bg-gray-50 h-fit">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-x-2">
          <Avatar sx={{ bgcolor: '#9ca3af' }}>{userName?.[0]}</Avatar>
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {seller == userName ? `${userName} ( Người đăng )` : userName}
            </p>
            <div className="mt-1">
              <p className="text-gray-600 text-sm">{commentText}</p>
            </div>
          </div>
        </div>
        <button
          className="text-gray-400 hover:text-blue-500 font-bold text-sm relative right-[20px]"
          onClick={handleTurnOnReply}
        >
          Trả lời
        </button>
      </div>

      <div>
        {replies?.map((reply, replyIndex) => {
          return (
            <div className="relative ml-2">
              <svg
                className="absolute left-0 top-0 h-full"
                width="40"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0 v50 M10 50 h30"
                  stroke="#cbd5e0"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="ml-8 mt-2 border-t border-gray-200 pl-4">
                <ProductCommentCard
                  key={replyIndex}
                  productDetail={productDetail}
                  {...reply}
                  onReplyingSuccess={() => onReplyingSuccess?.()}
                />
              </div>
            </div>
          )
        })}
      </div>

      {isTurningOnReply ? (
        <div className="mt-4 ease-in duration-300">
          <CommentInput
            key={id}
            {...register('reply', {
              required: {
                value: true,
                message: 'Không được để trống phần trả lời',
              },
            })}
            control={control}
            label="Bình luận của bạn"
            onPostComment={handleSubmit(handlePostReply)}
            isPosting={isReplying}
            isClosable
            onClose={() => setIsTurningOnReply(false)}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ProductCommentCard
