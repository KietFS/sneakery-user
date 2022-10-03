import React, { ReactNode } from "react";

interface IFormLabelProps {
  children?: ReactNode;
  isError: boolean;
  required: boolean | undefined;
  htmlFor?: string;
  subTitle?: string | null;
}

const FormControlLabel: React.FC<IFormLabelProps> = ({
  children,
  required,
  htmlFor,
  isError,
  subTitle,
}) => {
  if (!children) return null;

  return (
    <div
      className={`block font-medium text-lg mb-0.5 ${
        isError ? "text-red-500" : "text-neutral-50"
      }`}
    >
      {children}
      {required && (
        <span className="text-12 font-semibold text-red-500 ml-0.5">*</span>
      )}
      {subTitle && (
        <span className="text-md ml-0.5 text-neutral-50 font-normal">
          {subTitle}
        </span>
      )}
    </div>
  );
};

export default FormControlLabel;
