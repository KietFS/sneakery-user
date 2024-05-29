import { Avatar } from '@mui/material'
import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { IProductComment, IProductDetail } from '@/types'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import CommentInput from '@/components/atoms/CommentInput'
import { useForm } from 'react-hook-form'

interface IProductCommentCardProps extends IProductComment {
  productDetail: IProductDetail
}

const ProductCommentCard: React.FC<IProductCommentCardProps> = props => {
  const { commentText, parentCommentId, replies, userName } = props
  const { productDetail } = props
  const { seller } = productDetail
  const { register, control, handleSubmit } = useForm()
  const [isReplying, setIsReplying] = React.useState<boolean>(false)
  const [isTurningOnReply, setIsTurningOnReply] = React.useState<boolean>(false)

  const handlePostReply = async () => {}

  const handleTurnOnReply = () => setIsTurningOnReply(!isTurningOnReply)

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
        {replies?.map((reply, replyIndex) => (
          <div className="ml-8 mt-2 border-t border-gray-200">
            <ProductCommentCard productDetail={productDetail} {...reply} />
          </div>
        ))}
      </div>

      {isTurningOnReply ? (
        <div className="mt-4 ease-in duration-300">
          <CommentInput
            {...register('comment', {
              required: {
                value: true,
                message: 'Không được để trống phần comment',
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
