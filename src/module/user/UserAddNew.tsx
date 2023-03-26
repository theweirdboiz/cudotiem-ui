import React from "react";
import { useForm } from "react-hook-form";
import {
  FormGroup,
  Input,
  Label,
  Radio,
  Button,
  UploadImg,
} from "~/components";
import useUploadImg from "~/hooks/useUploadImg";
import useToggleValue from "~/hooks/useToggle";
import UserType from "~/types/UserType";
import IconEyeToggle from "~/components/icon/IconEyeToggle";
import httpRequest from "~/ultis/httpRequest";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRole, userStatus, USER_DEFAULT_VALUE } from "~/config";
import { toast } from "react-toastify";

type Props = {};

const schema = yup.object().shape({
  fullName: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
});

const UserAddNew = (props: Props) => {
  const {
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<UserType>({
    defaultValues: USER_DEFAULT_VALUE,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const { progress, image, onSelectImg, handleDeleteImg, handleResetUpload } =
    useUploadImg({
      setValue,
      getValues,
    });

  const { value: showPassword, handleToggle } = useToggleValue();

  const handleCreateUser = async (data: any) => {
    data.status = Number(data.status);
    data.role = Number(data.role);
    data.avatar = image;
    try {
      await httpRequest.post("/users", data);
      handleResetUpload();
      toast.success("Thêm User mới thành công!");
      reset(USER_DEFAULT_VALUE);
    } catch (error) {
      console.log(error);
      toast.error("Thêm User không thành công, hãy thử lại");
    }
  };
  return (
    <>
      <DashboardHeading>New user</DashboardHeading>
      <form action="" onSubmit={handleSubmit(handleCreateUser)}>
        <div className="w-48 h-48 rounded-full mb-10 mx-auto">
          <UploadImg
            name="image"
            onChange={onSelectImg}
            progress={progress}
            imageLink={image}
            handleDeleteImage={handleDeleteImg}
            className="!rounded-full"
            control={control}
          ></UploadImg>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormGroup>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullName"
              placeholder="Enter your fullname"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Enter your email"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              control={control}
              placeholder="Create a password"
              // error={errors?.password?.message as string}
            >
              <IconEyeToggle
                toggle={showPassword}
                onClick={handleToggle}
              ></IconEyeToggle>
            </Input>
          </FormGroup>
          <FormGroup>{}</FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <div className="flex gap-x-5">
              <Radio
                id="actived"
                control={control}
                name="status"
                value={userStatus.ACTIVED}
                checked={Number(watchStatus) === Number(userStatus.ACTIVED)}
              >
                Actived
              </Radio>
              <Radio
                id="pending"
                control={control}
                name="status"
                value={userStatus.PENDING}
                checked={Number(watchStatus) === Number(userStatus.PENDING)}
              >
                Pending
              </Radio>
              <Radio
                id="baned"
                control={control}
                name="status"
                value={userStatus.BANED}
                checked={Number(watchStatus) === Number(userStatus.BANED)}
              >
                Baned
              </Radio>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>Role</Label>
            <div className="flex gap-x-5">
              <Radio
                id="admin"
                control={control}
                name="role"
                value={userRole.ADMIN}
                checked={Number(watchRole) === Number(userRole.ADMIN)}
              >
                ADMIN
              </Radio>
              <Radio
                id="mod"
                control={control}
                name="role"
                value={userRole.MOD}
                checked={Number(watchRole) === Number(userRole.MOD)}
              >
                MODERATOR
              </Radio>
              <Radio
                id="user"
                control={control}
                name="role"
                value={userRole.USER}
                checked={Number(watchRole) === Number(userRole.USER)}
              >
                USER
              </Radio>
            </div>
          </FormGroup>
        </div>
        <Button
          style={{
            width: "50%",
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
          Add new user
        </Button>
      </form>
    </>
  );
};

export default UserAddNew;
