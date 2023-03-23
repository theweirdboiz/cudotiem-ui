import React, { ReactNode } from "react";
import { status } from "~/config";

type Props = {
  children: ReactNode;
  type: number;
};

const LabelStatus = (props: Props) => {
  console.log(typeof props.type);

  let styleClassnames;
  switch (props.type) {
    case status.APPROVED:
      styleClassnames = "text-green-500 bg-green-100";
      break;
    case status.PENDING:
      styleClassnames = "text-yellow-500 bg-yellow-100";
      break;
    case status.REJECTED:
      styleClassnames = "text-red-500 bg-red-100";
      break;
    default:
      styleClassnames = "text-gray-500 bg-gray-500";
      break;
  }
  return (
    <div
      className={`inline-block px-4 py-2.5 text-sm rounded-lg font-medium ${styleClassnames}`}
    >
      {props.children}
    </div>
  );
};

export default LabelStatus;
