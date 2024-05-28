import React, { useEffect, useState } from 'react'

//styles
import Image from 'next/image'

//utils
import { IProductDetail } from '@/types'
import ProductCommentCard from '@/components/molecules/ProductCommentCard'

interface IProductCommentProps {}

const ProductComment: React.FC<IProductCommentProps> = props => {
  const dummyData = [
    {
      user: 'Kiet Huynh',
      comment:
        'Lorem ispum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    },
    {
      user: 'Hung Doan',
      comment:
        'Lorem ispum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    },
    {
      user: 'Khoa Huynh',
      comment:
        'Lorem ispum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    },
  ]

  return (
    <div className="h-fit rounded-lg shadow-lg bg-white mt-4 border border-gray-200 w-full px-8 pt-4 pb-8">
      <div>
        <p className="text-blue-500 text-xl laptop:text-2xl font-semibold">
          Bình luận về sản phẩm
        </p>
      </div>

      <div className="mt-2">
        {dummyData?.map((item, index) => (
          <ProductCommentCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default ProductComment
