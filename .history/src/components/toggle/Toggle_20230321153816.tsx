import React from "react";

type Props = {};

const Toggle = (props: Props) => {
  return (
    <label>
      <input type="checkbox" className="hidden" />
    </label>
  );
};

export default Toggle;
