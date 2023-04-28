import { useEffect } from "react";
import { createPortal } from "react-dom";
import ModalType from "../../types/ModalBaseType";

const createPortalWrapper = () => {
  const div = document.createElement("div");
  div.id = "portal-wrapper";
  return div;
};

const portalWrapperElm = createPortalWrapper();

const Portal = (props: ModalType) => {
  useEffect(() => {
    document.body.appendChild(portalWrapperElm);
  }, []);

  const renderContent = (
    <div className={`${props.containerClass}`} style={props.containerStyle}>
      <>
        <div
          className="overlay absolute inset-0 bg-black bg-opacity-10"
          onClick={props.handleClose}
        ></div>
        <div className={`${props.bodyClass}`} style={props.bodyStyle}>
          {props.children}
        </div>
      </>
    </div>
  );
  return createPortal(renderContent, portalWrapperElm);
};

export default Portal;
