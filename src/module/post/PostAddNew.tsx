import React, { useEffect, useState } from "react";
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
  Toggle,
} from "~/components";
import useUploadImg from "~/hooks/useUploadImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { PostType } from "~/types/PostType";
import { postStatus } from "~/config/constant";
import { CategoryType } from "~/types/CategoryType";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";

const schema = yup.object().shape({
  title: yup.string().required("This field is required"),
  slug: yup.string().required("This field is required"),
});

const category = [
  {
    id: 1,
    name: "category 1",
    status: 2,
    slug: "frontedn-a",
  },
  {
    id: 2,
    name: "category 2",
    status: 2,
    slug: "frontedn-22",
  },
  {
    id: 3,
    name: "category 3",
    status: 3,
    slug: "frontedn-a",
  },
];

const defaultValues = {
  title: "",
  slug: "",
  status: 2,
  hot: false,
  image_name: "",
  categoryId: "",
  userId: "",
};
const PostAdd = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<PostType>({
    defaultValues: defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { progress, image, onSelectImg, handleDeleteImg, handleResetUpload } =
    useUploadImg({
      setValue,
      getValues,
    });

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categorySelected, setCategorySelected] = useState<string | null>("");

  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const wathCategory = watch("categoryId");

  // handle event
  const onSubmit = async (value: any) => {
    const cloneValue = { ...value };
    cloneValue.slug = slugify(value.slug || value.title);
    cloneValue.status = Number(value.status);
    cloneValue.createAt = new Date().getTime();
    await new Promise((res) => setTimeout(res, 1000));
    console.log(cloneValue);
    toast.success("Tạo tin thành công, vui lòng đợi duyệt!");
    handleResetUpload();
    setCategorySelected(null);
    reset(defaultValues);
  };

  const handleClickOption = (item: any) => {
    setValue("categoryId", String(item.id));
    setCategorySelected(item.name);
  };

  // api
  useEffect(() => {
    setCategories(category);
  }, []);

  useEffect(() => {
    document.title = "Cụ Đồ Tiễm - Thêm tin đăng";
  }, []);
  return (
    <>
      <DashboardHeading>Add new post</DashboardHeading>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <FormGroup>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
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
            <Label>Image</Label>
            <UploadImg
              name="image_name"
              onChange={onSelectImg}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImg}
            ></UploadImg>
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={
                  categorySelected ? categorySelected : "Select the category"
                }
              />
              <Dropdown.List>
                {categories.map((item) => (
                  <Dropdown.Option onClick={() => handleClickOption(item)}>
                    {item.name}
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
              <span></span>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label>Is hot?</Label>
            <Toggle
              name="hot"
              on={String(watchHot)}
              handleToggle={() => setValue("hot", !watchHot)}
            />
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
          <Button
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
            }}
            type="submit"
            isloading={String(isSubmitting)}
            disabled={!isValid}
            classnames={
              isSubmitting ? "bg-gray-200 text-gray-700 cursor-not-allowed" : ""
            }
          >
            Add Post
          </Button>
        </div>
      </form>
    </>
  );
};

export default PostAdd;
