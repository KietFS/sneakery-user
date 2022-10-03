import { useField, useFormikContext } from "formik";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

import FormControlErrorHelper from "../FormControlErrorHelper";
import FormControlLabel from "../FormControlLabel";

interface IInputPhoneNumberProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className?: string;
  label?: string | null;
  subLabel?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  hasEvent?: boolean;
  isBorder?: boolean;
  onClickEvent?: () => void;
  // use onChangeValue instead of onChange, since Formik will overwrite the onChange
  onChangeValue?: (value: string | number) => void;
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputPhoneNumber: React.FC<IInputPhoneNumberProps> = (props) => {
  const {
    name,
    className,
    required,
    label = null,
    subLabel = "",
    hasEvent = false,
    onClickEvent,
    autoComplete = "off",
    onChangeValue,
    isBorder = true,
    ...rest
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);
  useEffect(() => {
    onChangeValue && onChangeValue(field.value || "");
  }, [field.value]);

  const isError: boolean = !!meta.touched && !!meta.error;

  const onValueChange = (phoneNumber: string) => {
    setFieldValue(name, phoneNumber);
  };

  return (
    <div
      className={`w-full rounded-sm ${
        isError ? "text-red-500" : "text-neutral-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <p className="text-md font-bold text-black mr-1">{label}</p>
          {required && <p className="text-red-500 font-bold">*</p>}
        </div>
        {hasEvent && (
          <div
            className="duration-300 cursor-default text-base hover:text-gray-500 text-blue-500"
            onClick={() => {
              onClickEvent && onClickEvent();
            }}
          >
            Change
          </div>
        )}
      </div>

      <input
        placeholder="+XX XXX XXX XXX"
        {...(rest as any)}
        {...field}
        onChange={(e) => onValueChange(e.target.value)}
        className="px-2 py-1  bg-gray-100 text-black rounded-lg w-72 h-10 text-sm"
      />
      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </div>
  );
};

export default InputPhoneNumber;
