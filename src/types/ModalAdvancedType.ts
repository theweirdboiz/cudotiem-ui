import React, { ReactNode } from "react";

type ModalAdvancedProps = {
  children?: ReactNode;
  heading?: string;
  visible?: boolean;
  handleClose?: React.MouseEventHandler;
};
export default ModalAdvancedProps;
