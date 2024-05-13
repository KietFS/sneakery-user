import FooterSection from '@/components/molecules/FooterSection'
import HeaderV2 from '@/components/organisms/HeaderV2'
import React, { useEffect, useState } from 'react'
import PayPostSaleFeeRightSide from './RightSide'
import PayPostSaleFeeLeftSide from './LeftSide'
import { IRootState } from '@/redux'
import { useAppSelector } from '@/hooks/useRedux'
import Head from 'next/head'

interface IPayPostSaleFeeProps {}

const PayPostSaleFee: React.FC<IPayPostSaleFeeProps> = props => {
  const [isPaySuccess, setIsPaySuccess] = useState<boolean>(false)
  const { wonProductSelected } = useAppSelector(
    (state: IRootState) => state.payment,
  )
  //Check if the paid is complete
  useEffect(() => {
    const handleStorageChange = async (event: any) => {
      if (event.key === 'isPaidPreSaleFee') {
        const listedPaymentPayload = JSON.parse(event.newValue as string)
        setIsPaySuccess(listedPaymentPayload)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      localStorage.removeItem('isPaidPreSaleFee')
    }
  }, [])

  return (
    <>
      <HeaderV2 />
      <div className="bg-white flex justify-between gap-x-5 py-8 px-16">
        <PayPostSaleFeeLeftSide
          wonProduct={wonProductSelected}
          isPaySuccess={isPaySuccess}
          setIsPaySuccess={payload => setIsPaySuccess(payload)}
        />
        <PayPostSaleFeeRightSide wonProduct={wonProductSelected} />
      </div>

      <FooterSection />
    </>
  )
}

export default PayPostSaleFee
