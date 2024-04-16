import React, { useEffect, useState } from 'react'

//styles
import Image from 'next/image'

//utils
import axios from 'axios'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'

interface ISimilarProduct {
  currentProductId: number
  category: string
}

const SimilarProduct: React.FC<ISimilarProduct> = props => {
  const [listProduct, setListProduct] = useState<IProductHomePageResponse[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getSimilarProducts = async () => {
    try {
      setLoading(true)
      const url = `${Config.API_URL}/products?category=${props.category}`
      const response = await axios.get(url)
      const { isSuccess, data, error } = configResponse(response)
      if (isSuccess) {
        setListProduct(data.data)
      } else {
        console.log('Error', error)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSimilarProducts()
  }, [])

  return (
    <div className="h-fit rounded-lg shadow-lg bg-white mt-10 border border-gray-200 w-full px-8 pt-4 pb-8">
      <h2 className="text-xl laptop:text-2xl text-blue-500 font-bold">
        Sản phẩm cùng danh mục
      </h2>
      <div className="mt-10 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-x-5 gap-y-5">
        {listProduct.map((item, index) => {
          if (index <= 7 && Number(item.id) !== props.currentProductId)
            return (
              <div
                className="h-fit py-10 border border-gray-200 flex flex-col items-center rounded-lg hover:opacity-70 cursor-pointer"
                key={index.toString()}
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
                      {item?.userName}
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
          else {
            return null
          }
        })}
      </div>
    </div>
  )
}

export default SimilarProduct
