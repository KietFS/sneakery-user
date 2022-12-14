import { useField, useFormikContext } from "formik";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
} from "react";

interface IRichTextInputProps
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
}

const RichTextInput: React.FC<IRichTextInputProps> = (props) => {
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
          <p className="text-sm font-bold text-gray-600 mb-1 mr-1">{label}</p>
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
      <div
        className={`flex items-center bg-gray-100  py-1 rounded-lg h-10 focus-within:bg-blue-50 w-full`}
      >
        <input
          placeholder="abcdefg@gmail.com"
          {...(rest as any)}
          {...field}
          onChange={(e) => onValueChange(e.target.value)}
          className={`px-2 py-1  bg-gray-100 text-gray-700 rounded-lg w-full text-sm focus:bg-blue-50 outline-none ring-0 outline-white border-transparent focus:border-transparent focus:ring-0 focus:outline-transparent h-10`}
        />
      </div>
      {isError && (
        <p className="text-red-500 text-xs font-semibold mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default RichTextInput;
