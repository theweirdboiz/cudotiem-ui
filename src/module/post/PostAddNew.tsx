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
import { PostStatus, POST_DEFAULT_VALUE } from "~/config/constant";
import { CategoryType } from "~/types/CategoryType";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import httpRequest from "~/ultis/httpRequest";

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
    defaultValues: POST_DEFAULT_VALUE,
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

  // handle event
  const onSubmit = async (value: any) => {
    const postValue = { ...value };
    postValue.slug = slugify(value.slug || value.title);
    postValue.status = Number(value.status);
    postValue.image = image;
    try {
      await httpRequest.post("/posts", postValue);
      handleResetUpload();
      toast.success("Thêm Post mới thành công!");
      reset(POST_DEFAULT_VALUE);
    } catch (error) {
      console.log(error);
      toast.error("Thêm Post không thành công, hãy thử lại");
    }
    setCategorySelected(null);
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
              name="image"
              onChange={onSelectImg}
              progress={progress}
              imageLink={image}
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
                  <Dropdown.Option
                    key={item.id}
                    onClick={() => handleClickOption(item)}
                  >
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
                value={PostStatus.APPROVED}
                checked={Number(watchStatus) === Number(PostStatus.APPROVED)}
              >
                Approved
              </Radio>
              <Radio
                id="pending"
                control={control}
                name="status"
                value={PostStatus.PENDING}
                checked={Number(watchStatus) === Number(PostStatus.PENDING)}
              >
                Pending
              </Radio>
              <Radio
                id="reject"
                control={control}
                name="status"
                value={PostStatus.REJECTED}
                checked={Number(watchStatus) === PostStatus.REJECTED}
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
