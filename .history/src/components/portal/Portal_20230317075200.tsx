import React, { useEffect } from "react";

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

  return <div>Portal</div>;
};

export default Portal;
