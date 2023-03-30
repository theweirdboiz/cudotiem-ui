import React from "react";

type Props = {
  src: string;
  onClick: (src: string) => void;
};

const SubItem = (props: Props) => {
  const { src, onClick } = props;
  return (
    <img
      src={src}
      alt=""
      className="w-[88px] h-[110px] rounded-sm cursor-pointer"
      onClick={() => onClick(src)}
    />
  );
};

export default SubItem;
