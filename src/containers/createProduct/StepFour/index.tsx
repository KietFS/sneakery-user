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
import React, { useState } from 'react'
import { Control, UseFormReturn } from 'react-hook-form'

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
  const { control, register, handleSubmit } = formTool
  const { currentCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )

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
        <p className="mt-1 text-sm italic text-gray-500">
          *Bạn cần thanh toán trước phí để có thể đăng sản phẩm. Tham khảo mục
          Thông tin chi phí
        </p>

        {/* Main content go here */}
        <div></div>
      </div>
      <div className="col-span-2 mt-2 flex justify-between">
        <div></div>
        <div className="flex items-center gap-x-2">
          <Tooltip title="Quay về bước trước">
            <IconButton onClick={onPressBack}>
              <ArrowSmallLeftIcon className="w-10 h-10 text-gray-400 hover:text-gray-600" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hoàn tất việc đăng sản phẩm">
            <IconButton onClick={handleSubmit(onPressCreateBid)}>
              <CheckIcon className="w-8 h-8 text-gray-600 hover:text-blue-500" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default StepFour
