import React from "react";
import { useController } from "react-hook-form";

interface InputProps {
  control: any;
  type?: string;
  error?: string;
  children?: React.ReactNode;
  name: string;
  [key: string]: any;
}
const Input = ({
  control,
  error = "",
  type = "text",
  placeholder,
  children,
  name,
  ...props
}: InputProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        placeholder={`${error.length < 1 ? placeholder : ""}`}
        className={`w-full transition-all duration-150 border border-current rounded-xl py-4 px-6 text-gray-300 ${
          children && "pr-12"
        } font-medium text-sm 
        ${error.length > 0 ? "text-red-400" : "text-blue-400"}
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
        <span className="absolute top-2/4 -translate-y-1/2 right-4 text-text-4 cursor-pointer select-none">
          {children}
        </span>
      )}
    </div>
  );
};

export default Input;
