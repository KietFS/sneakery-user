import FooterSection from '@/components/molecules/FooterSection'
import HeaderV2 from '@/components/organisms/HeaderV2'
import React, { useEffect, useState } from 'react'
import PayPostSaleFeeRightSide from './RightSide'
import CheckoutProductLeftSide from './LeftSide'
import { IRootState } from '@/redux'
import { useAppSelector } from '@/hooks/useRedux'
import Head from 'next/head'
import { PAYMENT_SUCCESS_KEY } from '@/constants'
import { withValidToken } from '@/common/config/HOC/withValidToken'

interface IPayPostSaleFeeProps {}

const PayPostSaleFee: React.FC<IPayPostSaleFeeProps> = props => {
  const [isPaySuccess, setIsPaySuccess] = useState<boolean>(false)
  const { postedProductSelected } = useAppSelector(
    (state: IRootState) => state.payment,
  )

  useEffect(() => {
    const handleStorageChange = async (event: any) => {
      if (event.key === PAYMENT_SUCCESS_KEY['AUCTION_FEE']) {
        const listedPaymentPayload = JSON.parse(event.newValue as string)
        setIsPaySuccess(listedPaymentPayload)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      localStorage.removeItem(PAYMENT_SUCCESS_KEY['AUCTION_FEE'])
    }
  }, [])

  return (
    <div className="bg-white">
      <Head>
        <title>Sneakery - Thanh toán phí đấu giá cho sản phẩm</title>
        <link rel="icon" />
      </Head>
      <div className="pb-16 bg-white">
        <HeaderV2 />
      </div>
      <div className="bg-white flex laptop:flex-row flex-col justify-between gap-x-5 gap-y-5 px-20">
        <CheckoutProductLeftSide
          postedProduct={postedProductSelected}
          isPaySuccess={isPaySuccess}
          setIsPaySuccess={payload => setIsPaySuccess(payload)}
        />
        <PayPostSaleFeeRightSide postedProduct={postedProductSelected} />
      </div>

      <FooterSection />
    </div>
  )
}

export default withValidToken(PayPostSaleFee)
