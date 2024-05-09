import React, { useState } from 'react'
import Image from 'next/image'
import PaySuccess from '@/assets/images/PaySuccess.png'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import { Config } from '@/config/api'
import { configResponse } from '@/utils/request'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import PaypalLogo from '@/assets/images/PayPalLogo.png'
import StripeLogo from '@/assets/images/StripeLogo.png'
import { IPaymentMethod } from '@/types/user'
import { Radio } from '@mui/material'
import Button from '@/components/atoms/Button'
import { useDispatch } from 'react-redux'
import { setMethodSelected } from '@/redux/slices/payment'

interface IStepFourLeftSideProps {
  isPaySuccess: boolean
  setIsPaySuccess: (p: boolean) => void
  handleGoBack: () => void
}

const StepFourLeftSide: React.FC<IStepFourLeftSideProps> = props => {
  const { isPaySuccess, setIsPaySuccess } = props
  const [isPayingPreFee, setIsPayingPreFee] = useState<boolean>(false)
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const { methodSelected } = useAppSelector(
    (state: IRootState) => state.payment,
  )
  const { accessToken } = useAuth()
  const dispatch = useDispatch()

  const handlePressPay = async () => {
    try {
      const payload = {
        amount: 1,
        purpose: 'Phí đăng sản phẩm',
      }
      setIsPayingPreFee(true)
      const response = await axios.post(
        `${Config.API_URL}/transactions/${methodSelected}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { data, isSuccess, error } = configResponse(response)
      if (response?.data?.success) {
        window.open(data.message)
      }
    } catch (error) {
      setIsPayingPreFee(false)
    }
  }

  const handleSelectPayPal = () => dispatch(setMethodSelected('paypal'))

  const handleSelectStripe = () => dispatch(setMethodSelected('stripe'))

  console.log('is pay success', isPaySuccess)

  return (
    <div className="border-gray-200 border p-6  h-full min-h-[500px] w-3/4 rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-600 font-bold text-2xl mb-2">
          Thanh toán phí đăng sản phẩm
        </h1>
        {/* <Tooltip title="Thay đổi danh mục">
            <IconButton onClick={() => onPressOpenCategory()}>
              <TagIcon className="w-6 h-6 text-gray-500 font-semibold" />
            </IconButton>
          </Tooltip> */}
      </div>
      <p className="text-sm italic text-gray-500">
        *Bạn cần thanh toán trước phí để có thể đăng sản phẩm. Tham khảo mục
        Thông tin chi phí <br></br>
        Khi nhấn vào nút thanh toán, bạn đã đồng ý với chính sách và điều khoản
        sử dụng của chúng tôi
      </p>

      {/* Main content go here */}

      {isPaySuccess ? (
        <>
          <div className="w-full flex justify-center">
            <Image
              src={PaySuccess}
              className="w-[300px] h-[300px]"
              width={300}
              height={300}
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <CheckBadgeIcon className="text-green-500 font-bold w-5 h-5" />
            <p className="font-semibold text-green-500 ml-2">
              Bạn đã thanh toán thành công, bấm nút đăng để đăng sản phẩm
            </p>
          </div>
        </>
      ) : (
        <div>
          <div className="mt-4">
            <p className="text-xl italic mb-2 text-gray-600 font-bold">
              Phương thức thanh toán
            </p>
            <div className="w-full bg-gray-50 flex items-center px-4 border-t h-[80px]">
              <Radio
                checked={methodSelected === 'paypal'}
                onClick={handleSelectPayPal}
              />
              <div className="flex items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Thanh toán qua Paypal
                </p>
                <Image
                  src={PaypalLogo}
                  width={120}
                  height={80}
                  className="rounded-lg my-auto"
                />
              </div>
            </div>
            <div className="w-full bg-gray-50 flex items-center px-4 border-t h-[80px]">
              <Radio
                checked={methodSelected === 'stripe'}
                onClick={handleSelectStripe}
              />
              <div className="flex items-center">
                <p className="text-gray-500 font-semibold text-sm">
                  Thanh toán qua
                </p>
                <Image
                  src={StripeLogo}
                  width={140}
                  height={40}
                  className="rounded-lg my-auto"
                />
              </div>
            </div>
            <div className="w-full bg-gray-50 flex items-center px-8 py-2 border-t h-[60px]">
              <p className="text-sm text-gray-500 italic">
                {methodSelected == 'paypal'
                  ? 'Để hoàn thành giao dịch của bạn, chúng tôi sẽ chuyển bạn qua máy chủ an toàn của PayPal'
                  : 'Để hoàn thành giao dịch của bạn, chúng tôi sẽ chuyển bạn qua máy chủ an toàn của Stripe để thực hiện thanh toán qua các loại thẻ Visa, Mastercard,...'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <p className="text-lg italic  text-gray-600 font-bold">
              Phí đăng bạn cần trả:{' '}
            </p>
            <p className="text-lg italic font-semibold text-blue-500 ml-1">
              {(1)?.toFixed(2)?.toString()?.prettyMoney()}$
            </p>
          </div>

          <div className="flex flex-row-reverse">
            <div className="flex items-center">
              <Button
                title="Quay lại"
                variant="secondary"
                onClick={props.handleGoBack}
                className="mr-2"
              />
              <Button
                disable={isPaySuccess}
                title="Thanh toán"
                isLoading={false}
                onClick={handlePressPay}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepFourLeftSide
