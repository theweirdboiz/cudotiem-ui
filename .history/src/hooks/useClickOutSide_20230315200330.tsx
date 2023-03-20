import React, { useState } from "react";

type Props = {
  initialValue: boolean;
};

const useClickOutside = (props: Props) => {
  const [open, setOpen] = useState(props.initialValue);
  console.log(open);

  return <div>useClickOutside</div>;
};

export default useClickOutside;
