import { Config } from '@/config/api'
import Button from '@/components/atoms/Button'
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
import React, { useEffect, useState } from 'react'
import { Control, UseFormReturn } from 'react-hook-form'
import Image from 'next/image'
import PaypalLogo from '@/assets/images/PayPalLogo.png'
import { configResponse } from '@/utils/request'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import PaySuccess from '@/assets/images/PaySuccess.png'
import StepFourLeftSide from './LeftSide'
import StepFourRightSide from './RightSide'

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
  const [openPaySuccessDialog, setOpenPaySuccessDailog] =
    useState<boolean>(false)
  const { accessToken } = useAuth()

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
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    if (isPaySuccess) {
      setOpenPaySuccessDailog(true)
    }
  }, [isPaySuccess])

  return (
    <>
      <div className="bg-white flex justify-between gap-x-5">
        <StepFourLeftSide
          handleGoBack={onPressBack}
          isPaySuccess={isPaySuccess}
          setIsPaySuccess={setIsPaySuccess}
        />
        <StepFourRightSide
          isPaySuccess={isPaySuccess}
          setIsPaySuccess={setIsPaySuccess}
          onPressBack={onPressBack}
          handleSubmit={handleSubmit}
          onPressCreateBid={onPressCreateBid}
          formTool={formTool}
          buttonLoading={buttonLoading}
        />
      </div>

      {/* {openPaySuccessDialog != null ? (
        <PaidSuccessDailog
          open={openPaySuccessDialog}
          onClose={() => setOpenPaySuccessDailog(false)}
        />
      ) : null} */}
    </>
  )
}

export default StepFour
