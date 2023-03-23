import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

const Button = ({
  type = "button",
  children,
  onClick = () => {},
  ...props
}: ButtonProps) => {
  const { isloading, classnames } = props;

  const child =
    isloading == "true" ? (
      <div className="rounded-full w-6 h-6 border-white border-4 border-l-transparent animate-spin"></div>
    ) : (
      children
    );

  let defaultClassName = `flex justify-center items-center text-base font-semibold text-white bg-primary rounded-xl transition-all duration-100 px-3 ${
    props.heigth || "h-12"
  }`;

  return (
    <button
      className={`${defaultClassName} ${
        classnames || ""
      } disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {child}
    </button>
  );
};

export default Button;
