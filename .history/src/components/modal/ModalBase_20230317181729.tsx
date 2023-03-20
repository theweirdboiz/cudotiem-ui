import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ModalBaseProps from "../../types/ModalBaseType";
import Portal from "../portal/Portal";

const ModalBase = (props: ModalBaseProps) => {
  console.log(props.visible);

  return (
    <>
      <Portal
        visible={props.visible}
        handleClose={props.handleClose}
        containerClass="fixed z-[999] inset-0 block-center"
        bodyStyle={{ transition: "all 250ms" }}
        bodyClass={`relative z-10 content ${props.bodyClass}`}
      >
        {props.children}
      </Portal>
    </>
  );
};

export default ModalBase;
