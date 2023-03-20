import React from "react";
import { useController } from "react-hook-form";

type InputProp = {
  control: any;
  error?: string;
  placeholder?: string;
  rest?: object;
};

const Input = (props: InputProp) => {
  const { field } = useController({});
  return <div>Input</div>;
};

export default Input;
