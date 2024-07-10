import React from 'react'
import Image from 'next/image'

//hooks
import { useRouter } from 'next/router'
import { IProductHomePageResponse } from '@/types'

interface IHorizontalProductCardProps {
  product: IProductHomePageResponse
}

const HorizontalProductCard: React.FC<IHorizontalProductCardProps> = props => {
  const { product } = props
  const router = useRouter()

  console.log('product')

  return (
    <div
      className=" border-b border-gray-200 px-2 py-2 flex flex-col gap-y-5 w-full cursor-pointer hover:opacity-80"
      onClick={() => router.replace(`/products/${product.id}`)}
    >
      <div className="flex gap-x-3 items-center">
        <img
          src={product.imagePath}
          width={80}
          height={60}
          className="max-w-[80px] max-h-[60px]"
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-gray-600 font-semibold">{product.name}</p>

          <p className="text-xs text-gray-600">
            {product.startPrice?.toString().prettyMoney()}
          </p>
          <div className="flex items-center gap-x-1">
            <p className="text-xs text-gray-600">Giá hiện tại</p>
            <p className="text-sm text-green-500 font-semibold">
              {product.currentPrice?.toString().prettyMoney()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizontalProductCard
