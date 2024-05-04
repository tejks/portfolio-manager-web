import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useSignupMutation } from "@/common/API/services/auth";
import Button from "@components/common/Button";
import Input from "@components/common/Input";

type FormValues = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const validationSchema = z
    .object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
      password: z.string().min(1, "Password is required"),
      userName: z.string().min(1, "Username is required"),
      confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [signUp] = useSignupMutation();

  const onSubmit: SubmitHandler<FormValues> = async ({
    email,
    password,
    userName,
  }) => {
    const formData = new FormData();

    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);

    await signUp(formData);
    navigate("/login");
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl py-5 shadow-input mt-60 bg-neutral-100 px-12">
      <h2 className="font-bold text-2xl text-neutral-700 text-center my-6">
        Create a new account
      </h2>

      <form className="mt-10" action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Input
            labelValue="Your email"
            type="email"
            id="email"
            className=""
            placeholder="example@example.com"
            error={errors["email"]}
            register={register("email")}
          />
          <Input
            labelValue="Username"
            type="text"
            id="userName"
            className=""
            placeholder="example"
            error={errors["userName"]}
            register={register("userName")}
          />
          <Input
            labelValue="Password"
            type="password"
            id="password"
            className=""
            placeholder="•••••••••••••"
            error={errors["password"]}
            register={register("password")}
          />
          <Input
            labelValue="Confirm password"
            type="password"
            id="confirmPassword"
            className=""
            placeholder="•••••••••••••"
            error={errors["confirmPassword"]}
            register={register("confirmPassword")}
          />
        </div>

        <div className="text-center mt-10">
          <Button color="primary" className="my-0.5 lg:my-2" type="submit">
            Login
          </Button>
        </div>

        <div className="text-center text-xs font-medium text-neutral-400 lg:text-sm mt-6">
          You already have an account?{" "}
          <Link to={"/login"} className="text-[#4d3c64]">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
