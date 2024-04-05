import { Config } from '@/config/api'
import Button from '@/designs/Button'
import InputHookForm from '@/designs/InputHookForm'
import RadioButtonHookForm from '@/designs/RadioButtonHookForm'
import SelectCustomFieldHookForm from '@/designs/SelectCustomFieldHookForm'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'
import {
  ArrowSmallLeftIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  CheckIcon,
  TagIcon,
} from '@heroicons/react/20/solid'
import {} from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Control, UseFormReturn } from 'react-hook-form'
import Image from 'next/image'
import PaypalLogo from '@/assets/images/PayPalLogo.png'
import { configResponse } from '@/utils/request'
import { useAuth } from '@/hooks/useAuth'

interface IStepFourProps {
  formTool: UseFormReturn<any>
  onPressOpenCategory: () => void
  onPressCreateBid: (values: any) => void
  buttonLoading?: boolean
  onPressBack: () => void
}

const StepFour: React.FC<IStepFourProps> = ({
  formTool,
  onPressCreateBid,
  onPressOpenCategory,
  onPressBack,
  buttonLoading = false,
}) => {
  const { control, register, handleSubmit, getValues, watch } = formTool
  const { user } = useAppSelector((state: IRootState) => state.auth)
  const [isPayingPreFee, setIsPayingPreFee] = useState<boolean>(false)
  const [isPaySuccess, setIsPaySuccess] = useState<boolean>(false)
  const { accessToken } = useAuth()

  const handlePressPayPreFee = async () => {
    try {
      const payload = {
        amount: (watch('priceStart') * 15) / 100,
        userId: user?.id,
      }
      setIsPayingPreFee(true)
      const response = await axios.post(
        `${Config.API_URL}/transactions/payment`,
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
        await handleUpdatePaidStatus()
      }
    } catch (error) {
      setIsPayingPreFee(false)
    }
  }

  const handleUpdatePaidStatus = async () => {
    try {
      const response = await axios.get(
        `${Config.API_URL}/transactions/payment`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const { data, isSuccess, error } = configResponse(response)
      if (response?.data?.success) {
        console.log('PAID STATUS', data)
      }
    } catch (error) {
      setIsPayingPreFee(false)
    }
  }

  return (
    <div className="bg-white border-gray-200 border rounded-xl h-full p-6 min-h-[500px] flex flex-col justify-between">
      <div>
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
              {(watch('priceStart') as string)?.prettyMoney()} * 15% ={' '}
              {((watch('priceStart') * 15) / 100)
                ?.toFixed(0)
                ?.toString()
                ?.prettyMoney()}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm italic mb-2 text-gray-500">
              Thanh toán ngay qua Paypal
            </p>
            <button
              onClick={handlePressPayPreFee}
              className="w-[320px] h-[170px] border border-gray-200 justify-center items-center flex rounded-lg cursor-pointer hover:opacity-70 p-[5px]"
            >
              <Image
                src={PaypalLogo}
                className="w-[300px] h-[150px] rounded-lg my-auto"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-2 mt-2 flex justify-between">
        <div></div>
        <div className="flex items-center gap-x-2">
          <Tooltip title="Quay về bước trước">
            <IconButton onClick={onPressBack}>
              <ArrowSmallLeftIcon className="w-10 h-10 text-gray-400 hover:text-gray-600" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={`${isPaySuccess ? 'Hoàn tất việc đăng sản phẩm' : 'Bạn cần thanh toán trước khi có thể đăng giày'}`}
          >
            <IconButton
              onClick={() => {
                if (!isPaySuccess) {
                }
                handleSubmit(onPressCreateBid)
              }}
            >
              <CheckIcon
                className={`w-8 h-8 text-gray-600 hover:text-blue-500 ${!isPaySuccess ? 'opacity-30' : ''}`}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default StepFour
