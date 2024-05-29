import React, { useEffect, useState } from 'react'

//styles
import Image from 'next/image'

//utils
import { IProductComment, IProductDetail, TypeId } from '@/types'
import ProductCommentCard from '@/components/molecules/ProductCommentCard'
import CommentInput from '@/components/atoms/CommentInput'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'

interface IProductCommentProps {
  productDetail: IProductDetail
}

const ProductComment: React.FC<IProductCommentProps> = props => {
  const { productDetail } = props

  const [comments, setComments] = useState<IProductComment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isPosting, setIsPosting] = React.useState<boolean>(false)

  const {
    control,
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const { accessToken } = useAuth()

  const handlePostComment = async () => {
    try {
      setIsPosting(true)
      if (watch('comment')?.length > 0) {
        const response = await axios.post(
          `${Config.API_URL}/comments`,
          {
            commentText: watch('comment') || '',
            parentCommentId: null,
            productId: productDetail.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        if (response?.data?.success) {
          getProductComments(productDetail?.id as TypeId)
        }
      }
    } catch (error) {
    } finally {
      setIsPosting(false)
    }
  }

  const getProductComments = async (productId: TypeId) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${Config.API_URL}/comments/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (response?.data?.success) {
        setComments(response?.data?.data)
      } else {
        setComments([])
      }
    } catch (error) {
      console.log('GET PRODUCT COMMENTS ERROR', error)
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!productDetail) {
      getProductComments(productDetail?.id as TypeId)
    }
  }, [productDetail])

  return (
    <div className="h-fit rounded-lg shadow-lg bg-white mt-4 border border-gray-200 w-full px-8 pt-4 pb-8">
      <div>
        <p className="text-blue-500 text-xl laptop:text-2xl font-semibold">
          Bình luận về sản phẩm
        </p>
      </div>

      <div className="mt-2">
        {comments?.map((item, index) => (
          <ProductCommentCard
            key={index}
            {...item}
            productDetail={props.productDetail}
          />
        ))}
      </div>

      <div>
        <CommentInput
          {...register('comment', {
            required: {
              value: true,
              message: 'Không được để trống phần comment',
            },
          })}
          control={control}
          label="Đăng bình luận"
          onPostComment={handleSubmit(handlePostComment)}
          isPosting={isPosting}
        />
      </div>
    </div>
  )
}

export default ProductComment