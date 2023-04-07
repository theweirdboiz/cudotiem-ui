import React, { ChangeEvent, useEffect, useState } from "react";
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
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCategory } from "~/contexts";
import { toast } from "react-toastify";
import { PostType } from "~/types/PostType";
import { PostStatus, POST_DEFAULT_VALUE } from "~/config/constant";
import { createPost } from "~/services";
import { useFirebaseImage } from "~/hooks";
import { log } from "console";
import Image from "~/components/image/Image";

type FormStateType = Omit<PostType, "id">;

const schema = yup.object().shape({
  title: yup.string().required("Không bỏ trống trường này"),
});

const PostAdd = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (body: FormStateType) => {
      return createPost(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
  });
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<PostType>({
    defaultValues: POST_DEFAULT_VALUE,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { categories } = useCategory();
  const [images, setImages] = useState([]);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const {
    handleDeleteImage,
    handleUploadImage,
    paths,
    process,
    handleResetUpload,
  } = useFirebaseImage("/posts");
  // api
  useEffect(() => {
    document.title = "Cụ Đồ Tiễm - Thêm tin đăng";
  }, []);

  const watchStatus = watch("status");
  const watchHot = watch("hot");

  // handle event
  const onSubmit = async (body: FormStateType) => {
    body.status = Number(body.status);
    body.images = paths;
    body.categoryId = Number(body.categoryId);
    try {
      mutate(body);
      reset(POST_DEFAULT_VALUE);
      setCategorySelected("");
      handleResetUpload();
      toast.success("Thêm Post mới thành công!");
    } catch {
      toast.error("Thêm Post không thành công, hãy thử lại");
    }
  };

  const handleClickOption = (item: any) => {
    setValue("categoryId", item.id);
    setCategorySelected(item.name);
  };

  return (
    <>
      <DashboardHeading>Tạo tin đăng</DashboardHeading>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <FormGroup>
            <Label className={`${errors.title && "text-red-400"}`}>
              Tiêu đề
            </Label>
            <Input
              control={control}
              placeholder="Tiêu đề tin đăng"
              name="title"
              error={errors.title?.message}
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
            <Label>Hình ảnh</Label>
            <input type="file" multiple onChange={handleUploadImage} />
          </FormGroup>
          <FormGroup>
            <Label>Danh mục</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={
                  categorySelected ? categorySelected : "Chọn danh mục"
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
            <Label>Tin nổi bật</Label>
            <Toggle
              name="hot"
              on={watchHot}
              handleToggle={() => setValue("hot", !watchHot)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Trạng thái</Label>
            <div className="flex gap-x-6">
              <Radio
                id="approved"
                control={control}
                name="status"
                value={PostStatus.APPROVED}
                checked={Number(watchStatus) === Number(PostStatus.APPROVED)}
              >
                Đã duyệt
              </Radio>
              <Radio
                id="pending"
                control={control}
                name="status"
                value={PostStatus.PENDING}
                checked={Number(watchStatus) === Number(PostStatus.PENDING)}
              >
                Đang xử lý
              </Radio>
              <Radio
                id="reject"
                control={control}
                name="status"
                value={PostStatus.REJECTED}
                checked={Number(watchStatus) === PostStatus.REJECTED}
              >
                Từ chối
              </Radio>
            </div>
          </FormGroup>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {paths?.map((path) => (
            <Image
              name="image"
              onChange={handleUploadImage}
              process={process}
              path={path}
              handleDeleteImage={handleDeleteImage}
            ></Image>
            // <UploadImg
            //   name="image"
            //   onChange={handleUploadImage}
            //   process={process}
            //   path={path}
            //   handleDeleteImage={handleDeleteImage}
            // />
          ))}
        </div>
        <Button
          style={{
            width: "100%",
            maxWidth: "50%",
            margin: "0 auto",
          }}
          height="h-10"
          type="submit"
          isloading={isSubmitting}
          disabled={!isValid}
        >
          Add Post
        </Button>
      </form>
    </>
  );
};

export default PostAdd;
