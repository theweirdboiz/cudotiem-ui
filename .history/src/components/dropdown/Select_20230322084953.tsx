import React from "react";
import { useDropdown } from "./dropdown-context";

interface SelectProps {
  [key: string]: any;
}

const Select: React.FC<SelectProps> = ({ ...props }) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      className={`flex-center justify-between py-4 px-6 bg-white border border-blue-400 rounded-lg text-sm cursor-pointer ${props.classname}`}
      onClick={toggle}
    >
      <span>{props.placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;
