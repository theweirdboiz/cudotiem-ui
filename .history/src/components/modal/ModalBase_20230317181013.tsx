import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ModalBaseProps from "../../types/ModalBaseType";
import Portal from "../portal/Portal";

const ModalBase = (props: ModalBaseProps) => {
  const nodeRef = useRef(null);
  return (
    <>
      <CSSTransition
        in={false}
        classNames="zoom"
        timeout={250}
        unmountOnExit
        nodeRef={nodeRef}
      >
        gi z
      </CSSTransition>
      {/* <CSSTransition
        addEndListener={(node: HTMLElement, done: () => void) => {
          node.addEventListener("transitionend", done, false);
        }}
        in={props.visible}
        classNames="zoom"
        timeout={250}
        unmountOnExit
      >
        {(status) => (
          <Portal
            visible={status !== "exited"}
            handleClose={props.handleClose}
            containerClass="fixed z-[999] inset-0 block-center"
            bodyStyle={{ transition: "all 250ms" }}
            bodyClass={`relative z-10 content ${props.bodyClass}`}
          >
            {props.children}
          </Portal>
        )}
      </CSSTransition> */}
    </>
  );
};

export default ModalBase;
