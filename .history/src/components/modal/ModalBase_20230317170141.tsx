import React from "react";
import { CSSTransition } from "react-transition-group";
import ModalType from "../../types/ModalType";

const ModalBase = (props: ModalType) => {
  return (
    <>
      <CSSTransition
        addEndListener={(node: HTMLElement, done: () => void) => {
          node.addEventListener("transitionend", done, false);
        }}
        in={props.visible}
        classNames="zoom"
        unmountOnExit
      ></CSSTransition>
    </>
  );
};

export default ModalBase;
