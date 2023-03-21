import React from "react";

type Props = {
  handleToggle?: () => void;
  [key: string]: any;
};

const Toggle = ({ handleToggle, ...props }: Props) => {
  const on =
    props.on === "true" ? true : props.on === "false" ? false : undefined;
  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        onChange={() => {}}
        onClick={handleToggle}
      />
      <div
        className={`inline-flex items-center w-[72px] h-10 relative rounded-full p-2 cursor-pointer transition-all ${
          on ? "bg-primary" : "bg-gray-300"
        }`}
        {...props}
      >
        <span
          className={`transition-all w-7 h-7 rounded-full inline-block bg-white ${
            on ? "translate-x-full" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
