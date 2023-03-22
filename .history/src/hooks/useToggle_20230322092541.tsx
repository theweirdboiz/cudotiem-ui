import { useState } from "react";

const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue);
  const handleToggle = () => {
    setValue(!value);
  };
  return { value, handleToggle };
};

export default useToggle;
