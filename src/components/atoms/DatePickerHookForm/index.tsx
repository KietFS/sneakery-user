import * as React from 'react'

//styles
import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/x-date-pickers'

//utils
import dayjs, { Dayjs } from 'dayjs'

//hooks
import { useField, useFormikContext } from 'formik'
import { useEffect } from 'react'
import { useState } from 'react'
import { Control, Controller, UseFormReturn } from 'react-hook-form'

interface IDatePicketHookFormProps {
  defaultValue?: string
  required?: boolean
  label: string
  name: string
  control: Control<any>
}

const DatePickerHookForm: React.FC<IDatePicketHookFormProps> = props => {
  const { label, name, control, defaultValue, required = false } = props
  const [localError, setLocalError] = useState<boolean>(false)

  const currentDate = new Date(Date.now())

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={Date.now() + 60 * 1000 * 60}
      render={({
        field: { value, onChange: onFieldChange },
        fieldState: { error },
      }) => {
        useEffect(() => {
          if (defaultValue) {
            onFieldChange(defaultValue)
          }
        }, [defaultValue])
        return (
          <div className="mt-1">
            <div className="flex items-center">
              <p className="text-sm font-bold text-gray-600 mb-2 mr-1">
                {label}
              </p>
              {required && <p className="text-sm font-bold text-red-500">*</p>}
            </div>
            <div className=" z-50">
              <DateTimePicker
                value={value}
                InputProps={{
                  style: {
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#f3f4f6',
                    border: 1,
                    color: '#6b7280',
                    fontSize: 14,
                    borderColor: '#d1d5db',
                  },
                }}
                onChange={changedValue => {
                  if (changedValue < currentDate) {
                    onFieldChange(changedValue) // Sử dụng giá trị changedValue trực tiếp
                    setLocalError(true)
                  } else {
                    setLocalError(false)
                    onFieldChange(changedValue) // Sử dụng giá trị changedValue trực tiếp
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    className="w-full z-1"
                    style={{
                      height: 40,
                      zIndex: 1,
                      borderRadius: 7,
                    }}
                  />
                )}
              />
            </div>
            {(!!error || !!localError) && (
              <p className="text-red-500 text-sm mt-2 font-semibold">
                {'Thời điểm kết thúc đấu giá phải diễn ra sau bây giờ' ||
                  error?.message}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default DatePickerHookForm
