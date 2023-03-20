// import FormGroup from "components/form-group";

import React from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Input, Label, Dropdown } from "../../components";

const dropdownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
  {
    id: 4,
    value: "constructor",
    text: "Constructor",
  },
];

const PostAddNewPage = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
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

  const onSubmit = (value: any) => console.log(value);

  return (
    <>
      <h1>Add new post</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
              data={dropdownData}
            ></Dropdown>
          </FormGroup>
        </div>
      </form>
    </>
  );
};

export default PostAddNewPage;
