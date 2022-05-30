import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCookie } from "../../../utils/utils";

import {
  createUser,
  loginUser,
  logoutUser,
  getOrUpdateUser,
  getNewToken,
  forgotPassword,
  resetPassword,
} from "../../../utils/api";

interface SliceState {
  user: IUser;
  status: string;
  success: string;
  error: string;
}

const initialState: SliceState = {
  user: { name: "", email: "" },
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
    const requestOptions = {
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
    const requestOptions = {
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
    const requestOptions = {
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

export const getOrUpdateUserData = createAsyncThunk(
  "auth/getUser",
  async ({
    method = "get",
    name,
    email,
  }: {
    method?: string;
    name?: string;
    email?: string;
  }) => {
    const accessToken = getCookie("accessToken");
    let requestOptions: IRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    };

    if (method === "update") {
      requestOptions = {
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
    }

    const response = await getOrUpdateUser(requestOptions);
    return response;
  }
);

export const getNewAccessToken = createAsyncThunk("auth/getToken", async () => {
  const refreshToken = getCookie("refreshToken");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  };
  const response = await getNewToken(requestOptions);
  return response;
});

export const forgotUserPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    const requestOptions = {
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
    const requestOptions = {
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
        // setCookie("accessToken", action.payload.accessToken, {
        //   expires: tokenLifeTime,
        // });
        // setCookie("refreshToken", action.payload.refreshToken);
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
