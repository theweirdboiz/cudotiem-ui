import React from "react";
import { useDropdown } from "./dropdown-context";

type Props = {
  [key: string]: any;
};

const Select = ({ ...props }: Props) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      className={`flex-center justify-between py-3 px-4 bg-white border rounded-lg text-sm ${props.classname}`}
      onClick={toggle}
    >
      <span>{props.placeholder}</span>
    </div>
  );
};

export default Select;
