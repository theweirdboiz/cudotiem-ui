import React, { ReactNode } from "react";
import { PostStatus, CategoryStatus, UserStatus } from "~/config";

type Props = {
  children: ReactNode;
  type: number;
};

const LabelStatus = (props: Props) => {
  let styleClassnames;
  switch (props.type) {
    case PostStatus.APPROVED:
      styleClassnames = "text-green-500 bg-green-100";
      break;
    case PostStatus.PENDING:
      styleClassnames = "text-yellow-500 bg-yellow-100";
      break;
    case PostStatus.REJECTED:
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
