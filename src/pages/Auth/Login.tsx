import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useSigninMutation } from "@/common/API/services/auth";
import Button from "@/components/common/Button";
import Input from "@components/common/Input";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const validationSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const [signIn] = useSigninMutation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) =>
    signIn({ email, password }).then(() => navigate("/"));

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl py-5 shadow-input mt-72 bg-neutral-100 px-12">
      <h2 className="font-bold text-2xl text-neutral-700 text-center my-6">
        Login to your account
      </h2>

      <form className="mt-10" action="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Input
            labelValue="Your email"
            type="email"
            id="email"
            defaultValue=""
            className=""
            placeholder="user@example.com"
            error={errors["email"]}
            register={register("email")}
          />
          <Input
            labelValue="Password"
            type="password"
            id="password"
            defaultValue=""
            className=""
            placeholder="••••••••"
            error={errors["password"]}
            register={register("password")}
          />
        </div>

        <div className="text-center mt-10">
          <Button color="primary" className="my-2" type="submit">
            Login
          </Button>
        </div>

        <div className="text-center text-xs font-medium text-neutral-400 lg:text-sm mt-7">
          Don’t have an account yet?{" "}
          <Link to={"/signup"} className="text-[#4d3c64]">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
