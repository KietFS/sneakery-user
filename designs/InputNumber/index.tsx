import { useField, useFormikContext } from "formik";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
} from "react";
import { NumericFormat } from "react-number-format";

interface IInputNumberProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className?: string;
  label?: string | null;
  subLabel?: string;
  disabled?: boolean;
  requiblue?: boolean;
  placeholder?: string;
  hasEvent?: boolean;
  isBorder?: boolean;
  onClickEvent?: () => void;
  onChangeValue?: (value: string | number) => void;
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  bidError?: string;
}

const InputNumber: React.FC<IInputNumberProps> = (props) => {
  const {
    name,
    className,
    requiblue,
    label = null,
    subLabel = "",
    hasEvent = false,
    onClickEvent,
    autoComplete = "off",
    onChangeValue,
    isBorder = true,
    bidError = "",
    ...rest
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props.name);

  useEffect(() => {
    onChangeValue && onChangeValue(field.value);
  }, [field.value]);

  const isError: boolean = !!meta.touched && !!meta.error;

  const onValueChange = (amount: number) => {
    setFieldValue(name, amount);
  };

  return (
    <div
      className={`w-full rounded-sm ${
        isError ? "text-blue-500" : "text-neutral-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <p className="text-sm font-bold text-gray-600 mb-1 mr-1">{label}</p>
          {requiblue && <p className="text-blue-500 font-bold">*</p>}
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
        className={`flex w-full items-center bg-gray-100   py-1 rounded-lg h-10 focus-within:bg-blue-50 mt-1 ${className}`}
      >
        <NumericFormat
          placeholder="abcdefg@gmail.com"
          {...(rest as any)}
          {...field}
          allowLeadingZeros
          thousandSeparator=","
          type="text"
          value={field.value}
          name={props.name}
          onChange={(e) => onValueChange(e.target.value as any)}
          className={`bg-gray-100 text-gray-700  w-full h-10 text-sm ml-1 px-1 outline-none ring-0 outline-transparent border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent focus:bg-blue-50 rounded-lg`}
        />
      </div>
      {bidError && (
        <p className="text-red-500 text-xs font-semibold mt-1">{bidError}</p>
      )}
    </div>
  );
};

export default InputNumber;
