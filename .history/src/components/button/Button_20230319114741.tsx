import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  kind?: "primary" | "secondary" | "ghost";
  href?: string;
  [key: string]: any;
}

const Button = ({
  type = "button",
  children,
  onClick = () => {},
  ...props
}: ButtonProps) => {
  const { isLoading } = props;
  const child = isLoading ? (
    <div className="rounded-full w-6 h-6 border-white border-4 border-l-transparent animate-spin"></div>
  ) : (
    children
  );

  let defaultClassName =
    "flex justify-center items-center p-3 text-base font-semibold  rounded-xl transition-all duration-100";

  return (
    <button
      className={`${defaultClassName} disabled:pointer-events-none bg-gray-200 text-gray-700`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {child}
    </button>
  );
};

export default Button;
