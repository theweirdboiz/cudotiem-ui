import React, { useState, useRef, useEffect,RefObject } from "react";


type Handler = (event: MouseEvent) => void


export default function useClickOutside<T extends HTMLElement = HTMLElement>(ref:RefObject<T>
  ,handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
  ):void{
  const [open, setOpen] = useState(false);

  const nodeRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      let input = e.target as HTMLInputElement;
      if (
        nodeRef.current &&
        !nodeRef.current.contains(input) &&
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
