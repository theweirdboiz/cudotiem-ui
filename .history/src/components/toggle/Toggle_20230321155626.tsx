import React from "react";

type Props = {
  handleToggle: () => void;
  [key: string]: any;
};

const Toggle = ({ handleToggle, ...props }: Props) => {
  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        onChange={() => {}}
        onClick={handleToggle}
      />
      <div
        className={`inline-flex items-center w-20 h-10 relative rounded-full p-3 cursor-pointer transition-all bg-gray-300`}
        {...props}
      >
        <span
          className={`transition-all w-8 h-8 rounded-full inline-block bg-white`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
