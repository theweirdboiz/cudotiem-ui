import React from "react";

type Props = {
  handleToggle: () => void;
  [key: string]: any;
};

const Toggle = ({ handleToggle, ...props }: Props) => {
  console.log(props);

  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        onChange={() => {}}
        onClick={handleToggle}
      />
      <div
        className={`inline-block w-[80px] h-[35px] relative rounded-full p-1 cursor-pointer transition-all bg-gray-300`}
      >
        <span></span>
      </div>
    </label>
  );
};

export default Toggle;
