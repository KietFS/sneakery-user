import Button from '@/components/atoms/Button'
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface IStepFourRightSideProps {
  onPressBack: () => void
  isPaySuccess: boolean
  setIsPaySuccess: (p: boolean) => void
  handleSubmit: any
  onPressCreateBid: any
  buttonLoading: boolean
  formTool: UseFormReturn<any>
}

const StepFourRightSide: React.FC<IStepFourRightSideProps> = props => {
  const {
    onPressBack,
    isPaySuccess,
    setIsPaySuccess,
    handleSubmit,
    onPressCreateBid,
    buttonLoading,
    formTool,
  } = props
  const { watch } = formTool
  console.log('is pay success', isPaySuccess)

  return (
    <div className="border-gray-200 border p-6  h-full min-h-[500px] w-1/4 rounded-lg flex flex-col justify-between">
      <div>
        <div className="w-full flex flex-col">
          <h1 className="text-gray-600 font-bold text-xl">
            Thông tin sản phẩm
          </h1>
        </div>

        <div className="mt-2 flex items-center">
          <h3 className="text-gray-400 text-lg">Tên sản phẩm : </h3>
          <h3 className="text-gray-500 text-lg ml-1  cursor-pointer">
            {watch('name')}
          </h3>
        </div>
        <div className="mt-1 flex items-center">
          <h3 className="text-gray-400 text-lg">Giá khởi điểm : </h3>
          <h3 className="text-gray-500 text-lg ml-1  cursor-pointer">
            {watch('priceStart')?.toString().prettyMoney()}$
          </h3>
        </div>
        <div className="mt-1 flex items-center">
          <h3 className="text-gray-400 text-lg">Bước giá : </h3>
          <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
            {watch('stepBid')?.toString().prettyMoney()}$
          </h3>
        </div>

        <div className="mt-1 flex items-center">
          <h3 className="text-gray-400 text-lg">Ngày kết thúc: </h3>
          <h3 className="text-blue-500 ml-1 text-lg cursor-pointer">
            {watch('bidClosingDateTime')?.toString().prettyDate()}
          </h3>
        </div>
      </div>

      <div className="flex flex-row-reverse">
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
