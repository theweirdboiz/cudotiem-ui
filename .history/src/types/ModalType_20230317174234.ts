import { ReactNode } from "react";

type ModalBaseProps = {
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: object;
  bodyStyle?: object;
  handleClose?: Function;
  visible?: void;
  overlay?: boolean;
  children?: ReactNode;
};

export default ModalBaseProps;
