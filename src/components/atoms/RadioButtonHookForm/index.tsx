import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface IRadioButtonHookFormProps<T = any> {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
}

const RadioButtonHookForm: React.FC<IRadioButtonHookFormProps> = props => {
  const { name, control, label, placeholder } = props

  return (
    <Controller
      name={name}
      defaultValue={false}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div>
          <p className="text-gray-600 text-[14px] font-semibold">{label}</p>
          <button
            className="h-[40px] rounded-lg bg-gray-100 border-gray-300 border w-full px-2 py-1 flex items-center mt-2"
            onClick={() => onChange(!value)}
          >
            {value == true ? (
              <div className="w-4 h-4 rounded-full border border-blue-500 bg-white justify-center items-center flex">
                <div className="w-3 h-3 mx-auto bg-blue-500 rounded-full" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-500 bg-white justify-center items-center flex">
                <div className="w-3 h-3 mx-auto bg-white rounded-full" />
              </div>
            )}
            <p className="text-gray-500 text-xs ml-2">
              {`Có ${label}` || placeholder}
            </p>
          </button>
        </div>
      )}
    />
  )
}

export default RadioButtonHookForm
