import React, { InputHTMLAttributes } from "react";
import { useDropdown } from "./dropdown-context";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const Search = ({ placeholder, ...props }: SearchProps) => {
  const { toggle } = useDropdown();
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="p-4 outline-none w-full border border-gray-200 rounded"
        onChange={toggle}
        {...props}
      />
    </div>
  );
};

export default Search;
