import React from "react";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CategoryType } from "~/types/CategoryType";
import { Button, FormGroup, Input, Label, Radio } from "~/components";
import { categoryStatus } from "~/config/constant";
import slugify from "react-slugify";
import { toast } from "react-toastify";
import httpRequest from "~/ultis/httpRequest";
type Props = {};

const schema = yup.object().shape({
  name: yup.string().required("This field is required"),
  // status: yup.string().required("This field is required"),
});

const defaultValues = {
  name: "",
  slug: "",
  status: 2,
  createdAt: new Date().getTime(),
};

const CategoryAddNew = (props: Props) => {
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
    defaultValues: defaultValues,
  });

  const watchStatus = watch("status");
  // handle submit

  const onSubmit = async (data: any) => {
    data.slug = slugify(data.slug || data.name);
    data.status = Number(data.status);
    await httpRequest.post("/categories", data);
    reset(defaultValues);
    toast.success("Thêm danh mục thành công, vui lòng chờ duyệt");
  };

  return (
    <>
      <DashboardHeading>Add new category</DashboardHeading>
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
            Add new category
          </Button>
        </div>
      </form>
    </>
  );
};

export default CategoryAddNew;
