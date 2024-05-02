import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FireIcon } from '@heroicons/react/20/solid'

interface IProductGridV2Props {
  listProducts: IProductHomePageResponse[]
  isLoadingProducts?: boolean
}

const ProductGridV2: React.FC<IProductGridV2Props> = props => {
  const { listProducts, isLoadingProducts = false } = props
  const router = useRouter()
  return (
    <>
      {isLoadingProducts ? (
        <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 w-full gap-x-5 gap-y-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]?.map(
            (item, index) => (
              <div className="max-h-[300px] h-[300px] py-4 border border-gray-200 bg-gray-300 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer animate-pulse">
                {' '}
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 w-full gap-x-5 gap-y-10">
          {listProducts?.map((item, index) => {
            return (
              <div
                className="max-h-[300px] h-[300px] py-4 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
                key={index.toString()}
                onClick={() => router.push(`/products/${item.id}`)}
              >
                {index <= 3 ? (
                  <div className="w-full flex-initial mb-2 pl-3">
                    <div className="bg-red-500 rounded-lg px-2 py-1 w-fit animate-pulse flex items-center">
                      <FireIcon className="w-5 h-5 font-bold text-white mr-1" />
                      <p className="text-white text-xs font-bold">
                        Sản phẩm đang hot
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg px-2 py-1 w-fit animate-pulse flex items-center h-[30px]"></div>
                )}
                <img
                  src={item.imagePath}
                  width={180}
                  height={150}
                  className="min-h-[150px]"
                />
                <div className="justify-center px-4 space-y-1 mx-auto mt-4">
                  <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                    {item.name.truncate(30)}
                  </h1>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Được bán bởi:{' '}
                    </p>
                    <p className="text-xs font-semibold text-blue-500">
                      {item.userName}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Giá khởi điểm:{' '}
                    </p>
                    <p className="text-xs font-bold text-gray-500">
                      {item.startPrice?.toString().prettyMoney()}$
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ProductGridV2
