import { css } from 'styled-components'
import tw from 'twin.macro'

export const formControlCommon = (
  isError: boolean | undefined,
  disabled: boolean | undefined,
) =>
  css`
    ${tw`
      w-full 
      rounded-3xl
      border-solid
      bg-blue-500
      px-1.5
      h-4
      focus-within:border-blue-500
      text-sm 
      text-gray-500
      placeholder-gray-500
      font-normal
      box-border
    `}
    ${!isError
      ? tw`border-gray-500 focus:border-blue-500 group-focus:border-blue-500`
      : tw`border-red-500 focus:border-red-500 group-focus:border-red-500 `}
    ${disabled && tw`pointer-events-none opacity-60 bg-gray-700`}
  `
