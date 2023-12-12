import React, { useState } from 'react'

//styles
import Image from 'next/image'

//hook
import { useRouter } from 'next/router'

interface IProductGridProps {
  listProducts: IProductHomePageResponse[]
}

const ProductGrid: React.FC<IProductGridProps> = props => {
  const { listProducts } = props
  //state
  const [toSee, setToSee] = useState<number>(7)

  //hooks
  const router = useRouter()

  return (
    <div className="flex flex-col space-y-10 items-center justify-center">
      <div className="space-y-2">
        <h2 className="text-gray-500 font-bold text-3xl text-center">
          Những deal đấu giá đang hot tại sàn của chúng tôi
        </h2>
        <p className="text-lg text-gray-500 font-normal text-center">
          Những đôi giày cực hiếm, cực đẹp
        </p>
        <p
          className="text-lg font-semibold text-center underline text-blue-500 hover:opacity-70 cursor-pointer"
          onClick={() => router.push('/category')}
        >
          Xem tất cả
        </p>
      </div>

      <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 w-full gap-x-5 gap-y-10">
        {listProducts?.map((item, index) => {
          if (index <= toSee)
            return (
              <div
                className="h-fit py-10 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer shadow-md min-h-[300px]"
                key={index.toString()}
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <img src={item.imagePath} width={200} height={150} />
                <div className="justify-center px-4 space-y-1 mx-auto">
                  <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                    {item.name.truncate(30)}
                  </h1>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Được bán bởi:{' '}
                    </p>
                    <p className="text-xs font-semibold text-blue-500">
                      {item.username}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Giá khởi điểm:{' '}
                    </p>
                    <p className="text-xs font-bold text-gray-500">
                      {item.startPrice.toString().prettyMoney()}$
                    </p>
                  </div>
                </div>
              </div>
            )
        })}
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:opacity-70 active:opacity-80"
        onClick={() => {
          if (toSee <= 31) {
            setToSee(toSee + 8)
          } else {
            setToSee(7)
          }
        }}
      >
        {toSee <= 31 ? 'Xem thêm' : 'Thu gọn'}
      </button>
    </div>
  )
}

export default ProductGrid
