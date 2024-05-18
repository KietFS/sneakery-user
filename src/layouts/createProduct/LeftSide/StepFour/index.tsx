import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'
import StepFourLeftSide from './LeftSide'
import StepFourRightSide from './RightSide'
import { PAYMENT_SUCCESS_KEY } from '@/constants'
import { TypeId } from '@/types'

interface IStepFourProps {
  formTool: UseFormReturn<any>
  onPressOpenCategory: () => void
  onPressCreateBid: (values: any) => void
  buttonLoading?: boolean
  onPressBack: () => void
  createdProductId: TypeId
}

const StepFour: React.FC<IStepFourProps> = ({
  formTool,
  onPressCreateBid,
  onPressOpenCategory,
  onPressBack,
  buttonLoading = false,
  createdProductId,
}) => {
  const { control, register, handleSubmit, getValues, watch } = formTool
  const [isPayingPreFee, setIsPayingPreFee] = useState<boolean>(false)
  const [isPaySuccess, setIsPaySuccess] = useState<boolean>(false)
  const { accessToken } = useAuth()

  //Check if the paid is complete
  useEffect(() => {
    const handleStorageChange = async (event: any) => {
      if (event.key === PAYMENT_SUCCESS_KEY['PRE_SALE_FEE']) {
        const listedPaymentPayload = JSON.parse(event.newValue as string)
        setIsPaySuccess(listedPaymentPayload)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      localStorage.removeItem(PAYMENT_SUCCESS_KEY['PRE_SALE_FEE'])
    }
  }, [])

  return (
    <>
      <div className="bg-white flex justify-between gap-x-5">
        <StepFourLeftSide
        productId={createdProductId}
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
    </>
  )
}

export default StepFour
