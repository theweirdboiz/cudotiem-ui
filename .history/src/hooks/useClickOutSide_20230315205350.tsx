import React, { useState, useRef, useEffect } from "react";

const useClickOutside = () => {
  const [open, setOpen] = useState<Boolean | null>(false);
  console.log(open);

  const nodeRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      let input = e.target as HTMLInputElement;
      if (
        nodeRef.current &&
        !nodeRef.current.contains(input)
        // !input.matches(dom)
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
