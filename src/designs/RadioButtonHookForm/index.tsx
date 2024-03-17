import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface IRadioButtonHookFormProps<T = any> {
  name: string
  control: Control<any>
  label: string
}

const RadioButtonHookForm: React.FC<IRadioButtonHookFormProps> = props => {
  const { name, control, label } = props

  return (
    <Controller
      name={name}
      defaultValue={false}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div>
          <p className="text-gray-600 text-[16px] font-semibold">{label}</p>
          <button
            className="h-[40px] rounded-lg bg-gray-100 w-full px-2 py-1 flex items-center"
            onClick={() => onChange(!value)}
          >
            <p className="text-gray-500 text-xs mr-2">{`Có ${label}`}</p>
            {value == true ? (
              <div className="w-4 h-4 rounded-full border border-blue-500 bg-white justify-center items-center flex">
                <div className="w-3 h-3 mx-auto bg-blue-500 rounded-full" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full border border-gray-500 bg-white justify-center items-center flex">
                <div className="w-3 h-3 mx-auto bg-white rounded-full" />
              </div>
            )}
          </button>
        </div>
      )}
    />
  )
}

export default RadioButtonHookForm
