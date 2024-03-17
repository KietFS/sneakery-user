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
  label: string
  name: string
  control: Control<any>
}

const DatePickerHookForm: React.FC<IDatePicketHookFormProps> = props => {
  const { label, name, control } = props
  const [localError, setLocalError] = useState<boolean>(false)

  const currentDate = new Date(Date.now() + 36000)

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={Date.now() + 3600}
      render={({
        field: { value, onChange: onFieldChange },
        fieldState: { error },
      }) => (
        <div className="mt-1">
          <p className="text-sm font-bold text-gray-600 mb-2 mr-1">{label}</p>
          <div className=" z-50">
            <DateTimePicker
              value={value}
              InputProps={{ style: { height: 40, backgroundColor: '#f7f8f8' } }}
              onChange={changedValue => {
                let temp = new Date(changedValue)
                if (temp < currentDate) {
                  setLocalError(true)
                } else {
                  setLocalError(false)
                  onFieldChange(changedValue?.toDate())
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
      )}
    />
  )
}

export default DatePickerHookForm
