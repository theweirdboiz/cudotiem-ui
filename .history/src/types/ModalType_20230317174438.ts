import React, { ReactNode } from "react";

type ModalBaseProps = {
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: object;
  bodyStyle?: object;
  handleClose?: React.MouseEventHandler;
  visible?: false;
  overlay?: boolean;
  children?: ReactNode;
};

export default ModalBaseProps;
