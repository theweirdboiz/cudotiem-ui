import React from "react";
import { CSSTransition } from "react-transition-group";
import ModalType from "../../types/ModalType";
import Portal from "../portal/Portal";

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
      >
        <Portal
          visible={props.visible}
          handleClose={props.handleClose}
          containerClass="fixed z-[999] inset-0 block-center"
        >
          {props.children}
        </Portal>
      </CSSTransition>
    </>
  );
};

export default ModalBase;
