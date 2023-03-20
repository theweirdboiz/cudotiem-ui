import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  containerClass?: string;
  bodyClass?: string;
  containerStyle?: object;
  bodyStyle?: object;
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
    <div className="fixed inset-0 z-[999]">
      <div className="overlay absolute inset-0 bg-black bg-opacity-25"></div>
      <div className="relative z-20 content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
        perspiciatis doloremque repellat eligendi cum quis. Ipsam ab adipisci,
        dolor impedit repellat, iusto officia animi asperiores qui facilis
        aliquam? Consequatur, aut!
      </div>
    </div>
  );

  return createPortal(renderContent, portalWrapperElm);
};

export default Portal;
