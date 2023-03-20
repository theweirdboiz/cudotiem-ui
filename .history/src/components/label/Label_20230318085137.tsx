import React, { ReactNode } from "react";

type LabelProp = {
  children?: ReactNode;
  htmlFor?: string;
};

const Label = (props: LabelProp) => {
  return <div>Label</div>;
};

export default Label;
