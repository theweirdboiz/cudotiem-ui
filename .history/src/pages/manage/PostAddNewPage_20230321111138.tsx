// import FormGroup from "components/form-group";

import React, { useState } from "react";
import slugify from "react-slugify";
import { useForm } from "react-hook-form";
import {
  FormGroup,
  Input,
  Label,
  Dropdown,
  Radio,
  Button,
  UploadImg,
} from "../../components";
import { postStatus } from "../../config/constant";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useUploadImg from "../../hooks/useUploadImg";
import { PostAddType } from "../../types/PostAddType";

const schema = yup.object().shape({
  title: yup.string().required("This field is required"),
  slug: yup.string().required("This field is required"),
});

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

const defaultValues = {
  title: "",
  slug: "",
  status: 2,
  hot: false,
  image_name: "",
  category: {},
  user: {},
};
const PostAddNewPage = () => {
  const { control, watch, setValue, handleSubmit, getValues } =
    useForm<PostAddType>({
      defaultValues: defaultValues,
      mode: "all",
      resolver: yupResolver(schema),
    });

  const watchStatus = watch("status");

  const wathCategory = watch("category");

  // handle event
  const onSubmit = async (value: any) => {
    const cloneValue = { ...value };
    cloneValue.slug = slugify(value.slug || value.title);
    cloneValue.status = Number(value.status);
    console.log(cloneValue);
  };
  const { progress, image, onSelectImg, handleDeleteImg } = useUploadImg({
    setValue,
    getValues,
  });
  return (
    <>
      <h1 className="mb-5 text-xl font-bold">Add new post</h1>
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
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            />
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Dropdown
              control={control}
              setValue={setValue}
              name="category"
              dropdownLabel="Enter your category"
              data={dropdownData}
            ></Dropdown>
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <div className="flex gap-x-6">
              <Radio
                id="approved"
                control={control}
                name="status"
                value={postStatus.APPROVED}
                checked={Number(watchStatus) === Number(postStatus.APPROVED)}
              >
                Approved
              </Radio>
              <Radio
                id="pending"
                control={control}
                name="status"
                value={postStatus.PENDING}
                checked={Number(watchStatus) === Number(postStatus.PENDING)}
              >
                Pending
              </Radio>
              <Radio
                id="reject"
                control={control}
                name="status"
                value={postStatus.REJECTED}
                checked={Number(watchStatus) === postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>Image</Label>
            <UploadImg
              name="image_name"
              onChange={onSelectImg}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImg}
            ></UploadImg>
          </FormGroup>
          <Button type="submit">Add Post</Button>
        </div>
      </form>
    </>
  );
};

export default PostAddNewPage;
