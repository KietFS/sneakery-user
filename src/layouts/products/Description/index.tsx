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
    <div className="border-t border-gray-100 px-8 pt-4 pb-8">
      <div>
        <p className="text-blue-500 text-xl laptop:text-2xl font-semibold">
          Các thông tin của sản phẩm
        </p>
        {Object.entries(properties)?.map(([key, value]) => (
          <div className="flex items-center mt-2">
            <p className="font-bold text-gray-500 text-sm">{key}</p>
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
          {!!props?.productDetail?.description
            ? 'Mô tả của sản phẩm'
            : 'Sản phẩm này không có mô tả'}
        </h2>

        <p className="text-gray-500 text-sm italic">
          {!!props?.productDetail?.description
            ? '*Lưu ý: Thông tin mô tả dưới đây là do người đăng cung cấp'
            : ''}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          {props?.productDetail?.description || ''}
        </p>
      </div>
    </div>
  )
}

export default ProductDescription
