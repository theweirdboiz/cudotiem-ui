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
      className={`text-sm font-medium text-text-2 dark:text-text-3 cursor-pointer inline ${props.className}`}
    >
      {props.children}
    </label>
  );
};

export default Label;
