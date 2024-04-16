import Button from '@/components/atoms/Button'
import DescriptionInput from '@/components/atoms/DescriptionInput'
import InputHookForm from '@/components/atoms/InputHookForm'
import RadioButtonHookForm from '@/components/atoms/RadioButtonHookForm'
import SelectCustomFieldHookForm from '@/components/atoms/SelectCustomFieldHookForm'
import { useAppSelector } from '@/hooks/useRedux'
import { IRootState } from '@/redux'
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
  const { control, register, getValues, getFieldState } = formTool
  const { currentCategory } = useAppSelector(
    (state: IRootState) => state.category,
  )

  const disableButton = !getValues('name') || !getValues('properties')

  return (
    <div className="bg-white border-gray-200 border rounded-xl h-full p-6 min-h-[500px] flex flex-col justify-between">
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

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
          <InputHookForm
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
                      control={control}
                      label={`${property?.name}`}
                      placeholder={`Nhập ${property?.name} của sản phẩm`}
                      {...register(`properties.${property?.name}`)}
                    />
                  ) : (
                    <>
                      {property.type == 'number' ? (
                        <InputHookForm
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
          {/* <div className="col-span-2 mt-8 w-full">
            <DescriptionInput
              control={control}
              name="description"
              label="Mô tả"
            />
          </div> */}
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
