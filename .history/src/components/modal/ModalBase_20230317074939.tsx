import React from "react";

type Props = {};

const ModalBase = (props: Props) => {
  const createPortalWrapper = () => {
    const div = document.createElement("div");
    div.id = "portal-wrapper";
    document.body.appendChild(div);
    return div;
  };

  const portalWrapperElm = createPortalWrapper();

  return <div>ModalBase</div>;
};

export default ModalBase;
