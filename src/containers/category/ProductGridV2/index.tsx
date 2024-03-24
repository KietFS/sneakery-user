import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface IProductGridV2Props {
  listProducts: IProductHomePageResponse[]
  isLoadingProducts?: boolean
}

const ProductGridV2: React.FC<IProductGridV2Props> = props => {
  const { listProducts, isLoadingProducts = false } = props
  const router = useRouter()
  return (
    <>
      {isLoadingProducts ? null : (
        <div className="flex flex-col space-y-10 items-center justify-center h-fit">
          <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 w-full gap-x-5 gap-y-10">
            {listProducts?.length > 0 &&
              listProducts?.map((item, index) => {
                return (
                  <div
                    className="max-h-[300px] h-[300px] py-10 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
                    key={index.toString()}
                    onClick={() => router.push(`/products/${item.id}`)}
                  >
                    <img
                      src={item.imagePath}
                      width={200}
                      height={150}
                      className="z-10"
                    />
                    <div className="justify-center px-4 space-y-1 mx-auto">
                      <h1 className="text-sm text-gray-600 font-bold text-center my-auto ">
                        {item.name.truncate(25)}
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
                          {item.startPrice.toString().prettyMoney()}$
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductGridV2
