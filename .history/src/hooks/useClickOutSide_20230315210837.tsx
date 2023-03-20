import React, { useState, useRef, useEffect } from "react";

export default function useClickOutside(dom = "") {
  const [open, setOpen] = useState(false);

  const nodeRef = React.useRef<HTMLInputElement>(null);

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
}
