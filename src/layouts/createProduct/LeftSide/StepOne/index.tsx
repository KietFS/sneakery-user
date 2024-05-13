import InputHookForm from '@/components/atoms/InputHookForm'
import RadioButtonHookForm from '@/components/atoms/RadioButtonHookForm'
import RichTextInput from '@/components/atoms/RichTextInput'
import SelectCustomFieldHookForm from '@/components/atoms/SelectCustomFieldHookForm'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'
import { IProductCategory } from '@/types'
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  TagIcon,
} from '@heroicons/react/20/solid'
import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { Control, UseFormReturn } from 'react-hook-form'

interface IStepOneProps {
  formTool: UseFormReturn<any>
  customFields: {
    name: string
    type: string
    options?: string[]
    value?: string
  }[]
  setCustomFields: (
    fields: {
      name: string
      type: string
      options?: string[]
      value?: string
    }[],
  ) => void
  onPressOpenCategory: () => void
  onPressNext: () => void
}

const StepOne: React.FC<IStepOneProps> = ({
  formTool,
  customFields,
  setCustomFields,
  onPressOpenCategory,
  onPressNext,
}) => {
  const { control, register, getValues, getFieldState, watch } = formTool
  const { currentCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )

  function checkUndefinedOrNull(obj: any) {
    // Duyệt qua các key của đối tượng
    for (let key in obj) {
      // Kiểm tra xem giá trị của key có phải là undefined hoặc null không
      if (
        obj[key] === undefined ||
        obj[key] === null ||
        obj[key]?.length == 0
      ) {
        return false // Nếu bất kỳ key nào là undefined hoặc null, trả về false
      }
    }
    return true // Nếu không có key nào là undefined hoặc null, trả về true
  }

  const disableButton =
    !watch('name') || !checkUndefinedOrNull(watch('properties'))

  return (
    <div className="bg-white shadow-sm border-gray-200 border rounded-xl h-full p-6 min-h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-gray-600 font-bold text-2xl mb-2">
            Nhập thông tin sản phẩm
          </h1>
          <Tooltip title="Thay đổi danh mục">
            <IconButton onClick={() => onPressOpenCategory()}>
              <TagIcon className="w-6 h-6 text-gray-500 font-semibold" />
            </IconButton>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-10 gap-y-4 tablet:gap-y-4 mt-5 w-full">
          <InputHookForm
            mode="text"
            required
            control={control}
            label={`Tên sản phẩm`}
            placeholder={`Nhập tên của sản phẩm`}
            {...register('name', { required: 'Bạn chưa nhập tên sản phẩm' })}
          />
          {(currentCategory as IProductCategory)?.properties?.map(
            (property, propertyIndex) =>
              !!property?.options?.length ? (
                <>
                  <SelectCustomFieldHookForm
                    required
                    placeholder={`Chọn trường ${property?.name}`}
                    name={`properties.${property?.name}`}
                    label={`Chọn ${property?.name}`}
                    options={property?.options}
                    control={control}
                    onSelect={option => {
                      let cloneFieldValue = [...customFields]
                      cloneFieldValue[propertyIndex] = {
                        ...customFields[propertyIndex],
                        value: option,
                      }
                      setCustomFields([...cloneFieldValue])
                    }}
                  />
                </>
              ) : (
                <>
                  {property.type == 'text' ? (
                    <InputHookForm
                      required
                      mode="text"
                      control={control}
                      label={`${property?.name}`}
                      placeholder={`Nhập ${property?.name} của sản phẩm`}
                      {...register(`properties.${property?.name}`)}
                    />
                  ) : (
                    <>
                      {property.type == 'number' ? (
                        <InputHookForm
                          required
                          mode="text"
                          {...register(`properties.${property?.name}`)}
                          control={control}
                          label={`${property?.name}`}
                          placeholder={`Nhập ${property?.name} của sản phẩm`}
                        />
                      ) : (
                        <RadioButtonHookForm
                          name={`properties.${property?.name}`}
                          control={control}
                          label={`${property?.name}`}
                        />
                      )}
                    </>
                  )}
                </>
              ),
          )}
          <RichTextInput
            name="description"
            label="Mô tả của sản phẩm"
            control={control}
          />
        </div>
      </div>
      <div className="col-span-2 mt-2 flex justify-between">
        <div></div>
        <div className="flex items-center gap-x-2">
          {/* <Tooltip title="Quay về bước trước">
            <IconButton onClick={onPressBack}>
              <ArrowSmallLeftIcon className="w-10 h-10 text-gray-400 hover:text-gray-600" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Qua bước tiếp theo">
            <IconButton onClick={onPressNext} disabled={disableButton}>
              <ArrowSmallRightIcon
                className={`w-10 h-10 ${disableButton && 'opacity-30'} text-gray-600 hover:text-blue-500`}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default StepOne
