import slugify from "react-slugify";
import React, { useEffect, useState } from "react";
import httpRequest from "~/ultis/httpRequest";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFirebaseImage } from "~/hooks";
import { toast } from "react-toastify";
import { PostType } from "~/types/PostType";
import { postStatus, POST_DEFAULT_VALUE } from "~/config/constant";
import { Editor } from "@tinymce/tinymce-react";
import { CategoryType } from "~/types/CategoryType";

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
  const [categorySelected, setCategorySelected] = useState<string | null>("");
  const [content, setContent] = useState("");

  // ultis
  const [params] = useSearchParams();
  const postId = params.get("id");

  const { path, process, setPath, handleDeleteImage, handleUploadImage } =
    useFirebaseImage("posts");
  const watchStatus = watch("status");
  const watchHot = watch("hot");
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

  // handle events
  const handleEditorChange = (content: string) => {
    setContent(content);
  };
  const onSubmit = async (value: any) => {
    const postValue = { ...value };
    postValue.slug = slugify(value.slug || value.title);
    postValue.status = Number(value.status);
    postValue.image = path;
    try {
      await httpRequest.put(`/posts/${postId}`, postValue);
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
    const fetchPostDetail = async () => {
      const res = await httpRequest.get<PostType>(`/posts/${postId}`);
      reset(res);
      setPath(res.image);
      setCategorySelected(res.categoryId);
    };
    fetchPostDetail();
  }, [postId]);
  useEffect(() => {
    setCategories(category);
  }, []);

  useEffect(() => {
    document.title = "Cụ Đồ Tiễm - Thêm tin đăng";
  }, []);

  return (
    <>
      <DashboardHeading>Update post</DashboardHeading>
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
              onChange={handleUploadImage}
              process={process}
              path={path}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
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
        </div>
        <>
          <Editor
            apiKey={import.meta.env.VITE_TINY_MCE_KEY}
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </>
        <Button
          style={{
            width: "100%",
            maxWidth: "50%",
            margin: "0 auto",
          }}
          type="submit"
          isloading={String(isSubmitting)}
          disabled={!isValid}
          classnames={
            isSubmitting ? "bg-gray-200 text-gray-700 cursor-not-allowed" : ""
          }
        >
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
