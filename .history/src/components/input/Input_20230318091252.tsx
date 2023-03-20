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
  return (
    <div className="relative">
      <input
        id={props.name}
        placeholder={props.placeholder}
        className={`w-full border dark:border-darkStroke rounded-xl py-4 px-6 font-medium text-sm dark:text-white placeholder:text-text-4`}
      />
    </div>
  );
};

export default Input;
