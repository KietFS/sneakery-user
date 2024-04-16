import Head from 'next/head'
import React from 'react'

//styles
import CartList from '@/layouts/cart/CartList'
import CartPayment from '@/layouts/cart/CartPayment'
import FooterSection from '@/components/molecules/FooterSection'
import HeaderV2 from '@/components/organisms/HeaderV2'

//utils
import { withAuthorization } from '@/common/config/HOC/withAuth'

interface ICartPageProps {}

const Cart: React.FC<ICartPageProps> = props => {
  return (
    <div className="bg-white">
      <Head>
        <title>Giỏ hàng - Sneakery</title>
        <link rel="icon" />
      </Head>
      <div className="pb-16 bg-white">
        <HeaderV2 />
        <div className="flex flex-col laptop:flex-row gap-y-10  justify-between mt-10 mx-auto laptop:px-0 px-8 laptop:w-5/6 gap-x-10 ">
          <CartList />
          <CartPayment />
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

export default withAuthorization(Cart)
