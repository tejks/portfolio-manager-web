import { RootState } from "@/common/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Token } from "../models/token.model";

export const tokensApi = createApi({
  reducerPath: "tokensApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
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
    getTokens: builder.query<Token[], void>({
      query: () => ({
        url: "token",
        method: "GET",
      }),
    }),
    getToken: builder.query<Token, string>({
      query: (id) => ({
        url: `token/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTokenQuery, useGetTokensQuery } = tokensApi;
