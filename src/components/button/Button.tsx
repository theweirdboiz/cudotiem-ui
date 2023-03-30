import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { ButtonProps } from "./type";

const Button = ({
  type = "button",
  children,
  onClick = () => {},
  ...props
}: ButtonProps) => {
  const { isloading, classnames, to, height, style } = props;

  const child = isloading ? <Spinner /> : children;

  let defaultClassName = `flex justify-center items-center text-sm border border-current font-medium bg-white rounded-md transition-all duration-100 px-3 ${
    height || "h-8"
  }`;
  if (to) {
    return (
      <Link
        to={to}
        className={`${defaultClassName} !${
          classnames || ""
        } disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700`}
        type={type}
        onClick={onClick}
      >
        {child}
      </Link>
    );
  }
  return (
    <button
      style={style}
      className={`${defaultClassName} ${
        classnames || ""
      } disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700`}
      type={type}
      onClick={onClick}
    >
      {child}
    </button>
  );
};

export default Button;
