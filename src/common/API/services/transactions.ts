import { RootState } from "@/common/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Broker } from "../models/broker.model";
import { Token } from "../models/token.model";
import { Transaction } from "../models/transaction.modal";

export interface TransactionRequest {
  transactionType: number;
  quantity: number;
  datetime: string;
  userId: string;
  tokenId: string;
  brokerId: string;
  price: number;
}

export interface TransactionResponse {
  id: string;
  userId: string;
  transactionType: number;
  quantity: number;
  price: number;
  datetime: string;
  isDeleted: boolean;
  isArchived: boolean;
  broker: Broker;
  token: Token;
}

export interface SummarisedTransactionResponse {
  totalPositiveAmount: number;
  totalNegativeAmount: number;
  averageBuyPrice: number;
  averageSellPrice: number;
  token: Token;
  brokers: Broker[];
}

export const transactionApi = createApi({
  reducerPath: "transactionApi",
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
    createTransaction: builder.mutation<Transaction, TransactionRequest>({
      query: (body) => ({
        url: "transaction",
        method: "POST",
        body,
      }),
    }),
    getTransactionsWithUserId: builder.query<TransactionResponse[], string>({
      query: (userId) => ({
        url: `transaction/${userId}/transactions`,
        method: "GET",
      }),
    }),
    getBrokers: builder.query<Broker[], void>({
      query: () => ({
        url: "broker",
        method: "GET",
      }),
    }),
    getBrokerById: builder.query<Broker, string>({
      query: (id) => ({
        url: `broker/${id}`,
        method: "GET",
      }),
    }),
    getSummerizedTransactions: builder.query<SummarisedTransactionResponse[], string>({
      query: (userId) => ({
        url: `transaction/${userId}/summarisedAllTokenTransactions`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetTransactionsWithUserIdQuery,
  useGetBrokersQuery,
  useGetSummerizedTransactionsQuery,
} = transactionApi;
