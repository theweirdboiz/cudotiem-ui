import React, { ReactNode } from "react";

type ModalAdvancedProps = {
  children?: ReactNode;
  heading?: string;
  visible?: false;
  handleClose?: React.MouseEventHandler;
};
export default ModalAdvancedProps;
