import React, { useEffect, useState } from 'react'

//hooks
import { useAppSelector } from '@/hooks/useRedux'
import { useRouter } from 'next/router'

//styles
import Spinner from '@/components/atoms/Spinner'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

//utils
import axios from 'axios'
import { IRootState } from '@/redux'
import { Config } from '@/config/api'
import { useAuth } from '@/hooks/useAuth'
import { configResponse } from '@/utils/request'
import { PAYMENT_SUCCESS_KEY } from '@/constants'
import { IPaymentType, TypeId } from '@/types'

const Success: React.FC = props => {
  const router = useRouter()
  const { paymentId: hehe, methodSelected } = useAppSelector(
    (state: IRootState) => state.payment,
  )
  const [productId, setProductId] = useState<TypeId | null>(null)
  const { paymentId, token, PayerID, sessionId } = router.query
  const [loading, setLoading] = useState<boolean>(true)
  const { accessToken } = useAuth()
  const [paymentType, setPaymentType] = useState<IPaymentType | null>(null)

  const getInitialInfo = async () => {
    try {
      const productId = await localStorage.getItem('productId')
      const paymentType = await localStorage.getItem('paymentType')
      if (productId) {
        setProductId(productId)
      }
      console.log('paymentType', paymentType)
      if (paymentType) {
        setPaymentType(paymentType as IPaymentType)
      }
    } catch (error) {
      console.log('error', error)
      setProductId(null)
      setPaymentType(null)
    }
  }

  const handleUpdatePaypalStatus = async (paymentPayload: any) => {
    setLoading(true)
    try {
      await localStorage.setItem(
        PAYMENT_SUCCESS_KEY[paymentType || 'PRE_SALE_FEE'],
        JSON.stringify(null),
      )
      setLoading(true)
      const response = await axios.get(
        `${Config.API_URL}/transactions/paypal/success?paymentId=${paymentPayload.paymentId}&payerId=${paymentPayload?.payerId}&paymentType=${paymentPayload?.paymentType}&productId=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { data, isSuccess, error } = configResponse(response)
      if (response?.data?.success == true) {
        await localStorage.setItem(
          PAYMENT_SUCCESS_KEY[paymentType || 'PRE_SALE_FEE'],
          JSON.stringify(isSuccess),
        )
        setLoading(false)
        window?.close()
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
      await localStorage.setItem(
        PAYMENT_SUCCESS_KEY[paymentType || 'PRE_SALE_FEE'],
        JSON.stringify(null),
      )
      const response = await axios.get(
        `${Config.API_URL}/transactions/stripe/success?sessionId=${payload?.sessionId}&paymentType=${payload?.paymentType}&productId=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { data, isSuccess, error } = configResponse(response)
      if (isSuccess) {
        await localStorage.setItem(
          PAYMENT_SUCCESS_KEY[paymentType || 'PRE_SALE_FEE'],
          JSON.stringify(isSuccess),
        )
        setLoading(false)
        window?.close()
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!paymentType && !!productId) {
      if (methodSelected == 'paypal') {
        if (paymentId && PayerID) {
          const payload = {
            paymentId: paymentId,
            payerId: PayerID,
            paymentType: paymentType,
          }
          handleUpdatePaypalStatus(payload)
        }
      }
    }
  }, [paymentId, PayerID, productId, paymentType])

  useEffect(() => {
    if (!!paymentType && !!productId) {
      if (methodSelected == 'stripe') {
        if (sessionId) {
          const payload = {
            paymentType: paymentType,
            sessionId: sessionId,
          }
          handleUpdateStripeStatus(payload)
        }
      }
    }
  }, [sessionId, paymentType, productId, paymentType])

  useEffect(() => {
    getInitialInfo()
  }, [])

  return (
    <div className="bg-gray-50 w-screen h-screen flex items-center justify-center">
      <div className="flex mx-auto my-auto flex-col items-center justify-center bg-white shadow-xl py-10 px-20 rounded-xl">
        <p className="text-2xl text-gray-600 font-semibold mb-2">
          {loading
            ? 'Chúng tôi đang hoàn thành giao dịch của bạn'
            : 'Giao dịch của bạn đã được hoàn tất'}
        </p>
        {loading && (
          <p className="text-gray-500 text-md font-normal mb-10">
            Vui lòng đợi trong giây lát
          </p>
        )}

        <div>
          {loading ? (
            <Spinner size={60} />
          ) : (
            <CheckBadgeIcon className="w-20 h-20 text-green-500 font-bold" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Success
