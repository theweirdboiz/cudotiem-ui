import React, { useState } from "react";

type Props = {};

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const handleToggleValue = () => {
    setValue(!value);
  };
  return {
    value,
    handleToggleValue,
  };
};

export default useToggle;
