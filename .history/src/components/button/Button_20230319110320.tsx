import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  kind?: "primary" | "secondary" | "ghost";
  href?: string;
  [key: string]: any;
}

const Button = ({
  type = "button",
  children,
  className = "",
  onClick = () => {},
  ...props
}: ButtonProps) => {
  const { isLoading } = props;
  const child = isLoading ? (
    <div className="rounded-full w-6 h-6 border-4 border-l-transparent animate-spin"></div>
  ) : (
    children
  );

  let defaultClassName =
    "flex justify-center items-center p-3 text-base font-semibold  rounded-xl";

  // switch (props.kind) {
  //   case "primary":
  //     defaultClassName += " bg-primary text-white";
  //     break;
  //   case "secondary":
  //     defaultClassName += " bg-secondary text-white";
  //     break;
  //   case "ghost":
  //     defaultClassName += " bg-primary bg-opacity-20 text-white";
  //     break;
  // }

  // link
  // if (props.href) {
  //   return (
  //     <Link to={props.href} className={`${defaultClassName} ${className}`}>
  //       {child}
  //     </Link>
  //   );
  // }
  // else button
  console.log(props);

  return (
    <button
      className={`${defaultClassName}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {child}
      {/* {child} */}
    </button>
  );
};

export default Button;
