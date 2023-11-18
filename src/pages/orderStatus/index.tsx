import React from 'react'

//styles
import ShippingOrder from '@/assets/images/ShippingOrder.png'
import Image from 'next/image'
import Button from '@/designs/Button'
import HeaderV2 from '@/components/HeaderV2'
import FooterSection from '@/components/FooterSection'
import Head from 'next/head'

//hooks
import { useRouter } from 'next/router'

const OrderStatus: React.FC = props => {
  const router = useRouter()

  return (
    <>
      <div className="bg-white">
        <Head>
          <title>Sneakery - Trạng thái đơn hàng</title>
        </Head>

        <div className="pb-16 bg-white">
          <HeaderV2 />
          <div className="mt-16 w-5/6 mx-auto border-gray-200 border rounded-lg h-[600px] bg-white py-4">
            <p
              className="text-[40px] font-bold text-blue-500 w-full cursor-pointer text-center"
              onClick={() => router.push('/')}
            >
              Sneakery
            </p>
            <div className="flex w-full justify-center items-center">
              <Image src={ShippingOrder} width={350} height={350} />
            </div>
            <h1 className="text-gray-500 font-bold text-2xl text-center mt-2">
              Đơn hàng đang được giao đến cho bạn
            </h1>

            <div
              className="flex justify-center items-center gap-x-2"
              onClick={() => router.push('/')}
            >
              <Button
                onClick={() => router.push('/')}
                title="Quay về trang chủ"
                className={`mt-8`}
              />
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    </>
  )
}

export default OrderStatus
