import React, { useEffect, useState } from 'react'

//styles
import ProductBidHistoryDialog from '@/components/ProductBidHistoryDialog'
import PaypalLogo from '@/assets/images/PayPalLogo.png'
import ZaloPayLogo from '@/assets/images/ZaloPayLogo.png'
import MomoLogo from '@/assets/images/MomoLogo.png'
import Image from 'next/image'

//hooks
import { useRouter } from 'next/router'
import BidHistorySection from './BidHistorySection'
import axios from 'axios'
import { Config } from '@/config/api'

interface IRightSideProps {
  product: IProductDetail
  bidHistory: IProductBidHistoryItem[]
  onPlaceBid: () => void
}

export interface IProductBidHistoryItem {
  bidAmount: number
  bidHistoryId: number
  status: 'SUCCESS' | 'REMOVE'
  createdAt: string
  userName: string
}

const RightSide: React.FC<IRightSideProps> = props => {
  const { product, onPlaceBid, bidHistory } = props

  let newBidClosingDate = new Date(product?.bidClosingDate)

  //state
  const [textDay, setTextDay] = useState<string>('')
  const [textHour, setTextHour] = useState<string>('')
  const [textMinute, setTextMinute] = useState<string>('')
  const [textSecond, setTextSecond] = useState<string>('')

  //functions
  useEffect(() => {
    const countdown = () => {
      const countDate = newBidClosingDate.getTime()
      const now = new Date().getTime()
      const gap = countDate - now
      const second = 1000
      const minute = second * 60
      const hour = minute * 60
      const day = hour * 24
      const textDay = Math.floor(gap / day)
      setTextDay(textDay.toString())
      const textHour = Math.floor((gap % day) / hour)
      setTextHour(textHour.toString())
      const textMinute = Math.floor((gap % hour) / minute)
      setTextMinute(textMinute.toString())
      const textSecond = Math.floor((gap % minute) / second)
      setTextSecond(textSecond.toString())
    }
    const intervalId = setInterval(countdown, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="px-8 py-4">
      <h1 className="text-gray-600 font-bold text-4xl">{product?.name}</h1>
      {/* <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Thương hiệu : </h3>
        <h3 className="text-gray-600 ml-1 text-lg cursor-pointer">Nike</h3>
      </div> */}
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Giá khởi điểm : </h3>
        <h3 className="text-gray-500 text-lg ml-1  cursor-pointer">
          {(product?.startPrice as number).toString().prettyMoney()}$
        </h3>
      </div>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Bước giá : </h3>
        <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
          {(product?.bidIncrement as number).toString().prettyMoney()}$
        </h3>
      </div>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Giá hiện tại : </h3>
        <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
          {(product?.currentPrice as number).toString().prettyMoney()}$
        </h3>
      </div>
      <div className="mt-2 flex items-center">
        {true ? (
          <h3 className="text-red-500 ml-1 text-lg  cursor-pointer">
            Sản phẩm đã hết phiên đấu giá
          </h3>
        ) : (
          <>
            <h3 className="text-gray-400 text-lg">Ngày hết hạn : </h3>
            <h3 className="text-red-500 ml-1 text-lg  cursor-pointer">
              {`${textDay} ngày : ${textHour} giờ : ${textMinute} phút : ${textSecond} giây`}
            </h3>
          </>
        )}
      </div>
      <div className="flex items-center">
        {true ? (
          <>
            <button className="items-center rounded-lg px-4 py-2 opacity-50 text-center mt-4 w-fit flex hover:opacity-50 bg-blue-500 text-white font-semibold text-lg">
              Đấu giá ngay
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              onPlaceBid()
            }}
            className="items-center rounded-lg px-4 py-2 text-center mt-4 w-fit flex hover:opacity-50 bg-blue-500 text-white font-semibold text-lg"
          >
            Đấu giá ngay
          </button>
        )}

        <button className="items-center rounded-lg px-4 py-2 text-center mt-4 w-fit flex hover:opacity-50 bg-white text-blue-500 border border-blue-500 font-semibold text-lg ml-2">
          Yêu thích
        </button>
      </div>
      <div className="mt-5">
        <div className="mt-2">
          <h3 className="text-gray-400 text-lg">Chấp nhận thanh toán : </h3>
          <div className="flex w-full items-center space-x-3">
            <div className="w-[120px] h-[70px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px]">
              <Image
                src={PaypalLogo}
                className="w-[100px] h-[50px] rounded-lg my-auto"
              />
            </div>
            <div className="w-[120px] h-[70px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px] ">
              <Image
                src={ZaloPayLogo}
                className="rounded-lg my-auto"
                width={90}
                height={30}
              />
            </div>
            <div className="w-[120px] h-[70px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px] ">
              <Image
                src={MomoLogo}
                className="rounded-lg my-auto"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
        <BidHistorySection product={product} bidHistory={bidHistory} />
      </div>
    </div>
  )
}

export default RightSide
