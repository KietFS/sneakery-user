import { Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

interface IReservePriceInputProps<T = any> {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
  error?: boolean
}

const ReservePriceInput: React.FC<IReservePriceInputProps> = props => {
  const { name, control, label, placeholder, error = false } = props
  const [enable, setEnable] = useState<boolean>(false)

  return (
    <Controller
      disabled={!enable}
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: {} }) => (
        <div>
          <p className="text-gray-600 text-[14px] font-semibold">{label}</p>
          <button
            className={`h-[40px] border-gray-300 border-2 rounded-lg bg-gray-100 w-full px-2 py-1 flex items-center mt-2 ${enable ? '' : 'opacity-30'}`}
          >
            <Switch value={enable} onClick={() => setEnable(!enable)} />

            {enable ? (
              <input
                onChange={onChange}
                value={value}
                placeholder="Nhập ngưỡng giá"
                disabled={!enable}
                className="bg-gray-100 ml-2 focus:border-gray-100 focus:ring-0 focus:outline-gray-100 text-sm outline-none ring-0"
              />
            ) : null}
          </button>
          {!!error && enable ? (
            <p className="text-xs text-red-500 font-semibold">
              Reserve price phải lớn hơn giá khởi điểm
            </p>
          ) : null}
        </div>
      )}
    />
  )
}

export default ReservePriceInput
