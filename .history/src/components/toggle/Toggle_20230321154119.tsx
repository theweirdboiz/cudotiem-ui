import React from "react";

type Props = {};

const Toggle = (handleToggle: () => {}) => {
  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        onChange={() => {}}
        onClick={handleToggle}
      />
      <div
        className={`inline-block w-[100px] h-[50px] relative rouned-full p-1 cursor-pointer transition-all`}
      ></div>
    </label>
  );
};

export default Toggle;
