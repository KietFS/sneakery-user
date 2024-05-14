import { useField, useFormikContext } from 'formik'
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'

//icons
import {
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserCircleIcon,
  CheckBadgeIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'

type IInputMode =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'text'
  | 'phoneNumber'
  | 'name'

interface IBaseInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  className?: string
  label?: string | null
  isRequired?: boolean
  hasEvent?: boolean
  onClickEvent?: () => void
  // use onChangeValue instead of onChange, since Formik will overwrite the onChange
  onChangeValue?: (value: string | number) => void
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  mode?: IInputMode
}

//Need to fix bug on blur
const BaseInput: React.FC<IBaseInputProps> = props => {
  const {
    name,
    className,
    isRequired,
    label = null,
    hasEvent = false,
    onClickEvent,
    onChangeValue,
    mode = 'text',
  } = props
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(props.name)
  const [focus, setFocus] = useState<boolean>(false)

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
      placeholder: '0809211211',
    },
    text: {
      icon: <PencilIcon width={20} height={20} color="gray" />,
      placeholder: 'Your text here',
    },
  }

  const isError: boolean = !!meta.touched && !!meta.error

  const onValueChange = (phoneNumber: string) => {
    setFieldValue(name, phoneNumber)
  }

  const handleOnBlur = () => {
    setFocus(false)
  }

  const handleOnFocus = () => {
    setFocus(true)
  }

  useEffect(() => {
    onChangeValue && onChangeValue(field.value || '')
  }, [field.value])

  return (
    <div
      className={`w-full rounded-sm ${
        isError ? 'text-blue-500' : 'text-neutral-300'
      }  `}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <p className="text-md font-bold text-gray-700 mr-1">{label}</p>
          {isRequired && <p className="text-blue-500 font-bold">*</p>}
        </div>
      </div>
      <div
        className={`flex w-80 ${
          focus && !isError
            ? 'border-2 border-blue-500'
            : isError
              ? 'border-2 border-red-500'
              : 'border border-gray-300'
        } items-center ${
          focus && !isError
            ? 'bg-blue-50'
            : isError
              ? 'bg-red-50'
              : 'bg-gray-100'
        } px-2 py-1 rounded-lg h-10  ${className}`}
      >
        <div className="border-r border-gray-500 pr-2">
          <>{(objectTypes as any)?.[mode]?.icon}</>
        </div>
        <input
          autoComplete="off"
          placeholder={(objectTypes as any)?.[mode]?.placeholder || ''}
          {...field}
          onBlur={handleOnBlur}
          type={
            mode === 'password' || mode == 'confirmPassword'
              ? 'password'
              : 'text'
          }
          onFocus={handleOnFocus}
          onChange={e => onValueChange(e.target.value)}
          className={`px-2 py-1  ${
            focus && !isError
              ? 'bg-blue-50'
              : isError
                ? 'bg-red-50'
                : 'bg-gray-100'
          } text-gray-700 rounded-lg w-80 h-8 text-sm  outline-none ring-0 border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent`}
        />
      </div>
      {isError && (
        <p className="text-red-500 text-xs font-semibold mt-1">{meta.error}</p>
      )}
    </div>
  )
}

export default BaseInput
