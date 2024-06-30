import { ConfigureStoreOptions, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authApi } from "../API/services/auth";
import { tokensApi } from "../API/services/tokens";
import { transactionApi } from "../API/services/transactions";
import authSlice from "./authSlice";
import portfolioSlice from "./portfolioSlice";
import transactionSlice from "./transactionSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  portfolio: portfolioSlice,
  transaction: transactionSlice,
  [authApi.reducerPath]: authApi.reducer,
  [tokensApi.reducerPath]: tokensApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
});

export const createStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, tokensApi.middleware, transactionApi.middleware),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
