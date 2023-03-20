import { useEffect, RefObject, useState } from "react";

type Event = MouseEvent | TouchEvent;

const useClickOutSide = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const dom = ref?.current;
      console.log(dom);

      if (dom && !dom.contains(e?.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return {
    open,
    setOpen,
  };
};
export default useClickOutSide;
