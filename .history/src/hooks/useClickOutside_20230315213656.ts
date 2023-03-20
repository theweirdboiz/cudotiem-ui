import { useEffect, RefObject, useState } from "react";

type Event = MouseEvent | TouchEvent;

const useClickOutSide = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: Event) => void
) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const dom = ref?.current;
      if (!dom || dom.contains((e?.target as Node) || null)) {
        return;
      }
      handler(e);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, handler]);
  return {
    open,
    setOpen,
  };
};
export default useClickOutSide;
