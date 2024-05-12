import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'

interface IRichTextInputProps {
  name: string
  control: Control
  onChangeValue?: (value: string) => void
  className?: string
  placeholder?: string
  label: string
}

const RichTextInput: React.FC<IRichTextInputProps> = props => {
  const { name, control, onChangeValue, className, placeholder, label } = props
  const [focus, setFocus] = useState<boolean>(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: {},
      }) => {
        return (
          <div
            className={`w-full rounded-sm ${
              !!error ? 'text-blue-500' : 'text-neutral-300'
            }  `}
          >
            <div className="flex items-center justify-between">
              <div className="flex">
                <p className="text-md font-bold text-gray-700 mr-1">{label}</p>
                {false && <p className="text-blue-500 font-bold">*</p>}
              </div>
            </div>
            <div
              className={`flex mt-1 ${
                focus && !error
                  ? 'border-2 border-blue-500'
                  : !!error
                    ? 'border-2 border-red-500'
                    : 'border border-gray-300'
              } ${
                focus && !error
                  ? 'bg-blue-50'
                  : error
                    ? 'bg-red-50'
                    : 'bg-gray-100'
              } px-2 py-1 rounded-lg h-20  ${className}`}
            >
              <input
                autoComplete="off"
                placeholder={props.placeholder || ''}
                value={value}
                multiple
                onBlur={() => setFocus(false)}
                type="text"
                onFocus={() => setFocus(true)}
                onChange={e => onChange(e.target.value)}
                className={`px-2 py-1 w-[100%]  ${
                  focus && !error
                    ? 'bg-blue-50'
                    : error
                      ? 'bg-red-50'
                      : 'bg-gray-100'
                } text-gray-700 rounded-lg w-80 h-8 text-sm  outline-none ring-0 border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent`}
              />
            </div>
            {error && (
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

export default RichTextInput
