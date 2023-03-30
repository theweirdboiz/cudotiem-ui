import React from "react";
import { Button } from "~/components";
import { IconHeart, IconSecurity } from "~/components/icon";

type Props = {};

const PostMeta = (props: Props) => {
  return (
    <div className="infor flex-1 py-3">
      <h3 className="text-2xl uppercase mb-3">
        Không phải sói cũng đừng là cừu
      </h3>
      <span className="text-red-500 font-semibold text-3xl">85.000 đ</span>
      <Button
        type="button"
        height="h-10"
        classnames="text-red-300 bg-red-500 border border-current flex-center gap-x-1 hover:bg-red-300 my-3"
      >
        <IconHeart />
        Lưu tin
      </Button>
      <div className="flex-center text-gray-500">
        <IconSecurity />
        <span className="italic">Tin đã được kiểm duyệt</span>
      </div>
    </div>
  );
};

export default PostMeta;
