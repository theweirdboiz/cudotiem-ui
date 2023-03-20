import React from "react";

type Props = {};

const ModalBase = (props: Props) => {
  const createPortalWrapper = () => {
    const div = document.createElement("div");
    div.id = "portal-wrapper";
    document.body.appendChild(div);
    return div;
  };

  return <div>ModalBase</div>;
};

export default ModalBase;
