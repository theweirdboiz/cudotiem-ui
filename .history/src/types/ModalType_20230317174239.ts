import { ReactNode } from "react";

type ModalBaseProps = {
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: object;
  bodyStyle?: object;
  handleClose?: void;
  visible?: false;
  overlay?: boolean;
  children?: ReactNode;
};

export default ModalBaseProps;
