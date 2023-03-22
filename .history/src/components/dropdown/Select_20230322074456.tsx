import React from "react";

type Props = {
  [key: string]: any;
};

const Select = (props: Props) => {
  return (
    <div
      className={`flex-center justify-between py-3 px-4 bg-white border rounded-lg text-sm ${props.classname}`}
    >
      Select
    </div>
  );
};

export default Select;
