import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToggle } from "~/hooks";
import { UserRegisterFormType, register } from "~/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IconEyeToggle } from "~/components/icon";
import { FormGroup, Input, Label, Button } from "~/components";
import { createUser } from "~/services/userService";

const schema = yup.object().shape({
  username: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character"),
});
const SignUpModal = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (body: UserRegisterFormType) => {
      return createUser(body.email, body.username, body.password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
      toast.success("");
    },
    onError: () => {
      toast.error("");
    },
  });

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  const { value: showPassword, handleToggle } = useToggle();

  return (
    <>
      <p className="text-center lg:text-sm text-xs font-normal  lg:mb-8">
        Already have an acccount?{" "}
        <Link className="text-primary font-medium underline" to="/auth/sign-in">
          Sign in
        </Link>
      </p>
      {/* <ButtonGoogle text={"Sign in with google"}></ButtonGoogle> */}
      <form action="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="username">Username *</Label>
          <Input
            name="username"
            control={control}
            placeholder="johnny klame"
            error={errors?.username?.message as string}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            name="email"
            control={control}
            placeholder="johnnyKlame12@gmail.com"
            error={errors?.email?.message as string}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            control={control}
            placeholder="Create a password"
            error={errors?.password?.message as string}
          >
            <IconEyeToggle
              toggle={showPassword}
              onClick={handleToggle}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <FormGroup>
          <Link
            to="/forgot-password"
            className="inline-block text-sm font-medium text-primary"
          >
            Forgot password
          </Link>
        </FormGroup>
        <Button
          style={{
            width: "100%",
            margin: "0 auto",
          }}
          height="h-10"
          type="submit"
          isloading={isSubmitting}
          disabled={!isValid}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignUpModal;
