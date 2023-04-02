import React, { ReactNode } from "react";
import { PostStatus } from "~/config";
import { IconLabel } from "../icon";

type Props = {
  status: number;
};

const LabelStatus = (props: Props) => {
  let styleClassnames, text;
  switch (props.status) {
    case PostStatus.APPROVED:
      styleClassnames = "text-green-500";
      text = "Đã duyệt";
      break;
    case PostStatus.PENDING:
      styleClassnames = "text-yellow-500";
      text = "Đang xử lý";
      break;
    case PostStatus.REJECTED:
      text = "Từ chối";
      styleClassnames = "text-red-500";
      break;
    default:
      styleClassnames = "text-gray-500";
      break;
  }
  return (
    <div
      className={`inline-flex items-center gap-x-1 text-sm font-medium ${styleClassnames}`}
    >
      <IconLabel size="w-5 h-5" />
      <span>{text}</span>
    </div>
  );
};

export default LabelStatus;
