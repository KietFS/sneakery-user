import Button from '@/components/atoms/Button'
import { IWonProduct } from '@/types/product'
import Image from 'next/image'
import React from 'react'

interface IPostSaleFeeRightSideProps {
  postedProduct: any
}

const PayPostSaleFeeRightSide: React.FC<IPostSaleFeeRightSideProps> = props => {
  const { postedProduct } = props
  return (
    <div className="border-gray-200 border p-6  h-full min-h-[500px] w-1/4 rounded-lg flex flex-col justify-between">
      <div>
        <div className="w-full flex flex-col">
          <h1 className="text-gray-600 font-bold text-xl">
            Thông tin sản phẩm
          </h1>
        </div>

        <div className="mt-4">
          <Image
            src={postedProduct?.product?.imagePath}
            width={200}
            height={150}
          />
        </div>
        <div className="grid grid-cols-1 gap-y-2 mt-4">
          <div className="flex items-center">
            <h3 className="text-gray-400 text-sm">Tên sản phẩm : </h3>
            <h3 className="text-gray-500 text-sm ml-1  cursor-pointer">
              {postedProduct?.product?.name}
            </h3>
          </div>
          <div className="flex items-center">
            <h3 className="text-gray-400 text-sm">Giá chiến thắng : </h3>
            <h3 className="text-gray-500 text-sm ml-1  cursor-pointer">
              {postedProduct?.priceWin?.toString()?.prettyMoney()}$
            </h3>
          </div>
          <div className="flex items-center">
            <h3 className="text-gray-400 text-sm">Số lượt đấu giá: </h3>
            <h3 className="text-blue-500 ml-1 text-sm cursor-pointer">
              {postedProduct?.product?.numberOfBids}
            </h3>
          </div>
          <div className="flex items-center">
            <h3 className="text-gray-400 text-sm">Bước giá : </h3>
            <h3 className="text-blue-500 ml-1 text-sm cursor-pointer">
              {postedProduct?.stepBid?.toString()?.prettyMoney()}$
            </h3>
          </div>

          <div className="flex items-center">
            <h3 className="text-gray-400 text-sm">Ngày bắt đầu: </h3>
            <h3 className="text-blue-500 ml-1 text-sm cursor-pointer">
              {postedProduct?.product?.bidCreatedDate?.toString()?.prettyDate()}
            </h3>
          </div>

          <div className="flex items-center">
            <h3 className="text-gray-400 text-sm">Ngày kết thúc: </h3>
            <h3 className="text-blue-500 ml-1 text-sm cursor-pointer">
              {postedProduct?.product?.bidClosingDate?.toString()?.prettyDate()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayPostSaleFeeRightSide
