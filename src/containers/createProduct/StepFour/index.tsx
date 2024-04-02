import Button from '@/designs/Button'
import InputHookForm from '@/designs/InputHookForm'
import RadioButtonHookForm from '@/designs/RadioButtonHookForm'
import SelectCustomFieldHookForm from '@/designs/SelectCustomFieldHookForm'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'
import { TagIcon } from '@heroicons/react/20/solid'
import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { Control, UseFormReturn } from 'react-hook-form'

interface IStepFourProps {
  formTool: UseFormReturn<any>
  onPressOpenCategory: () => void
  onPressCreateBid: (values: any) => void
}

const StepFour: React.FC<IStepFourProps> = ({
  formTool,
  onPressCreateBid,
  onPressOpenCategory,
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
        <Button
          variant="primary"
          type="submit"
          title="Đăng sản phẩm"
          onClick={handleSubmit(onPressCreateBid)}
        />
      </div>
    </div>
  )
}

export default StepFour
