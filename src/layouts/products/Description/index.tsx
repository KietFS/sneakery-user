import React, { useEffect, useState } from 'react'

//styles
import Image from 'next/image'

//utils
import { IProductDetail } from '@/types'

interface IProductDescriptionProps {
  productDetail: IProductDetail
}

const ProductDescription: React.FC<IProductDescriptionProps> = props => {
  const {
    productDetail: { properties },
  } = props

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="h-fit rounded-lg shadow-lg bg-white mt-10 border border-gray-200 w-full px-8 pt-4 pb-8">
      <div>
        <p className="text-blue-500 text-xl laptop:text-2xl font-semibold">
          Các thông tin của sản phẩm
        </p>
        {Object.entries(properties)?.map(([key, value]) => (
          <div className="flex items-center mt-2">
            <p className="font-bold text-gray-500 text-sm">
              {capitalizeFirstLetter(key.toLowerCase())}:
            </p>
            <p className="text-gray-500 text-sm ml-2">
              {value == 'True'
                ? 'Có'
                : value == 'False'
                ? 'Sai'
                : `${capitalizeFirstLetter(value.toLowerCase())}`}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl laptop:text-2xl text-gray-600 font-bold">
          Mô tả sản phẩm
        </h2>

        <p className="text-gray-500 text-sm italic">
          *Lưu ý: Thông tin mô tả dưới đây là do người đăng cung cấp
        </p>

        <p className="text-gray-500 text-sm mt-2">
          {props?.productDetail?.description ||
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non minima dicta, culpa quas deserunt reprehenderit voluptatum eos sunt officiis harum. Tenetur magnam, facilis voluptatem deleniti expedita nobis! Optio, fugiat commodi'}
        </p>
      </div>
    </div>
  )
}

export default ProductDescription
