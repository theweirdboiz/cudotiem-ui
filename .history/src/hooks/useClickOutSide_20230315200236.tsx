import React, { useState } from "react";

type Props = {
  initialValue: boolean;
};

const useClickOutSide = (props: Props) => {
  const [open, setOpen] = useState(props.initialValue);
  console.log(open);

  return <div>useClickOutSide</div>;
};

export default useClickOutSide;
