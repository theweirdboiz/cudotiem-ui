import React, { ReactNode } from "react";

type LabelProp = {
  children?: ReactNode;
  htmlFor?: string;
  className?: string;
};

const Label = (props: LabelProp) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={`text-sm font-medium text-gray-900 cursor-pointer inline-block ${props.className}`}
    >
      {props.children}
    </label>
  );
};

export default Label;
