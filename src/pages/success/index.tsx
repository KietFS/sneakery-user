import React, { useEffect, useState } from 'react'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from 'next/router'

//styles
import Head from 'next/head'
import HeaderV2 from '@/components/organisms/HeaderV2'
import PaymentProcess from '@/assets/images/PaymentProcess.png'
import Image from 'next/image'
import FooterSection from '@/components/molecules/FooterSection'
import Spinner from '@/components/atoms/Spinner'
import Button from '@/components/atoms/Button'

//utils
import axios from 'axios'
import { IRootState } from '@/redux'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import { configResponse } from '@/utils/request'
import { useDispatch } from 'react-redux'

const Success: React.FC = props => {
  const router = useRouter()
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const { paymentId: hehe } = useAppSelector(
    (state: IRootState) => state.payment,
  )
  const { paymentId, token, PayerID, paymentType } = router.query
  const [loading, setLoading] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const dispatch = useDispatch()

  const handleUpdatePaidStatus = async (paymentPayload: any) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${Config.API_URL}/transactions/paypal/success?paymentId=${paymentPayload.paymentId}&payerId=${paymentPayload?.payerId}&paymentType=${paymentPayload?.paymentType}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { data, isSuccess, error } = configResponse(response)
      if (isSuccess) {
        await localStorage.setItem(
          'isPaidPreSaleFee',
          JSON.stringify(isSuccess),
        )
        // window?.close()
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (paymentId && PayerID) {
      const payload = {
        paymentId: paymentId,
        payerId: PayerID,
        paymentType: 'PRE_SALE_FEE',
      }
      handleUpdatePaidStatus(payload)
    }
  }, [paymentId, PayerID])

  return <></>
}

export default Success
