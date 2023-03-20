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
  const watchStats = watch("status");
  const wathCategory = watch("category");

  return <div></div>;
};

export default PostAddNewPage;
