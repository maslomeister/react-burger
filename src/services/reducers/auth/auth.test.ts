import { configureStore } from "@reduxjs/toolkit";

import reducer, {
  initialState,
  setIdle,
  loadTokens,
  resetState,
  createUserProfile,
  loginUserProfile,
  logoutUserProfile,
  getUserData,
  updateUserData,
  getNewAccessToken,
  forgotUserPassword,
  resetPasswordUser,
} from "./auth";

describe("Redux auth reducer", () => {
  let store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initialState,
    });
  });

  afterEach(() => {
    jest.spyOn(global, "fetch").mockClear();
  });

  test("Should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("Should set status to idle", async () => {
    expect(reducer({ ...initialState, status: "loading" }, setIdle())).toEqual({
      ...initialState,
      status: "idle",
    });
  });

  test("Should set tokens", async () => {
    expect(
      reducer(
        initialState,
        loadTokens({
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        })
      )
    ).toEqual({
      ...initialState,
      tokens: { accessToken: "accessToken", refreshToken: "refreshToken" },
    });
  });

  test("Should reset state", async () => {
    expect(
      reducer({ ...initialState, status: "loading" }, resetState())
    ).toEqual(initialState);
  });

  test("Should fulfill createUserProfile", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            user: { email: "user@mail.ru", name: "user" },
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(
      createUserProfile({
        email: "user@mail.ru",
        name: "user",
        password: "password",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      user: { email: "user@mail.ru", name: "user" },
      tokens: { accessToken: "accessToken", refreshToken: "refreshToken" },
      status: "registerUser/success",
    });
  });

  test("Should fail createUserProfile", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(
      createUserProfile({
        email: "user@mail.ru",
        name: "user",
        password: "password",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "registerUser/failed",
    });
  });

  test("Should fulfill loginUserProfile", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            user: { email: "user@mail.ru", name: "user" },
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(
      loginUserProfile({
        email: "user@mail.ru",
        password: "password",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      user: { email: "user@mail.ru", name: "user" },
      tokens: { accessToken: "accessToken", refreshToken: "refreshToken" },
      status: "loginUser/success",
    });
  });

  test("Should fail loginUserProfile", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(
      loginUserProfile({
        email: "user@mail.ru",
        password: "password",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "loginUser/failed",
    });
  });

  test("Should fulfill logoutUserProfile", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            message: "logout success",
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(logoutUserProfile());

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      status: "logout/success",
    });
  });

  test("Should fail logoutUserProfile", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(logoutUserProfile());

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "logout/failed",
    });
  });

  test("Should fulfill getUserData", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            user: { email: "user@mail.ru", name: "user" },
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(getUserData({ accessToken: "accessToken" }));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      user: { email: "user@mail.ru", name: "user" },
      status: "getUserData/success",
    });
  });

  test("Should fail getUserData", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(getUserData({ accessToken: "accessToken" }));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "getUserData/failed",
    });
  });

  test("Should fulfill updateUserData", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            user: { email: "user@mail.ru", name: "user" },
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(
      updateUserData({
        accessToken: "accessToken",
        email: "user@mail.ru",
        name: "user",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      user: { email: "user@mail.ru", name: "user" },
      status: "updateUserData/success",
    });
  });

  test("Should fail updateUserData", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(
      updateUserData({
        accessToken: "accessToken",
        email: "user@mail.ru",
        name: "user",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "updateUserData/failed",
    });
  });

  test("Should fulfill getNewAccessToken", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(getNewAccessToken("refreshToken"));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      tokens: { accessToken: "accessToken", refreshToken: "refreshToken" },
      status: "getToken/success",
    });
  });

  test("Should fail getNewAccessToken", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(getNewAccessToken("refreshToken"));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "getToken/failed",
    });
  });

  test("Should fullfil forgotPassword", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            message: "success",
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(forgotUserPassword("email@mail.ru"));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      status: "forgotPassword/success",
    });
  });

  test("Should fail forgotPassword", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(forgotUserPassword("email@mail.ru"));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "forgotPassword/failed",
    });
  });

  test("Should fullfil resetPassword", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            message: "success",
            success: true,
          }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(
      resetPasswordUser({
        password: "password",
        confirmationCode: "confirmationCode",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      status: "resetPassword/success",
    });
  });

  test("Should fail resetPassword", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(
      resetPasswordUser({
        password: "password",
        confirmationCode: "confirmationCode",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      error: "Rejected",
      status: "resetPassword/failed",
    });
  });
});
