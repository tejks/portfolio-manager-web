import { env } from "@/common/config/env";
import { RootState } from "@/common/store";
import { AuthState } from "@/common/store/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthUser, IUser } from "../models/user.model";

export interface UserResponse {
  user: AuthUser;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.VITE_SERVER_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<AuthState, LoginRequest>({
      query: ({ email, password }) => ({
        url: "auth/signin",
        method: "POST",
        body: {
          username: email,
          password,
        },
      }),
    }),
    signup: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    current: builder.query<any, void>({
      query: () => ({
        url: "users/current",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useCurrentQuery, useGetAllUsersQuery, useGetUserByIdQuery } =
  authApi;
