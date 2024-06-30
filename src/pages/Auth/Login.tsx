import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { z } from "zod";

import { useLoginMutation } from "@/common/API/services/auth";
import Button from "@/components/common/Button";
import Input from "@components/common/Input";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [login] = useLoginMutation();

  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    await login({ email, password })
      .unwrap()
      .then(() => {
        navigate("/portfolio");
      });
  };

  return (
    <div className="shadow-input mx-auto mt-72 w-full max-w-md rounded-none bg-neutral-100 px-12 py-5 md:rounded-2xl">
      <h2 className="my-6 text-center text-2xl font-bold text-neutral-700">Login to your account</h2>

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

        <div className="mt-10 text-center">
          <Button color="primary" className="my-2" type="submit">
            Login
          </Button>
        </div>

        <div className="mt-7 text-center text-xs font-medium text-neutral-400 lg:text-sm">
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
