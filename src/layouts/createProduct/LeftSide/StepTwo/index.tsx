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
import React from 'react'
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
  const { control, register, getValues, watch } = formTool
  const currentDate = new Date()

  const formatDate = (dateString: string) => {
    var originalDate = new Date(dateString)
    originalDate.setDate(originalDate.getDate())
    originalDate.setHours(12)
    originalDate.setMinutes(0)
    originalDate.setSeconds(0)

    var newYear = originalDate.getFullYear()
    var newMonth = originalDate.getMonth() + 1
    var newDay = originalDate.getDate()

    var newDateString =
      newYear +
      '-' +
      (newMonth < 10 ? '0' : '') +
      newMonth +
      '-' +
      (newDay < 10 ? '0' : '') +
      newDay +
      'T12:00:00'

    return newDateString
  }

  const isDisable =
    !watch('priceStart') ||
    !watch('stepBid') ||
    !watch('bidClosingDateTime') ||
    Number(watch('priceStart')) >= Number(watch('reservePrice'))

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
            mode="text"
            control={control}
            label={`Giá khởi điểm`}
            placeholder={`Nhập giá khởi điểm của sản phẩm`}
            {...register('priceStart', {
              required: 'Bạn chưa nhập giá khởi điểm của sản phẩm',
            })}
          />
          <InputHookForm
            required
            mode="text"
            control={control}
            label={`Bước giá`}
            placeholder={`Nhập bước giá của sản phẩm`}
            {...register('stepBid', {
              required: 'Bạn chưa nhập bước giá của sản phẩm',
            })}
          />
          <DatePickerHookForm
            required
            {...register('bidClosingDateTime', {
              required: 'Vui lòng chọn ngày kết thúc đấu giá',
            })}
            label="Chọn thời điểm kết thúc đấu giá"
            control={control}
            defaultValue={new Date(Date.now() + 60 * 1000 * 60 * 24).toString()}
          />
          <RadioButtonHookForm
            control={control}
            name="isBidSniping"
            placeholder="Chặn bid sniping"
            label="Bid sniping"
          />
          <ReservePriceInput
            control={control}
            name="reservePrice"
            error={Number(watch('priceStart')) >= Number(watch('reservePrice'))}
            placeholder="Đặt ngưỡng giá tối thiểu"
            label="Đặt ngưỡng giá tối thiểu"
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
