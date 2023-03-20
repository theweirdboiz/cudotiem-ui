// import FormGroup from "components/form-group";

import React from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Input, Label, Dropdown } from "../../components";

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
        <div className="grid grid-cols-2 gap-3">
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
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            />
          </FormGroup>
          <FormGroup>
            <Dropdown
              control={control}
              setValue={setValue}
              name="category"
              dropdownLabel="Enter your category"
            ></Dropdown>
          </FormGroup>
        </div>
      </form>
    </>
  );
};

export default PostAddNewPage;
