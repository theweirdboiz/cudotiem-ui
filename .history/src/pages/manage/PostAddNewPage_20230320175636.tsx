import FormGroup from "../../components/form-group/FormGroup";
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

  return (
    <>
      <h1>Add new post</h1>
      <form action="">
        <FormGroup></FormGroup>
      </form>
    </>
  );
};

export default PostAddNewPage;
