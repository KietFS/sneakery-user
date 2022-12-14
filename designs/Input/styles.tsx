import styled from "styled-components";
import tw from "twin.macro";

import { formControlCommon } from "../../components/FormControlCommon";

export const InputContainer = styled.div<{ isError: boolean }>`
  ${tw`w-full  `}
  ${({ isError }) => (isError ? tw`text-red-500` : tw`text-gray-500`)}
`;

export const FieldWrapper = styled.div`
  ${tw`relative flex flex-row items-center w-full rounded-3xl`}
`;

export const InputField = styled.input<{ isError: boolean; isBorder: boolean }>`
  ${tw`focus:outline-none  h-auto max-h-4  focus:border-blue-500`}
  ${({ isError, disabled }) => formControlCommon(isError, disabled)}
  ${({ isBorder }) => !isBorder && tw`border-0`}
`;

export const IconWrapper = styled.div`
  ${tw`absolute cursor-pointer select-none right-1`}
`;
export const LabelWrapper = styled.div`
  ${tw`flex items-center justify-between`}
`;
export const EventChange = styled.div`
  ${tw`text-lg duration-300 cursor-default hover:text-gray-500 text-blue-500`}
`;
export const SubLabel = styled.span`
  ${tw`font-normal phone:ml-0.5 text-sm text-gray-600`}
`;
