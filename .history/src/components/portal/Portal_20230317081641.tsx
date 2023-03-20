import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: object;
  bodyStyle?: object;
  handleClose?: () => {};
  visible?: false;
  children?: ReactNode;
};

const createPortalWrapper = () => {
  const div = document.createElement("div");
  div.id = "portal-wrapper";
  return div;
};

const portalWrapperElm = createPortalWrapper();

const Portal = (props: Props) => {
  useEffect(() => {
    document.body.appendChild(portalWrapperElm);
  }, []);

  const renderContent = (
    <div
      className={`fixed inset-0 z-[999] ${props.containerClass}`}
      style={props.containerStyle}
    >
      <div
        className="overlay absolute inset-0 bg-black bg-opacity-25"
        onClick={props.handleClose}
      ></div>
      <div
        className={`relative z-20 content ${props.bodyClass}`}
        style={props.bodyStyle}
      >
        {props.children}
      </div>
    </div>
  );

  return createPortal(renderContent, portalWrapperElm);
};

export default Portal;
