import React, { useState } from "react";

type Props = {};

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const handleToggle = () => {
    setValue(!value);
  };
  return {
    value,
    handleToggle,
  };
};

export default useToggle;
