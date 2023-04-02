import React, { ReactNode, FC, HTMLProps } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  htmlFor?: string;
}

const Label: FC<LabelProps> = ({
  htmlFor = "",
  className = "",
  children,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium cursor-pointer inline-block ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
