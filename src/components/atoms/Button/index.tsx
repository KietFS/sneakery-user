import { CircularProgress } from '@mui/material'
import React from 'react'

type IButtonVariant = 'primary' | 'secondary' | 'red'
type IButtonType = 'button' | 'submit'

interface IButtonProps {
  onClick?: () => void
  variant?: IButtonVariant
  className?: string
  type?: IButtonType
  title?: string
  isLoading?: boolean
  disable?: boolean
}

const Button: React.FC<IButtonProps> = props => {
  const {
    onClick,
    variant = 'primary',
    className,
    type = 'submit',
    title = '',
    isLoading = false,
    disable = false,
  } = props

  return (
    <button
      className={`items-center min-w-[120px] justify-center rounded-lg px-4 py-2 text-center w-fit flex hover:opacity-50 ${disable ? 'opacity-10' : ''} ${className} ${
        variant === 'primary' && 'bg-blue-500'
      } ${variant === 'secondary' && 'bg-white'}
      ${variant === 'red' && 'bg-red-500'} ${
        variant === 'secondary' ? 'text-blue-500' : 'text-white'
      } border ${
        variant === 'secondary' ? 'border-blue-500' : 'border-transparent'
      } font-semibold text-lg`}
      onClick={() => (disable ? {} : onClick?.())}
      type={type}
    >
      {isLoading ? (
        <div className={`w-[${title?.length * 8}px]`}>
          <CircularProgress sx={{ color: 'white' }} size={20} />
        </div>
      ) : (
        title
      )}
    </button>
  )
}

export default Button
