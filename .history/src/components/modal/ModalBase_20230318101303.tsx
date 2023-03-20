import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ModalBaseProps from "../../types/ModalBaseType";
import Portal from "../portal/Portal";

const ModalBase = (props: ModalBaseProps) => {
  return (
    <>
      <CSSTransition
        in={props.visible}
        timeout={300}
        classNames="zoom"
        unmountOnExit
      >
        {(status) => (
          <Portal
            visible={status !== "exited"}
            handleClose={props.handleClose}
            containerClass={`fixed z-[999] inset-0 box-center`}
            bodyStyle={{ transition: "all 250ms" }}
            bodyClass={`relative z-10 content w-[450px] bg-white ${props?.bodyClass}`}
          >
            {props.children}
          </Portal>
        )}
      </CSSTransition>
    </>
  );
};

export default ModalBase;
