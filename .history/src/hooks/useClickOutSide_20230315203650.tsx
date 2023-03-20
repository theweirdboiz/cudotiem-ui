import React, { useState, useRef, useEffect } from "react";

const useClickOutside = (dom = "button"): any => {
  const [open, setOpen] = useState(false);
  console.log(open);

  const nodeRef: any = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      let input = e.target as HTMLInputElement;
      if (
        nodeRef.current &&
        !nodeRef.current.contains(input) &&
        !input.matches(dom)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return {
    open,
    setOpen,
    nodeRef,
  };
};

export default useClickOutside;
