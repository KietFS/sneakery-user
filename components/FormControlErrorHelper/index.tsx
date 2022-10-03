import React, { ReactComponentElement, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const FormControlErrorHelper: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex items-center mt-1 text-14 text-red-500">
      {children}
    </div>
  );
};

export default FormControlErrorHelper;
