import React from "react";
import { useController } from "react-hook-form";

type InputProps = {
  control: any;
  error?: string;
  placeholder?: string;
  children?: React.ReactNode;
  name: string;
};

const Input = ({
  control,
  error = "",
  placeholder,
  children,
  ...props
}: InputProps) => {
  const { field } = useController({
    control: control,
    name: props?.name,
  });
  return (
    <div className="relative">
      <input
        id={props.name}
        placeholder={`${error.length < 1 ? placeholder : ""}`}
        className={`w-full border dark:border-darkStroke rounded-xl py-4 px-6 font-medium text-sm
        ${error.length > 0 ? "border-red-400 text-red-400" : "border-gray-300"}
        `}
      />
    </div>
  );
};

export default Input;
