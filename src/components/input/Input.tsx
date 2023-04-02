import React from "react";
import { useController } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types";

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
  error,
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
        placeholder={placeholder}
        className={`w-full transition-all duration-150  rounded-md py-3 px-4 border border-current ${
          children && "pr-12"
        } font-medium text-sm 
        ${error && "text-red-500"} `}
        {...field}
        {...props}
      />
      <h4
        className={`${
          error ? "opacity-100 visible" : "opacity-0 invisible"
        } absolute text-sm text-red-400 error-input pointer-events-none bg-white w-[calc(100%-50px)]`}
      >
        {error}
      </h4>
      {children && (
        <span className="absolute top-2/4 -translate-y-1/2 right-4 text-text-4 cursor-pointer select-none">
          {children}
        </span>
      )}
    </div>
  );
};

export default Input;
