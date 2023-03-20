import React from "react";
import { useController } from "react-hook-form";

type InputProps = {
  control?: any;
  placeholder?: string;
  children?: React.ReactNode;
  error?: string;
  [key: string]: any;
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
        className={`w-full transition-all duration-150 border rounded-xl py-4 px-6 font-medium text-sm text-gray-600 focus:border-blue-400
        ${error.length > 0 ? "border-red-400 text-red-400" : "border-gray-300"}
        `}
        {...field}
        {...props}
      />
      {error.length >= 0 && (
        <h4 className="text-sm font-medium text-red-400 absolute top-2/4 -translate-y-1/2 left-6 error-input pointer-events-none bg-white w-[calc(100%-50px)]">
          {error}
        </h4>
      )}
      {children && (
        <span className="absolute top-2/4 -translate-y-1/2 right-6 text-text-4 cursor-pointer select-none">
          {children}
        </span>
      )}
    </div>
  );
};

export default Input;
