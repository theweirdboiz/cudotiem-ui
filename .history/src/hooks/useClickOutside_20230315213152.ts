import { useEffect, RefObject } from "react";

type Event = MouseEvent | TouchEvent;

const useClickOutSide = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: Event) => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const dom = ref?.current;
      if (!dom || dom.contains((e?.target as Node) || null)) {
        return;
      }
      handleClickOutside(e);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, handler]);
};
export default useClickOutSide;
