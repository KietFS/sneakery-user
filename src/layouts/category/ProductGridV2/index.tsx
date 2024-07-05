import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FireIcon } from '@heroicons/react/20/solid'
import CountDownTimer from '@/components/atoms/CountDownTimer'
import SmallCountdownTimer from '@/components/atoms/SmallCountdownTimer'
import { IProductHomePageResponse } from '@/types'

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
        <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3  w-full gap-x-5 gap-y-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]?.map(
            (item, index) => (
              <div className="max-h-[300px] h-[300px] py-4 border border-gray-200 bg-gray-300 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer animate-pulse">
                {' '}
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 w-full gap-x-5 gap-y-10">
          {listProducts?.map((item, index) => {
            return (
              <div
                className="max-h-[380px] h-[380px] py-4 border border-gray-200 flex justify-between flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
                key={index.toString()}
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <div className="flex h-[250px] justify-center  items-center ">
                  <img
                    src={item.imagePath}
                    width={200}
                    height={150}
                    className="max-h-[150px]"
                  />
                </div>
                <div className="justify-center px-4 space-y-1 mx-auto mt-4">
                  <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                    {item.name.truncate(25)}
                  </h1>
                  {!!item?.holder ? (
                    <div className="flex items-center justify-center">
                      <p className="text-xs text-gray-500 font-normal text-center mr-1">
                        Người giữ giá:{' '}
                      </p>
                      <p className="text-xs font-semibold text-blue-500">
                        {item?.holder}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="text-xs text-gray-500 font-normal text-center mr-1">
                        Chưa có ai đấu giá sản phẩm này
                      </p>
                      <p className="text-xs font-semibold text-blue-500"></p>
                    </div>
                  )}

                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Số lượt đấu giá:{' '}
                    </p>
                    <p className="text-xs font-bold text-gray-500">
                      {item?.numberOfBids}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-normal text-center mr-1">
                      Giá hiện tại:{' '}
                    </p>
                    <p className="text-xs font-bold text-gray-500">
                      {item?.currentPrice?.toString().prettyMoney()}$
                    </p>
                  </div>
                  <SmallCountdownTimer
                    bidClosingDate={item.bidClosingDate as any}
                  />
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
