import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getCookie } from "../../../utils/utils";

import {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getNewToken,
  forgotPassword,
  resetPassword,
} from "../../../utils/api";

interface SliceState {
  user: IUserData;
  tokens: ITokenData;
  status: string;
  success: string;
  error: string;
}

const initialState: SliceState = {
  user: {
    name: "",
    email: "",
  },
  tokens: {
    accessToken: getCookie("accessToken") ?? "",
    refreshToken: getCookie("refreshToken") ?? "",
  },
  status: "idle",
  success: "",
  error: "",
};

export const createUserProfile = createAsyncThunk(
  "auth/createUser",
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    };
    const response = await createUser(requestOptions);
    return response;
  }
);

export const loginUserProfile = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const response = await loginUser(requestOptions);
    return response;
  }
);

export const logoutUserProfile = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    const refreshToken = getCookie("refreshToken");
    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: refreshToken,
      }),
    };
    const response = await logoutUser(requestOptions);
    return response;
  }
);

export const getUserData = createAsyncThunk(
  "auth/getUser",
  async ({ accessToken }: { accessToken: string }) => {
    const requestOptions: IRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    };

    const response = await getUser(requestOptions);
    return response;
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUser",
  async ({
    accessToken,
    name,
    email,
  }: {
    accessToken: string;
    name: string;
    email: string;
  }) => {
    const requestOptions: IRequestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({
        name: name!,
        email: email!,
      }),
    };

    const response = await updateUser(requestOptions);
    return response;
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/getToken",
  async (refreshToken: string) => {
    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    };
    const response = await getNewToken(requestOptions);
    return response;
  }
);

export const forgotUserPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    };

    const response = await forgotPassword(requestOptions);
    return response;
  }
);

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPassword",
  async ({
    password,
    confirmationCode,
  }: {
    password: string;
    confirmationCode: string;
  }) => {
    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        token: confirmationCode,
      }),
    };
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
    loadTokens: (state: SliceState, action: PayloadAction<ITokenData>) => {
      state.tokens = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
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

        state.tokens = {
          refreshToken: action.payload.refreshToken,
          accessToken: action.payload.accessToken,
        };
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
        state.tokens = {
          refreshToken: action.payload.refreshToken,
          accessToken: action.payload.accessToken,
        };
      })
      .addCase(loginUserProfile.rejected, (state, action) => {
        state.status = "loginUser/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(logoutUserProfile.pending, (state) => {
        state.status = "logout/loading";
        state.error = "";
      })
      .addCase(logoutUserProfile.fulfilled, (state) => {
        state.status = "logout/success";
        state.user = {
          name: "",
          email: "",
        };
        state.tokens = {
          refreshToken: "",
          accessToken: "",
        };
      })
      .addCase(logoutUserProfile.rejected, (state, action) => {
        state.status = "logout/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getUserData.pending, (state) => {
        state.status = "getUserData/loading";
        state.error = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "getUserData/success",
          user: {
            name: action.payload.user.name,
            email: action.payload.user.email,
          },
        });
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "updateUserData/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(updateUserData.pending, (state) => {
        state.status = "updateUserData/loading";
        state.error = "";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: "updateUserData/success",
          user: {
            name: action.payload.user.name,
            email: action.payload.user.email,
          },
        });
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "getUserData/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getNewAccessToken.pending, (state) => {
        state.status = "getToken/loading";
        state.error = "";
      })
      .addCase(getNewAccessToken.fulfilled, (state, action) => {
        state.status = "getToken/success";
        state.tokens = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      })
      .addCase(getNewAccessToken.rejected, (state, action) => {
        state.status = "getToken/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(forgotUserPassword.pending, (state) => {
        state.status = "forgotPassword/loading";
        state.error = "";
      })
      .addCase(forgotUserPassword.fulfilled, (state) => {
        state.status = "forgotPassword/success";
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.status = "forgotPassword/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(resetPasswordUser.pending, (state) => {
        state.status = "resetPassword/loading";
        state.error = "";
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.status = "resetPassword/success";
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.status = "resetPassword/failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { setIdle, loadTokens, resetState } = authUser.actions;

export default authUser.reducer;
