import FormGroup from "../../components/form-group/FormGroup";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";

type Props = {};

const PostAddNewPage = (props: Props) => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      category: {},
      user: {},
    },
    mode: "all",
  });
  const watchStats = watch("status");
  const wathCategory = watch("category");

  return (
    <>
      <h1>Add new post</h1>
      <form action="">
        <FormGroup>
          <Label>Title</Label>
          <Input
            control={control}
            placeholder="Enter your title"
            name="title"
          />
        </FormGroup>
        <FormGroup>
          <Label>slug</Label>
          <Input control={control} placeholder="Enter your slug" name="slug" />
        </FormGroup>
      </form>
    </>
  );
};

export default PostAddNewPage;
