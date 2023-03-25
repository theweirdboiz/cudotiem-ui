import React from "react";
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
import useUploadImg from "~/hooks/useUploadImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRole, userStatus } from "~/config";
import UserType from "~/types/UserType";

type Props = {};
const defaultValues = {
  fullname: "",
  email: "",
  avatar:
    "https://raw.githubusercontent.com/evondev/react-course-projects/master/monkey-blogging/public/img-upload.png",
  password: "",
  status: 2,
  role: 3,
};
const UserAddNew = (props: Props) => {
  const {
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<UserType>({
    defaultValues: defaultValues,
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");

  const { progress, image, onSelectImg, handleDeleteImg, handleResetUpload } =
    useUploadImg({
      setValue,
      getValues,
    });
  const handleCreateUser = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <DashboardHeading>New user</DashboardHeading>
      <form action="" onSubmit={handleSubmit(handleCreateUser)}>
        <div className="w-48 h-48 rounded-full mb-10 mx-auto">
          <UploadImg
            name="avatar"
            onChange={onSelectImg}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImg}
            className="!rounded-full"
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
              control={control}
              name="password"
              placeholder="Enter your password"
            ></Input>
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
                Pending
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
