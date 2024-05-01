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

interface IStepFourLeftSideProps {
  isPaySuccess: boolean
  setIsPaySuccess: (p: boolean) => void
}

const StepFourLeftSide: React.FC<IStepFourLeftSideProps> = props => {
  const [isPaySuccess, setIsPaySuccess] = useState<boolean>(false)
  const [isPayingPreFee, setIsPayingPreFee] = useState<boolean>(false)
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const { accessToken } = useAuth()

  const handlePressPaywithPaypal = async () => {
    try {
      const payload = {
        amount: 1,
        userId: user?.id,
      }
      setIsPayingPreFee(true)
      const response = await axios.post(
        `${Config.API_URL}/transactions/paypal`,
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
        Thông tin chi phí
      </p>

      {/* Main content go here */}
      <div>
        <div className="mt-4 flex items-center">
          <p className="text-md font-semibold text-gray-600">
            Phí đăng sản phẩm cần phải trả:{' '}
          </p>

          <p className="text-md italic font-semibold text-blue-500 ml-1">
            {(1)?.toFixed(2)?.toString()?.prettyMoney()}$
          </p>
        </div>

        {isPaySuccess ? (
          <div className="w-full flex justify-center">
            <Image
              src={PaySuccess}
              className="w-[300px] h-[300px]"
              width={300}
              height={300}
            />
          </div>
        ) : null}

        {isPaySuccess ? (
          <div className="mt-4 flex items-center justify-center">
            <CheckBadgeIcon className="text-green-500 font-bold w-5 h-5" />
            <p className="font-semibold text-green-500 ml-2">
              Bạn đã thanh toán thành công, bấm nút đăng để đăng sản phẩm
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm italic mb-2 text-gray-500">
              Thanh toán ngay qua Paypal
            </p>
            <button
              onClick={handlePressPaywithPaypal}
              className="w-[320px] h-[170px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px]"
            >
              <Image
                src={PaypalLogo}
                className="w-[300px] h-[150px] rounded-lg my-auto"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StepFourLeftSide
