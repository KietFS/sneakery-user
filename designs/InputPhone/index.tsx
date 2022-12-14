import { useField, useFormikContext } from "formik";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
} from "react";

//icons
import { PhoneIcon } from "@heroicons/react/20/solid";

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
        isError ? "text-blue-500" : "text-neutral-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <p className="text-md font-bold text-gray-700 mr-1">{label}</p>
          {required && <p className="text-blue-500 font-bold">*</p>}
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
      <div
        className={`flex w-80 items-center bg-gray-100 px-2 py-1 rounded-lg h-10 focus-within:bg-blue-50 ${className}`}
      >
        <div className="border-r border-gray-500 pr-2">
          <PhoneIcon width={20} height={20} color="gray" />
        </div>
        <input
          placeholder="+84 123 456 789"
          {...(rest as any)}
          {...field}
          onChange={(e) => onValueChange(e.target.value)}
          className={`bg-gray-100 text-gray-700  w-80 h-10 text-sm ml-1 px-1 focus:bg-blue-50 rounded-lg`}
        />
      </div>
      {isError && (
        <p className="text-blue-500 text-xs font-semibold mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default InputPhoneNumber;
