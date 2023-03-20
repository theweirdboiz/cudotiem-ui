import { RefObject } from "react";

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {};

export default useOnClickOutside;
