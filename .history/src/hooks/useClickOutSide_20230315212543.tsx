import { RefObject, useEffect, useState } from "react";

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
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
