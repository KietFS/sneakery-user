import Button from '@/components/atoms/Button'
import DatePickerHookForm from '@/components/atoms/DatePickerHookForm'
import InputHookForm from '@/components/atoms/InputHookForm'
import RadioButtonHookForm from '@/components/atoms/RadioButtonHookForm'
import ReservePriceInput from '@/components/atoms/ReserverdPriceInput'
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  TagIcon,
} from '@heroicons/react/20/solid'
import { IconButton, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface IStepTwoProps {
  formTool: UseFormReturn<any>
  onPressNext: () => void
  onPressBack: () => void
}

const StepTwo: React.FC<IStepTwoProps> = ({
  formTool,
  onPressNext,
  onPressBack,
}) => {
  const { control, register, getValues, watch, setValue } = formTool

  const isDisable =
    !watch('priceStart') ||
    Number(watch('priceStart')) < 0 ||
    Number(watch('stepBid')) < 0 ||
    !watch('stepBid') ||
    !watch('bidClosingDateTime') ||
    Number(watch('priceStart')) >= Number(watch('reservePrice'))

  useEffect(() => {
    setValue(
      'bidClosingDateTime',
      new Date(Date.now() + 60 * 1000 * 60 * 24).toString(),
    )
  }, [])

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
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-10 gap-y-5 mt-5">
          <InputHookForm
            required
            mode="money"
            control={control}
            label={`Giá khởi điểm`}
            placeholder={`Nhập giá khởi điểm của sản phẩm`}
            {...register('priceStart', {
              required: 'Bạn chưa nhập giá khởi điểm của sản phẩm',
            })}
            requiredPositiveNumber
            requiredPositiveNumberMessage="Giá khởi điểm không được nhỏ hơn 0"
          />
          <InputHookForm
            required
            mode="money"
            control={control}
            label={`Bước giá`}
            placeholder={`Nhập bước giá của sản phẩm`}
            {...register('stepBid', {
              required: 'Bạn chưa nhập bước giá của sản phẩm',
              min: {
                value: 0,
                message: 'Bước giá không được nhỏ hơn 0',
              },
            })}
            requiredPositiveNumber
            requiredPositiveNumberMessage="Bước giá không được nhỏ hơn 0"
          />
          <DatePickerHookForm
            required
            {...register('bidClosingDateTime', {
              required: 'Vui lòng chọn ngày kết thúc đấu giá',
            })}
            label="Chọn thời điểm kết thúc đấu giá"
            control={control}
          />
          <RadioButtonHookForm
            control={control}
            name="isBidSniping"
            placeholder="Chặn bid sniping"
            label="Bid sniping"
          />
          <ReservePriceInput
            control={control}
            {...register('reservePrice')}
            error={Number(watch('priceStart')) >= Number(watch('reservePrice'))}
            placeholder="Đặt ngưỡng giá tối thiểu"
            label="Đặt ngưỡng giá tối thiểu"
            errorMessage="Ngưỡng giá tối thiểu phải lớn hơn giá khởi điểm"
          />
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
            <IconButton
              disabled={isDisable}
              onClick={() => {
                if (isDisable) {
                } else {
                  onPressNext()
                }
              }}
            >
              <ArrowSmallRightIcon
                className={`w-10 h-10  text-gray-600 hover:text-blue-500 ${
                  isDisable ? 'opacity-30' : ''
                }`}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default StepTwo
