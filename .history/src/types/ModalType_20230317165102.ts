import { ReactNode } from "react";

export type ModalType = {
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: object;
  bodyStyle?: object;
  handleClose?: () => {};
  visible?: false;
  overlay?: boolean;
  children?: ReactNode;
};
