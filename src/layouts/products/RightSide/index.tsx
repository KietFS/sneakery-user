import React, { useEffect, useState } from 'react'

//styles
import ProductBidHistoryDialog from '@/components/templates/ProductBidHistoryDialog'
import PaypalLogo from '@/assets/images/PayPalLogo.png'
import ZaloPayLogo from '@/assets/images/ZaloPayLogo.png'
import MomoLogo from '@/assets/images/MomoLogo.png'
import Image from 'next/image'
import VisaLogo from '@/assets/images/VisaLogo.png'
import MasterCardLogo from '@/assets/images/MasterCardLogo.png'

//hooks

import BidHistorySection from './BidHistorySection'
import CountDownTimer from '@/components/atoms/CountDownTimer'
import { IProductDetail } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

interface IRightSideProps {
  product: IProductDetail
  bidHistory: IProductBidHistoryItem[]
  onPlaceBid: () => void
  onClickSeller: () => void
}

export interface IProductBidHistoryItem {
  bidAmount: number
  bidHistoryId: number
  status: 'SUCCESS' | 'REMOVE'
  createdAt: string
  userName: string
}

const RightSide: React.FC<IRightSideProps> = props => {
  const { product, onPlaceBid, bidHistory, onClickSeller } = props
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const isDisable =
    Date.now() > new Date(product.bidClosingDate)?.getTime() || !isAuthenticated

  return (
    <div className="px-8 py-4">
      <h1 className="text-gray-600 font-bold text-4xl">{product?.name}</h1>

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
      {!!product?.holder && (
        <div className="mt-2 flex items-center">
          <h3 className="text-gray-400 text-lg">Giá hiện tại : </h3>
          <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
            {(product?.currentPrice as number).toString().prettyMoney()}$
          </h3>
        </div>
      )}

      {!!product?.holder ? (
        <div className="mt-2 flex items-center">
          <h3 className="text-gray-400 text-lg">Người đang giữ giá: </h3>
          <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
            {product?.holder as string}
          </h3>
        </div>
      ) : (
        <h3 className="text-gray-400 text-lg mt-2">
          Chưa có ai đấu giá cho sản phẩm này
        </h3>
      )}

      <div className="mt-2 flex items-center">
        <CountDownTimer bidClosingDate={product.bidClosingDate} />
      </div>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Người đăng : </h3>
        <button
          className="text-blue-500 font-bold ml-1 text-lg cursor-pointer hover:opacity-80"
          onClick={() => onClickSeller()}
        >
          {product?.seller?.username}
        </button>
      </div>
      {/* <button
        className="flex items-center mt-2"
        onClick={() => router.push('/guides')}
      >
        <p className="text-blue-500 font-semibold underline text-sm">
          Hướng dẫn đấu giá
        </p>
        <InformationCircleIcon className="w-4 h-4 text-blue-500 ml-1" />
      </button> */}
      <div className="flex items-center">
        <button
          disabled={isDisable}
          onClick={() => {
            if (isDisable) {
            }
            onPlaceBid()
          }}
          className={`items-center rounded-lg px-4 py-2 text-center mt-4 w-fit flex hover:opacity-50 bg-blue-500 text-white font-semibold text-lg ${
            isDisable ? 'opacity-20' : ''
          }`}
        >
          Đấu giá ngay
        </button>
        {/* <button className="items-center rounded-lg px-4 py-2 text-center mt-4 w-fit flex hover:opacity-50 bg-white text-blue-500 border border-blue-500 font-semibold text-lg ml-2">
          Yêu thích
        </button> */}
      </div>
      <div className="mt-5">
        <div className="mt-2">
          <h3 className="text-gray-400 text-lg">Chấp nhận thanh toán : </h3>
          <div className="flex w-full items-center space-x-3">
            <div className="w-[140px] h-[70px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px]">
              <Image
                src={PaypalLogo}
                className="w-[100px] h-[50px] rounded-lg my-auto"
              />
            </div>
            <div className="w-[140px] h-[70px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px] ">
              <Image
                src={VisaLogo}
                className="rounded-lg my-auto"
                width={70}
                height={30}
              />
            </div>
            <div className="w-[140px] h-[70px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px] ">
              <Image
                src={MasterCardLogo}
                className="rounded-lg my-auto"
                width={80}
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
