import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const PostAddNewPage = (props: Props) => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      status: "",
      category: "",
    },
    mode: "all",
  });
  return <div></div>;
};

export default PostAddNewPage;
