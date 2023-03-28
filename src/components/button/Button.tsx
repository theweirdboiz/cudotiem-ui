import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { ButtonProps } from "./type";

const Button = ({
  type = "button",
  children,
  onClick = () => {},
  ...props
}: ButtonProps) => {
  const { isloading, classnames, to } = props;

  const child = isloading == "true" ? <Spinner /> : children;

  let defaultClassName = `flex justify-center items-center text-base font-semibold text-white bg-primary rounded-lg transition-all duration-100 px-3 ${
    props.heigth || "h-12"
  }`;
  if (to) {
    return (
      <Link
        to={to}
        className={`${defaultClassName} ${
          classnames || ""
        } disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700`}
        type={type}
        onClick={onClick}
        {...props}
      >
        {child}
      </Link>
    );
  }
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
