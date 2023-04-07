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
import useFirebaseImage from "~/hooks/useFirebaseImage";
import slugify from "react-slugify";
import React, { useEffect, useState } from "react";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PostType } from "~/types/PostType";
import { ENV, PostStatus, POST_DEFAULT_VALUE } from "~/config/constant";
import { Editor } from "@tinymce/tinymce-react";
import { CategoryType } from "~/types/CategoryType";
import { HttpRequest } from "~/ultis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, updatePost } from "~/services";
type FormStateType = Omit<PostType, "id">;

const schema = yup.object().shape({
  title: yup.string().required("This field is required"),
  slug: yup.string().required("This field is required"),
});

const PostUpdate = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<PostType>({
    defaultValues: POST_DEFAULT_VALUE,
    mode: "all",
    resolver: yupResolver(schema),
  });

  // state
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [content, setContent] = useState("");
  const { path, process, setPath, handleDeleteImage, handleUploadImage } =
    useFirebaseImage("posts");
  // ultis
  const { id } = useParams();
  const queryClient = useQueryClient();
  useQuery({
    queryKey: ["post", id],
    queryFn: () => {
      return getPost(id as string);
    },
    enabled: id !== undefined,
    staleTime: 500,
    onSuccess: (data) => {
      console.log(data);
      setPath(data?.image as string);
      setContent(data?.content as string);
      reset(data);
      document.title = "Cụ Đồ Tiễm - Thêm tin đăng";
    },
  });

  const watchStatus = watch("status");
  const watchHot = watch("hot");

  // handle events

  const onSubmit = async (body: FormStateType) => {
    body.slug = slugify(body.slug || body.title);
    body.status = Number(body.status);
    body.content = content;
    body.image = path;
    try {
      updatePostMutation.mutate(body, {
        onSuccess: () => {
          toast.success("Cập nhật tin thành công");
          console.log(body);
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật tin đăng không thành công, hãy thử lại");
    }
  };

  const updatePostMutation = useMutation({
    mutationFn: (body: FormStateType) => updatePost(id as string, body),
    onSuccess: (data) => {
      queryClient.setQueryData(["post", id], data);
    },
  });

  const handleClickOption = (item: any) => {
    setValue("categoryId", item.id);
    setCategorySelected(item.name);
  };
  const handleEditorChange = (content: string) => {
    setContent(content);
  };
  const handleImageUpload = async (blobInfo: any) => {
    const formData = new FormData();
    formData.append("image", blobInfo.blob());
    const response = await HttpRequest.post<any>(
      `${import.meta.env.VITE_IMGBB_URL}?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.url;
  };
  // api

  return (
    <>
      <DashboardHeading>Cập nhật tin đăng</DashboardHeading>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <FormGroup>
            <Label>Tiêu đề</Label>
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
            <Label>Hình ảnh</Label>
            <UploadImg
              name="image"
              onChange={handleUploadImage}
              process={process}
              path={path}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
            ></UploadImg>
          </FormGroup>
          <FormGroup>
            <Label>Danh mục</Label>
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
                Bị từ chối
              </Radio>
            </div>
          </FormGroup>
        </div>
        <FormGroup>
          <Label>Thông tin chi tiết</Label>
        </FormGroup>
        <FormGroup>
          <Label>Mô tả sản phẩm</Label>
          <div className="entry-content">
            <Editor
              apiKey={ENV.TINY_MCE_KEY}
              value={content}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "editimage",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                images_upload_handler: handleImageUpload,
                content_css: "",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </FormGroup>
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
          classnames={
            isSubmitting
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "text-blue-500 hover:bg-blue-100"
          }
        >
          Cập nhật tin đăng
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
