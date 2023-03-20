import React, { useState } from "react";

const useClickOutside = (initialValue: boolean) => {
  const [open, setOpen] = useState(initialValue);
  console.log(open);

  return <div>useClickOutside</div>;
};

export default useClickOutside;
