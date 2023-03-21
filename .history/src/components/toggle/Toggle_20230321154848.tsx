import React from "react";

type Props = {
  handleToggle: () => void;
};

const Toggle = ({ handleToggle }: Props) => {
  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        onChange={() => {}}
        onClick={handleToggle}
      />
      <div
        className={`inline-block w-[100px] h-[50px] relative rouned-full p-1 cursor-pointer transition-all bg-gray-300`}
      ></div>
    </label>
  );
};

export default Toggle;
