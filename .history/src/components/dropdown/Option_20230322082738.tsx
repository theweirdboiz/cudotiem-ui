import React from "react";

type Props = {
  [key: string]: any;
};

const Option = ({ ...props }: Props) => {
  const { onClick } = props;
  return <div>Option</div>;
};

export default Option;
