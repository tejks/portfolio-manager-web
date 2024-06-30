import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../API/models/user.model";
import { authApi } from "../API/services/auth";

const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;
const userRefreshToken = localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : null;

export type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string;
  refreshTokenExpiration: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: userToken, refreshToken: userRefreshToken } as AuthState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.refreshToken = payload.loginResult.refreshToken;
      state.token = payload.loginResult.token;
      state.user = {
        email: payload.userData.email,
        id: payload.userData.id,
      };
      localStorage.setItem("userToken", payload.loginResult.token as string);
      localStorage.setItem("refreshToken", payload.loginResult.refreshToken as string);
    });
    builder.addMatcher(authApi.endpoints.current.matchRejected, (state) => {
      state.user = null;
    });
    builder.addMatcher(authApi.endpoints.current.matchFulfilled, (state, { payload }) => {
      state.user = {
        email: payload.email,
        id: payload.id,
      };
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
