import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { authApi } from "../API/services/auth";

const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;

export type AuthState = {
  user: AuthState | null;
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: userToken } as AuthState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
      state = payload;
      localStorage.setItem("userToken", payload.token as string);
    });
    builder.addMatcher(authApi.endpoints.current.matchRejected, (state) => {
      state.user = null;
    });
    builder.addMatcher(authApi.endpoints.current.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
