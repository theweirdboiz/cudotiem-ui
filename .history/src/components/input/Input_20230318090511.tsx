import React from "react";
import { useController } from "react-hook-form";

type InputProp = {
  control: any;
  error?: string;
  placeholder?: string;
  [key: string]: any;
};

const Input = (props: InputProp) => {
  const { field } = useController({
    control: props.control,
    name: props?.name,
  });
  return <div>Input</div>;
};

export default Input;
