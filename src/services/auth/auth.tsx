import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  RequestOptions,
  createUser,
  loginUser,
  getUser,
  getNewToken,
} from "../../utils/api";
import { getCookie, setCookie } from "../../utils/utils";

const tokenLifeTime = 50;

interface SliceState {
  name: string;
  email: string;
  status: string;
  error: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: SliceState = {
  name: "",
  email: "",
  status: "idle",
  error: "",
  accessToken: "",
  refreshToken: "",
};

export const createUserProfile = createAsyncThunk(
  "auth/createUser",
  async (requestOptions: RequestOptions) => {
    const response = await createUser(requestOptions);
    return response;
  }
);

export const loginUserProfile = createAsyncThunk(
  "auth/loginUser",
  async (requestOptions: RequestOptions) => {
    const response = await loginUser(requestOptions);
    return response;
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUser",
  async (requestOptions: RequestOptions) => {
    const response = await getUser(requestOptions);
    return response;
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/getToken",
  async (requestOptions: RequestOptions) => {
    const response = await getNewToken(requestOptions);
    return response;
  }
);

export const authUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.accessToken = action.payload.accessToken;
        setCookie("accessToken", action.payload.accessToken, {
          expires: tokenLifeTime,
        });
        state.refreshToken = action.payload.refreshToken;
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(loginUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.accessToken = action.payload.accessToken;
        setCookie("accessToken", action.payload.accessToken, {
          expires: tokenLifeTime,
        });
        state.refreshToken = action.payload.refreshToken;
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUserProfile.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getNewAccessToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewAccessToken.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.accessToken = action.payload.accessToken;
        setCookie("accessToken", action.payload.accessToken, {
          expires: tokenLifeTime,
        });
        state.refreshToken = action.payload.refreshToken;
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(getNewAccessToken.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export default authUser.reducer;
