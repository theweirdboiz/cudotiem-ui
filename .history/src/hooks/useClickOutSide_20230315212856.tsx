import { useEffect, RefObject } from "react";

// type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: Event) => void
) => {};
