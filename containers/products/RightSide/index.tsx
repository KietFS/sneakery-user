import React, { useEffect, useState } from 'react'

//styles
import ProductBidHistoryDialog from '@/components/ProductBidHistoryDialog'
import PaypalLogo from '@/assets/images/PayPalLogo.png'
import ZaloPayLogo from '@/assets/images/ZaloPayLogo.png'
import MomoLogo from '@/assets/images/MomoLogo.png'
import Image from 'next/image'

//hooks
import { useRouter } from 'next/router'
import { useAppSelector } from '@/hooks/useRedux'

//utils
import { IRootState } from '@/redux'

interface IRightSideProps {
  product: IProduct
  bidHistory: IProductBidHistoryItem[]
  onPlaceBid: () => void
}

export interface IProductBidHistoryItem {
  bidAmount: number
  createdAt: string
  userName: string
}

const RightSide: React.FC<IRightSideProps> = props => {
  const { product, onPlaceBid } = props

  let newBidClosingDate = new Date(product?.bidClosingDate)

  //state
  const [textDay, setTextDay] = useState<string>('')
  const [textHour, setTextHour] = useState<string>('')
  const [textMinute, setTextMinute] = useState<string>('')
  const [textSecond, setTextSecond] = useState<string>('')
  const [openHistoryDialog, setOpenHistoryDialog] = useState<boolean>(false)

  //hooks
  const router = useRouter()

  //functions
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

  // useEffect(() => {
  //   if (Date.now() > newBidClosingDate.getTime()) {
  //     router.push('/')
  //   }
  // }, [textSecond])

  // setInterval(countdown, 1)

  return (
    <div className="px-8 py-4">
      <h1 className="text-gray-600 font-bold text-4xl">{product?.name}</h1>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Thương hiệu : </h3>
        <h3 className="text-gray-600 ml-1 text-lg cursor-pointer">Nike</h3>
      </div>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Giá khởi điểm : </h3>
        <h3 className="text-gray-500 text-lg ml-1  cursor-pointer">
          {product?.startPrice.toString().prettyMoney()}$
        </h3>
      </div>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Bước giá : </h3>
        <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
          {(product?.bidIncrement).toString().prettyMoney()}$
        </h3>
      </div>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Giá hiện tại : </h3>
        <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
          {(product?.currentPrice).toString().prettyMoney()}$
        </h3>
      </div>
      <div className="mt-2 flex items-center">
        <h3 className="text-gray-400 text-lg">Ngày hết hạn : </h3>
        <h3 className="text-red-500 ml-1 text-lg  cursor-pointer">
          {`${textDay} ngày : ${textHour} giờ : ${textMinute} phút : ${textSecond} giây`}
        </h3>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onPlaceBid()}
          className="items-center rounded-lg px-4 py-2 text-center mt-4 w-fit flex hover:opacity-50 bg-blue-500 text-white font-semibold text-lg"
        >
          Đấu giá ngay
        </button>
        <button className="items-center rounded-lg px-4 py-2 text-center mt-4 w-fit flex hover:opacity-50 bg-white text-blue-500 border border-blue-500 font-semibold text-lg ml-2">
          Yêu thích
        </button>
      </div>
      <div className="mt-5">
        <div className="mt-2">
          <h3 className="text-gray-400 text-lg">Chấp nhận thanh toán : </h3>
          <div className="flex w-full items-center space-x-3">
            <div className="w-[120px] h-[70px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px] ">
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
        <div className="mt-4 max-w-[90%]">
          <h3 className="text-gray-400 text-lg leading-0">
            Các lượt bid gần đây :{' '}
          </h3>
          <div className="flex flex-col gap-y-2 mt-2 w-fit">
            {props.bidHistory.map((item, index) => {
              if (index <= 2)
                return (
                  <div
                    className="flex justify-between items-center"
                    key={index.toString()}
                  >
                    <p className="text-gray-500 text-sm cursor-pointer italic mr-1">
                      Người dùng {item.userName} -
                    </p>
                    <p className="text-blue-500 font-bold text-sm cursor-pointer mr-1 ">
                      {item.bidAmount.toString().prettyMoney()}$ -
                    </p>
                    <p className="text-gray-600 text-sm cursor-pointer">
                      {item.createdAt.toString().replace('T', ' ')}
                    </p>
                  </div>
                )
            })}
          </div>
          <p
            className="text-sm font-semibold px-4 py-1 bg-blue-200 text-blue-900 w-fit rounded-full mt-4 cursor-pointer hover:opacity-80"
            onClick={() => setOpenHistoryDialog(true)}
          >
            Xem thêm
          </p>
        </div>
      </div>
      <ProductBidHistoryDialog
        open={openHistoryDialog}
        onClose={() => {
          setOpenHistoryDialog(false)
        }}
        bidHistory={props.bidHistory}
      />
    </div>
  )
}

export default RightSide
