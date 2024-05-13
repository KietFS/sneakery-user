import React, { useEffect, useState } from 'react'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from 'next/router'

//styles
import Spinner from '@/components/atoms/Spinner'

//utils
import axios from 'axios'
import { IRootState } from '@/redux'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import { configResponse } from '@/utils/request'
import { PAY_PREE_SALE_FEE_SUCCESS } from '@/constants'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

const Success: React.FC = props => {
  const router = useRouter()
  const { paymentId: hehe, methodSelected } = useAppSelector(
    (state: IRootState) => state.payment,
  )
  const { paymentId, token, PayerID, paymentType, sessionId } = router.query
  const [loading, setLoading] = useState<boolean>(true)
  const { accessToken } = useAuth()

  const handleUpdatePaypalStatus = async (paymentPayload: any) => {
    setLoading(true)
    try {
      await localStorage.setItem('isPaidPreSaleFee', JSON.stringify(null))
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
      if (response?.data?.success == true) {
        //emit an event when pay pre sale fee success
        let event
        event = new CustomEvent(PAY_PREE_SALE_FEE_SUCCESS)
        window.dispatchEvent(event)
        await localStorage.setItem(
          'isPaidPreSaleFee',
          JSON.stringify(isSuccess),
        )
        setLoading(false)
        // window?.close()
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStripeStatus = async (payload: any) => {
    try {
      setLoading(true)
      await localStorage.setItem('isPaidPreSaleFee', JSON.stringify(null))
      const response = await axios.get(
        `${Config.API_URL}/transactions/stripe/success?sessionId=${payload?.sessionId}&paymentType=${payload?.paymentType}`,
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
        setLoading(false)
        // window?.close()
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (methodSelected == 'paypal') {
      if (paymentId && PayerID) {
        const payload = {
          paymentId: paymentId,
          payerId: PayerID,
          paymentType: 'PRE_SALE_FEE',
        }
        handleUpdatePaypalStatus(payload)
      }
    }
  }, [paymentId, PayerID])

  useEffect(() => {
    if (methodSelected == 'stripe') {
      if (sessionId) {
        const payload = {
          paymentType: 'PRE_SALE_FEE',
          sessionId: sessionId,
        }
        handleUpdateStripeStatus(payload)
      }
    }
  }, [sessionId, paymentType])

  useEffect(() => {
    if (loading == false) {
      setTimeout(() => window.close(), 2500)
    }
  }, [loading])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="text-2xl text-gray-600 font-semibold mb-10">
        {loading
          ? 'Chúng tôi đang hoàn thành giao dịch của bạn'
          : 'Giao dịch của bạn đã được hoàn tất'}
      </p>
      <div>
        {loading ? (
          <Spinner size={60} />
        ) : (
          <CheckBadgeIcon className="w-20 h-20 text-green-500 font-bold" />
        )}
      </div>
    </div>
  )
}

export default Success
