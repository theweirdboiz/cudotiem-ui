import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  kind?: "primary" | "secondary" | "ghost";
  href?: string;
}

const Button = ({
  type = "button",
  children,
  className = "",
  isLoading,
  onClick,
  ...rest
}: ButtonProps) => {
  const child = !!isLoading ? (
    <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-b-transparent animate-spin border-white"></div>
  ) : (
    children
  );

  let defaultClassName =
    "flex justify-center items-center p-3 text-base font-semibold  rounded-xl";

  switch (rest.kind) {
    case "primary":
      defaultClassName += " bg-primary text-white";
      break;
    case "secondary":
      defaultClassName += " bg-secondary text-white";
      break;
    case "ghost":
      defaultClassName += " bg-primary bg-opacity-20 text-white";
      break;
  }

  // link
  if (rest.href) {
    return (
      <Link to={rest.href} className={`${defaultClassName} ${className}`}>
        {child}
      </Link>
    );
  }
  // else button
  return (
    <button
      {...rest}
      className={`${defaultClassName}
        ${!!isLoading ? "bg-opacity-60 pointer-events-nones" : ""}
        ${className}`}
      type={type}
      onClick={onClick}
    >
      {child}
    </button>
  );
};

export default Button;
