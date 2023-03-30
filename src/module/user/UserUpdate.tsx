import React, { useEffect } from "react";
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
import UserType from "~/types/UserType";
import httpRequest from "~/ultis/httpRequest";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import { UserRole, UserStatus, USER_DEFAULT_VALUE } from "~/config";
import { toast } from "react-toastify";

type Props = {};

const schema = yup.object().shape({
  fullName: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
});

const UserUpdate = (props: Props) => {
  const [params] = useSearchParams();
  const userId = params.get("id");

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
  const { progress, onSelectImg, handleDeleteImg, image, setImage } =
    useUploadImg({
      setValue,
      getValues,
    });
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      const userData = await httpRequest.get<UserType>(`/users/${userId}`);
      setImage(userData.avatar);
      reset(userData);
    };
    fetchUser();
  }, [userId, reset]);

  const watchStatus = watch("status");
  const watchRole = watch("role");

  // handle events
  const handleUpdateUser = async (data: any) => {
    data.status = Number(data.status);
    data.role = Number(data.role);
    data.avatar = image;
    try {
      await httpRequest.put(`/users/${userId}`, data);
      toast.success("Cập nhật User mới thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật User không thành công, hãy thử lại");
    }
  };
  return (
    <>
      <DashboardHeading>Update user</DashboardHeading>
      <form action="" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-48 h-48 rounded-full mb-10 mx-auto">
          <UploadImg
            name="image"
            imageLink={image}
            onChange={onSelectImg}
            progress={progress}
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
                value={UserStatus.ACTIVED}
                checked={Number(watchStatus) === Number(UserStatus.ACTIVED)}
              >
                Actived
              </Radio>
              <Radio
                id="pending"
                control={control}
                name="status"
                value={UserStatus.PENDING}
                checked={Number(watchStatus) === Number(UserStatus.PENDING)}
              >
                Pending
              </Radio>
              <Radio
                id="baned"
                control={control}
                name="status"
                value={UserStatus.BANNED}
                checked={Number(watchStatus) === Number(UserStatus.BANNED)}
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
                value={UserRole.ADMIN}
                checked={Number(watchRole) === Number(UserRole.ADMIN)}
              >
                ADMIN
              </Radio>
              <Radio
                id="mod"
                control={control}
                name="role"
                value={UserRole.MOD}
                checked={Number(watchRole) === Number(UserRole.MOD)}
              >
                MODERATOR
              </Radio>
              <Radio
                id="user"
                control={control}
                name="role"
                value={UserRole.USER}
                checked={Number(watchRole) === Number(UserRole.USER)}
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
          Update user
        </Button>
      </form>
    </>
  );
};

export default UserUpdate;
