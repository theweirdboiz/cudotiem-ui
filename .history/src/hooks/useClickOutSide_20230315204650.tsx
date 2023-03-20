import React, { useState, useRef, useEffect } from "react";

const useClickOutside = (dom = "button") => {
  const [open, setOpen] = useState<Boolean | null>(false);
  console.log(123);

  const nodeRef = React.useRef<
    HTMLElement | HTMLInputElement | React.LegacyRef<HTMLInputElement>
  >(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      let input = e.target as HTMLInputElement;
      if (nodeRef.current && !input.matches(dom)) {
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
  } as const;
};

export default useClickOutside;
