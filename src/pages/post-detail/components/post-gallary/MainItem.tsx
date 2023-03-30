import React from "react";

type Props = {
  src: string;
};

const MainItem = (props: Props) => {
  const { src } = props;

  return (
    <div className="box-center p-3">
      <img
        src={`${src}`}
        alt=""
        className="w-[444px] h-[444px] rounded-sm cursor-pointer"
      />
    </div>
  );
};

export default MainItem;
