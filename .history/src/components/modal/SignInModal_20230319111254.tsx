import React from "react";
import { Link } from "react-router-dom";
import FormGroup from "../form-group/FormGroup";
import Input from "../input/Input";
import Label from "../label/Label";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggleValue from "../../hooks/useToggle";
import IconEyeToggle from "../icon/IconEyeToggle";
import Button from "../button/Button";

type Props = {};
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character"),
});
const SignInModal = (props: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data: any) => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log(data);
  };

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  console.log(showPassword);

  return (
    <>
      <p className="text-center lg:text-sm text-xs font-normal  lg:mb-8">
        Dont have an acccount?{" "}
        <Link className="text-primary font-medium underline" to="/auth/sign-up">
          Sign up
        </Link>
      </p>
      {/* <ButtonGoogle text={"Sign in with google"}></ButtonGoogle> */}
      <form action="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <FormGroup>
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="inline-block text-sm font-medium text-primary"
            >
              Forgot password
            </Link>
          </div>
        </FormGroup>
        <Button className="w-full" isLoading={true} disabled={true}>
          {/* {isSubmitting ? (
            <div className="rounded-full w-6 h-6 border-4 border-l-transparent animate-spin"></div>
          ) : (
            "Submit"
          )} */}
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignInModal;
