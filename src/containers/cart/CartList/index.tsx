import React, { useEffect, useState } from 'react'

//styles
import Image from 'next/image'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useDispatch } from 'react-redux'

//utils and types
import axios from 'axios'
import { IRootState } from '@/redux'
import { setGlobalCartItems } from '@/redux/slices/cart'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'

interface ICartList {}

export interface ICartItem {
  id: number
  product: {
    id: number
    name: string
    startPrice: 126
    imagePath: string
    userName: string
    bidClosingDate: string
  }
  priceWin: number
  status: 'PENDING' | 'APPROVED'
}

const CartList: React.FC<ICartList> = props => {
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [items, setItems] = useState<ICartItem[]>([])
  const dispatch = useDispatch()

  const getItems = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/orders/users/${user.id}?q=APPROVE`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )
      const { isSuccess, data, error } = configResponse(response)

      if (isSuccess) {
        setItems(data?.data)
        dispatch(setGlobalCartItems(data?.data))
      }
    } catch (error) {
      console.log('CART ERROR', error)
    }
  }

  useEffect(() => {
    user && getItems()
  }, [user])

  return (
    <div className="h-fit laptop:min-h-[600px] laptop:w-4/5 w-full bg-white rounded-lg border border-gray-200 shadow-lg px-8 py-4">
      <h3 className="text-xl laptop:text-2xl text-blue-500 font-bold">
        Giỏ hàng của bạn ({items.length})
      </h3>
      <div className="flex flex-col gap-y-5 mt-10">
        <div className="grid grid-cols-3 laptop:grid-cols-4 gap-x-10 py-2 px-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600 font-semibold text-xs laptop:text-lg ">
            Tên
          </p>

          <p className="text-gray-600 font-semibold text-lg flex laptop:flex">
            Hình ảnh
          </p>
          <p className="text-gray-600 font-semibold text-lg hidden laptop:flex">
            Mua từ
          </p>
          <p className="text-gray-600 font-semibold text-xs laptop:text-lg">
            Giá
          </p>
        </div>
        {items.map((item, index) => (
          <div
            className="grid grid-cols-3 laptop:grid-cols-4 gap-x-10 py-2 px-4 border border-gray-200 rounded-lg items-center"
            key={index.toString()}
          >
            <h3 className="text-gray-600 font-regular text-xs laptop:text-sm">
              {item.product.name}
            </h3>

            <div className="flex laptop:flex">
              <img
                src={item.product.imagePath}
                width={80}
                height={60}
                className="mx-auto"
              />
            </div>
            <div className="hidden laptop:flex cursor-pointer">
              <h3 className="text-blue-500 font-semibold text-sm">
                {item.product.userName}
              </h3>
              <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
            </div>
            <h3 className="text-gray-600 font-regular text-xs laptop:text-lg">
              {item.priceWin.toString().prettyMoney()}$
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartList
