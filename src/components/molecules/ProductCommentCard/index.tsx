import { Avatar } from '@mui/material'
import React, {
  ReactComponentElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { IProductComment, IProductDetail, TypeId } from '@/types'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import CommentInput from '@/components/atoms/CommentInput'
import { useForm } from 'react-hook-form'
import ConfirmDialog from '@/components/organisms/ConfirmDialog'
import { toast } from 'react-toastify'

interface IProductCommentCardProps extends IProductComment {
  productDetail: IProductDetail
  onReplyingSuccess?: () => void
}

type ICommentMode = 'view' | 'edit'

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
  const { register, control, handleSubmit, watch, setValue } = useForm()
  const [isReplying, setIsReplying] = React.useState<boolean>(false)
  const [isTurningOnReply, setIsTurningOnReply] = React.useState<boolean>(false)
  const { accessToken, user } = useAuth()
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isCommenting, setIsCommenting] = useState<boolean>(false)
  const [commentMode, setCommentMode] = useState<ICommentMode>('view')

  const handlePostReply = async () => {
    try {
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
          toast.success('Đăng bình luận thành công')
        }
      }
    } catch (error) {
    } finally {
      setIsReplying(false)
    }
  }

  const handleDeleteComment = async () => {
    try {
      setIsDeleting(true)
      const response = await axios.delete(`${Config.API_URL}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (response?.data?.success) {
        setIsDeleting(false)
        onReplyingSuccess?.()
        toast.success('Xóa bình luận thành công')
      }
    } catch (error) {
      setIsDeleting(false)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleTurnOnEdit = () => {
    setCommentMode('edit')
    setValue('edit', commentText)
  }

  const handleSubmitEdit = async () => {
    try {
      setIsCommenting(true)
      const response = await axios.put(
        `${Config.API_URL}/comments/${id}`,
        {
          commentText: watch('edit') || '',
          parentCommentId: parentCommentId,
          productId: productDetail?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response?.data?.success) {
        setIsCommenting(false)
        onReplyingSuccess?.()
        toast.success('Chỉnh sửa bình luận thành công')
      }
    } catch (error) {
      setIsCommenting(false)
    } finally {
      setIsCommenting(false)
    }
  }

  const handleTurnOnReply = () => {
    setIsTurningOnReply(true)
  }

  return (
    <>
      {openConfirmDialog && (
        <ConfirmDialog
          title="Bạn xác nhận sẽ xóa bình luận"
          description="Hành động này không thể được hoàn tác"
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          onConfirm={handleDeleteComment}
          isConfirmLoadingButton={isDeleting}
        />
      )}
      <div className="my-2 py-3 pl-4 rounded-xl bg-gray-50 h-fit">
        <>
          {commentMode == 'view' ? (
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-x-2">
                <Avatar sx={{ bgcolor: '#3b82f6' }}>{userName?.[0]}</Avatar>
                <div>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-gray-800">
                      {seller == userName
                        ? `${userName} ( Người đăng )`
                        : userName}
                    </p>
                    <p className="text-gray-500 text-xs text-sm ml-1">
                      vào ngày{' '}
                      {props.createdAt?.toString().prettyDateTime() || ''}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm">{commentText}</p>
                  <div className="items-center flex mt-1">
                    <button
                      className="text-gray-500 hover:text-blue-500 font-regular text-xs"
                      onClick={handleTurnOnReply}
                    >
                      Trả lời
                    </button>
                    {props.userName == user.username && (
                      <button
                        className="text-gray-500 hover:text-red-500 font-regular text-xs ml-2"
                        onClick={() => setOpenConfirmDialog(true)}
                      >
                        Xóa bình luận
                      </button>
                    )}
                    {props.userName == user.username && (
                      <button
                        className="text-gray-500 hover:text-red-500 font-regular text-xs ml-2"
                        onClick={handleTurnOnEdit}
                      >
                        Chỉnh sửa
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <CommentInput
              key={id}
              {...register('edit', {
                required: {
                  value: true,
                  message: 'Không được để trống phần trả lời',
                },
              })}
              control={control}
              label="Chinh sửa bình luận"
              onPostComment={handleSubmit(handleSubmitEdit)}
              isPosting={isCommenting}
              isClosable
              onClose={() => setCommentMode('view')}
            />
          )}
        </>

        {isTurningOnReply && commentMode == 'view' ? (
          <div className="ml-12 mt-4 ease-in duration-300">
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
      </div>
    </>
  )
}

export default ProductCommentCard
