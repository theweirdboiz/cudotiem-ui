import React from "react";
import { SpinnerProps } from "./type";

const Spinner = ({
  className = "w-6 h-6 border-white",
  style,
}: SpinnerProps) => {
  const defaultClass =
    "rounded-full border-current border-4 border-l-transparent animate-spin";
  return <div style={style} className={`${defaultClass} ${className}`}></div>;
};

export default Spinner;
