import {
  CheckBadgeIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PencilIcon,
  PhoneIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { Control, Controller, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

type IInputMode =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'text'
  | 'phoneNumber'
  | 'name'
  | 'money'

interface IInputHookFormProps {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
  customOnChange?: (text: string) => void
  required?: boolean
  defaultValue?: string | number
  className?: string
  mode: IInputMode
  requiredPositiveNumber?: boolean
  requiredPositiveNumberMessage?: string
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
    className = '',
    mode,
    requiredPositiveNumber = false,
    requiredPositiveNumberMessage,
  } = props
  const [focus, setFocus] = useState<boolean>(false)
  const { setError } = useForm()

  const objectTypes = {
    email: {
      icon: <EnvelopeIcon width={20} height={20} color="gray" />,
      placeholder: 'johndoe@gmail.com',
    },
    name: {
      icon: <UserCircleIcon width={20} height={20} color="gray" />,
      placeholder: 'John Doe',
    },
    password: {
      icon: <LockClosedIcon width={20} height={20} color="gray" />,
      placeholder: '**********',
    },

    confirmPassword: {
      icon: <CheckBadgeIcon width={20} height={20} color="gray" />,
      placeholder: '**********',
    },
    phoneNumber: {
      icon: <PhoneIcon width={20} height={20} color="gray" />,
      placeholder: '+84 809 211 211',
    },
    text: {
      icon: <PencilIcon width={20} height={20} color="gray" />,
      placeholder: 'Your text here',
    },
    money: {
      icon: <CurrencyDollarIcon width={20} height={20} color="gray" />,
      placeholder: 'Please enter the price',
    },
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, name },
        fieldState: { error },
        formState: { errors },
      }) => {
        // const onValueChange = (value: string) => {
        //   const numberValue = parseFloat(value)
        //   const formatter = new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'USD',
        //   })
        //   const formattedValue = formatter.format(numberValue)
        //   onChange(formattedValue)
        // }
        //This is for manual set the error
        // if (requiredPositiveNumber && Number(value) < 0) {
        //   setError(name, {
        //     type: 'manual',
        //     message:
        //       requiredPositiveNumberMessage ||
        //       'Trường này không được nhỏ hơn 0',
        //   })
        // }
        return (
          <div
            className={`w-full rounded-sm ${
              !!error ? 'text-blue-500' : 'text-neutral-300'
            }  `}
          >
            <div className="flex items-center justify-between">
              <div className="flex">
                <p className="text-md font-bold text-gray-700 mr-1">{label}</p>
                {required && <p className="text-red-500 font-bold">*</p>}
              </div>
            </div>
            <div
              className={`flex mt-1 ${
                focus && !error
                  ? 'border-2 border-blue-500'
                  : !!error
                  ? 'border-2 border-red-500'
                  : 'border border-gray-300'
              } items-center ${
                focus && !error
                  ? 'bg-blue-50'
                  : error
                  ? 'bg-red-50'
                  : 'bg-gray-100'
              } px-2 py-1 rounded-lg h-10  ${className}`}
            >
              {mode === 'money' ? (
                <CurrencyInput
                  autoComplete="off"
                  name={name}
                  placeholder={
                    props.placeholder ||
                    (objectTypes as any)?.[mode]?.placeholder ||
                    ''
                  }
                  value={value}
                  onBlur={() => setFocus(false)}
                  onFocus={() => setFocus(true)}
                  onValueChange={e => onChange(e)}
                  className={`px-2 py-1 w-[90%]  ${
                    focus && !error
                      ? 'bg-blue-50'
                      : error
                      ? 'bg-red-50'
                      : 'bg-gray-100'
                  } text-gray-700 rounded-lg w-80 h-8 text-sm  outline-none ring-0 border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent`}
                />
              ) : (
                <input
                  autoComplete="off"
                  name={name}
                  placeholder={
                    props.placeholder ||
                    (objectTypes as any)?.[mode]?.placeholder ||
                    ''
                  }
                  value={value}
                  onBlur={() => setFocus(false)}
                  type={
                    mode === 'password' || mode == 'confirmPassword'
                      ? 'password'
                      : 'text'
                  }
                  onFocus={() => setFocus(true)}
                  onChange={e => onChange(e.target.value)}
                  className={`px-2 py-1 w-[90%]  ${
                    focus && !error
                      ? 'bg-blue-50'
                      : error
                      ? 'bg-red-50'
                      : 'bg-gray-100'
                  } text-gray-700 rounded-lg w-80 h-8 text-sm  outline-none ring-0 border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent`}
                />
              )}
            </div>
            {error && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                {error?.message}
              </p>
            )}
            {requiredPositiveNumber && Number(value) < 0 && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                {requiredPositiveNumberMessage ||
                  'Trường này không được nhỏ hơn 0'}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default InputHookForm
