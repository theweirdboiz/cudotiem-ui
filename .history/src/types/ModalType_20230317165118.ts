import { ReactNode } from "react";

type ModalType = {
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: object;
  bodyStyle?: object;
  handleClose?: () => {};
  visible?: false;
  overlay?: boolean;
  children?: ReactNode;
};

export default ModalType;
