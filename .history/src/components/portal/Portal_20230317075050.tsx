import React from "react";

type Props = {};

const createPortalWrapper = () => {
  const div = document.createElement("div");
  div.id = "portal-wrapper";
  document.body.appendChild(div);
  return div;
};

const portalWrapperElm = createPortalWrapper();

const Portal = (props: Props) => {
  return <div>Portal</div>;
};

export default Portal;
