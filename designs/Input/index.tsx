import { useField } from "formik";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

import { HidePasswordIcon, ShowPasswordIcon } from "./icons";

import {
  EventChange,
  FieldWrapper,
  IconWrapper,
  InputContainer,
  InputField,
  LabelWrapper,
} from "./styles";

import FormControlErrorHelper from "../../components/FormControlErrorHelper";
import FormControlLabel from "../../components/FormControlLabel";

interface IInput
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

const Input: React.FC<IInput> = (props) => {
  const {
    name,
    className,
    type = "text",
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
  const [field, meta] = useField(props);
  const [isShowPassword, setIsShowPassword] = useState(false);
  useEffect(() => {
    onChangeValue && onChangeValue(field.value || "");
  }, [field.value]);

  const isError: boolean = !!meta.touched && !!meta.error;

  return (
    <div className={`w-full ${isError ? "text-error-500" : "text-neutral-50"}`}>
      <LabelWrapper>
        <FormControlLabel
          subTitle={subLabel}
          isError={isError}
          required={required}
        >
          {label}
        </FormControlLabel>
        {hasEvent && (
          <EventChange
            onClick={() => {
              onClickEvent && onClickEvent();
            }}
          >
            Change
          </EventChange>
        )}
      </LabelWrapper>

      <FieldWrapper>
        <InputField
          type={isShowPassword ? "text" : type}
          isError={isError}
          isBorder={isBorder}
          autoComplete={autoComplete}
          {...field}
          {...(rest as any)}
        />
        {type === "password" && (
          <IconWrapper onClick={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </IconWrapper>
        )}
      </FieldWrapper>
      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </div>
  );
};

export default Input;
