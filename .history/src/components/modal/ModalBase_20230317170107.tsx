import React from "react";
import { CSSTransition } from "react-transition-group";
import ModalType from "../../types/ModalType";

const ModalBase = (props: ModalType) => {
  return (
    <>
      <CSSTransition<undefined>
        in={props.visible}
        classNames="zoom"
        unmountOnExit
      ></CSSTransition>
    </>
  );
};

export default ModalBase;
