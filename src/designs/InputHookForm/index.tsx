import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface IInputHookFormProps {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
  customOnChange?: (text: string) => void
  required?: boolean
  defaultValue?: string | number
}

const InputHookForm: React.FC<IInputHookFormProps> = props => {
  const {
    name,
    control,
    label,
    customOnChange,
    required,
    placeholder,
    defaultValue = '',
  } = props
  console.log('name', name)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div
            className={`w-full rounded-sm ${
              !!error ? 'text-blue-500' : 'text-neutral-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex">
                <p className="text-sm font-bold text-gray-600 mb-1 mr-1">
                  {label}
                </p>
                {required && <p className="text-red-500 font-bold">*</p>}
              </div>
            </div>
            <div
              className={`flex items-center bg-gray-100  py-1 rounded-lg h-10 focus-within:bg-blue-50 w-full`}
            >
              <input
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={e => {
                  onChange(e.target.value)
                  customOnChange?.(e.target.value)
                }}
                className={`px-2 py-1 mt-2  bg-gray-100 text-gray-700 rounded-lg w-full h-[40px] text-sm focus:bg-blue-50 outline-none ring-0 outline-white border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent`}
              />
            </div>
            {!!error && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                {error?.message}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default InputHookForm
