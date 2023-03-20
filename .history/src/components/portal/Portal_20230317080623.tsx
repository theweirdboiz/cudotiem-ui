import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {};

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

  const renderContent = <div className="fixed inset-0 z-[999]"></div>;

  return createPortal(renderContent, portalWrapperElm);
};

export default Portal;
