import slugify from "react-slugify";
import React, { useEffect, useState } from "react";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryType } from "~/types/CategoryType";
import { categoryStatus, CATEGORY_DEFAULT_VALUE } from "~/config";
import { Button, FormGroup, Input, Label, Radio } from "~/components";
import { useCategory } from "~/contexts/categoryContext";

type Props = {};

const CategoryUpdate = (props: Props) => {
  const schema = yup.object().shape({
    name: yup.string().required("This field is required"),
    // status: yup.string().required("This field is required"),
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<CategoryType>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: CATEGORY_DEFAULT_VALUE,
  });

  const watchStatus = watch("status");

  const [params] = useSearchParams();
  const categoryId = Number(params.get("id"));

  if (!categoryId) return null;

  const { categories, setCategories } = useCategory();

  const [category, setCategory] = useState();

  useEffect(() => {
    const category = categories.filter((item) => item.id === categoryId);
    setCategory(category as any);
    reset(category[0]);
  }, [categoryId, reset]);

  const onSubmit = async (data: any) => {
    const newData = { ...data };
    newData.slug = slugify(data.slug || data.slug);
    newData.status = Number(data.status);
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          name: newData.name,
          slug: newData.slug,
          status: newData.status,
        };
      }
      return category;
    });

    await new Promise((res) => setTimeout(res, 1000)).then(() => {
      toast.success("Update danh mục thành công");
      setCategories(updatedCategories);
    });
  };

  return (
    <>
      <DashboardHeading>Update category</DashboardHeading>
      <span>Your category id: {categoryId}</span>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <FormGroup>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your category name"
              name="name"
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
            <Label>Status</Label>
            <div className="flex gap-x-6">
              <Radio
                id="approved"
                control={control}
                name="status"
                value={categoryStatus.APPROVED}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                id="pending"
                control={control}
                name="status"
                value={categoryStatus.PENDING}
                checked={Number(watchStatus) === categoryStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                id="reject"
                control={control}
                name="status"
                value={categoryStatus.REJECTED}
                checked={Number(watchStatus) === categoryStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </FormGroup>
          <FormGroup>
            <></>
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
            Update category
          </Button>
        </div>
      </form>
    </>
  );
};

export default CategoryUpdate;
