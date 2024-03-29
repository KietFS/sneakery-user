import Button from '@/designs/Button'
import DatePickerHookForm from '@/designs/DatePickerHookForm'
import InputHookForm from '@/designs/InputHookForm'
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  TagIcon,
} from '@heroicons/react/20/solid'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface IStepTwoProps {
  formTool: UseFormReturn<any>
  onPressOpenCategory: () => void
  onPressNext: () => void
  onPressBack: () => void
}

const StepTwo: React.FC<IStepTwoProps> = ({
  formTool,
  onPressOpenCategory,
  onPressNext,
  onPressBack,
}) => {
  const { control, register } = formTool
  return (
    <div className="bg-white border-gray-200 border rounded-xl h-full p-6 min-h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-gray-600 font-bold text-2xl mb-2">
            Nhập thông tin đấu giá
          </h1>
          {/* <Tooltip title="Thay đổi danh mục">
            <IconButton onClick={() => onPressOpenCategory()}>
              <TagIcon className="w-6 h-6 text-gray-500 font-semibold" />
            </IconButton>
          </Tooltip> */}
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
          <InputHookForm
            control={control}
            label={`Giá khởi điểm`}
            placeholder={`Nhập giá khởi điểm của sản phẩm`}
            {...register('priceStart', {
              required: 'Bạn chưa nhập giá khởi điểm của sản phẩm',
            })}
          />
          <InputHookForm
            control={control}
            label={`Bước giá`}
            placeholder={`Nhập bước giá của sản phẩm`}
            {...register('stepBid', {
              required: 'Bạn chưa nhập bước giá của sản phẩm',
            })}
          />
          <DatePickerHookForm
            {...register('bidClosingDateTime', {
              required: 'Vui lòng chọn ngày kết thúc đấu giá',
            })}
            label="Chọn thời điểm kết thúc đấu giá"
            control={control}
          />
          <div></div>
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
          <Tooltip title="Qua bước tiếp theo">
            <IconButton onClick={onPressNext}>
              <ArrowSmallRightIcon className="w-10 h-10 text-gray-600 hover:text-blue-500" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default StepTwo
