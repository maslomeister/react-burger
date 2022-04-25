import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  RequestOptions,
  createUser,
  loginUser,
  logoutUser,
  getOrUpdateUser,
  getNewToken,
  forgotPassword,
  resetPassword,
} from "../../utils/api";
import { setCookie } from "../../utils/utils";

const tokenLifeTime = 1150;

type User = {
  name: string;
  email: string;
};

interface SliceState {
  user: User;
  status: string;
  error: string;
}

const initialState: SliceState = {
  user: { name: "", email: "" },
  status: "idle",
  error: "",
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

export const logoutUserProfile = createAsyncThunk(
  "auth/logoutUser",
  async (requestOptions: RequestOptions) => {
    const response = await logoutUser(requestOptions);
    return response;
  }
);

export const getOrUpdateUserData = createAsyncThunk(
  "auth/getUser",
  async (requestOptions: RequestOptions) => {
    const response = await getOrUpdateUser(requestOptions);
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

export const forgotUserPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (requestOptions: RequestOptions) => {
    const response = await forgotPassword(requestOptions);
    return response;
  }
);

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPassword",
  async (requestOptions: RequestOptions) => {
    const response = await resetPassword(requestOptions);
    return response;
  }
);

export const authUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setIdle: (state: SliceState) => {
      state.status = "idle";
    },
    resetState: (state: SliceState) => {
      return (state = initialState);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUserProfile.pending, (state) => {
        state.status = "registerUser/loading";
        state.error = "";
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.status = "registerUser/success";

        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        setCookie("accessToken", action.payload.accessToken, {
          expires: tokenLifeTime,
        });
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.status = "registerUser/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(loginUserProfile.pending, (state) => {
        state.status = "loginUser/loading";
        state.error = "";
      })
      .addCase(loginUserProfile.fulfilled, (state, action) => {
        state.status = "loginUser/success";

        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        setCookie("accessToken", action.payload.accessToken, {
          expires: tokenLifeTime,
        });
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUserProfile.rejected, (state, action) => {
        state.status = "loginUser/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(logoutUserProfile.pending, (state) => {
        state.status = "logout/loading";
        state.error = "";
      })
      .addCase(logoutUserProfile.fulfilled, (state, action) => {
        state.user = { name: "", email: "" };
        state.status = "logout/success";
        setCookie("accessToken", "", {
          expires: 0,
        });
        setCookie("refreshToken", "", {
          expires: 0,
        });
      })
      .addCase(logoutUserProfile.rejected, (state, action) => {
        state.status = "logout/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getOrUpdateUserData.pending, (state) => {
        state.status = "getUserData/loading";
        state.error = "";
      })
      .addCase(getOrUpdateUserData.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "getUserData/success",
          user: {
            name: action.payload.user.name,
            email: action.payload.user.email,
          },
        });
      })
      .addCase(getOrUpdateUserData.rejected, (state, action) => {
        state.status = "getUserData/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getNewAccessToken.pending, (state) => {
        state.status = "getToken/loading";
        state.error = "";
      })
      .addCase(getNewAccessToken.fulfilled, (state, action) => {
        setCookie("accessToken", action.payload.accessToken, {
          expires: tokenLifeTime,
        });
        setCookie("refreshToken", action.payload.refreshToken);
        state.status = "getToken/success";
      })
      .addCase(getNewAccessToken.rejected, (state, action) => {
        state.status = "getToken/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(forgotUserPassword.pending, (state) => {
        state.status = "forgotPassword/loading";
        state.error = "";
      })
      .addCase(forgotUserPassword.fulfilled, (state, action) => {
        state.status = "v/success";
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.status = "forgotPassword/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(resetPasswordUser.pending, (state) => {
        state.status = "resetPassword/loading";
        state.error = "";
      })
      .addCase(resetPasswordUser.fulfilled, (state, action) => {
        state.status = "resetPassword/success";
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.status = "resetPassword/failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { setIdle, resetState } = authUser.actions;

export default authUser.reducer;
