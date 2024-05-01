import Button from '@/components/atoms/Button'
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

interface IStepFourRightSideProps {
  onPressBack: () => void
  isPaySuccess: boolean
  setIsPaySuccess: (p: boolean) => void
  handleSubmit: any
  onPressCreateBid: any
  buttonLoading: boolean
}

const StepFourRightSide: React.FC<IStepFourRightSideProps> = props => {
  const {
    onPressBack,
    isPaySuccess,
    setIsPaySuccess,
    handleSubmit,
    onPressCreateBid,
    buttonLoading,
  } = props
  return (
    <div className="border-gray-200 border p-6  h-full min-h-[500px] w-1/4 rounded-lg flex flex-col-reverse">
      <div></div>
      <div className="flex items-center gap-x-2">
        <Tooltip title="Quay về bước trước">
          <IconButton onClick={onPressBack}>
            <ArrowSmallLeftIcon className="w-10 h-10 text-gray-400 hover:text-gray-600" />
          </IconButton>
        </Tooltip>

        <Button
          title="Đăng sản phẩm"
          disable={!isPaySuccess}
          onClick={handleSubmit(onPressCreateBid)}
          isLoading={buttonLoading}
        />
      </div>
    </div>
  )
}

export default StepFourRightSide
