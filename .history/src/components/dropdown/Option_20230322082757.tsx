import React from "react";
import { useDropdown } from "./dropdown-context";

type Props = {
  [key: string]: any;
};

const Option = ({ ...props }: Props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  return <div>Option</div>;
};

export default Option;
