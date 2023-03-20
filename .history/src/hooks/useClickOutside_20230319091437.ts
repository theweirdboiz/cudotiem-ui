import { useEffect, RefObject, useState } from "react";
import { useSearch } from "../contexts/searchContext";

type Event = MouseEvent | TouchEvent;

const useClickOutSide = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) => {
  const [open, setOpen] = useState(false);

  const { isOpen, setIsOpen } = useSearch();

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const dom = ref?.current;

      if (dom && !dom.contains(e?.target as Node)) {
        // setOpen(false);
        setIsOpen(false);
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
