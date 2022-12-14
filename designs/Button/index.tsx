import React from "react";

type IButtonVariant = "primary" | "secondary" | "red";
type IButtonType = "button" | "submit";

interface IButtonProps {
  onClick?: () => void;
  variant?: IButtonVariant;
  className?: string;
  type?: IButtonType;
  title?: string;
  isLoading?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    onClick,
    variant = "primary",
    className,
    type = "submit",
    title = "",
    isLoading = false,
  } = props;

  return (
    <button
      className={`items-center rounded-lg px-4 py-2 text-center w-fit flex hover:opacity-50 ${className} ${
        variant === "primary" && "bg-blue-500"
      } ${variant === "secondary" && "bg-white"}
      ${variant === "red" && "bg-red-500"} ${
        variant === "secondary" ? "text-blue-500" : "text-white"
      } border ${
        variant === "secondary" ? "border-blue-500" : "border-transparent"
      } font-semibold text-lg`}
      onClick={() => onClick?.()}
      type={type}
    >
      {isLoading ? (
        <>
          <div className="mr-2">{title}</div>
          ...
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
