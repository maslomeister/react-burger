import { setCookie } from "../utils/utils";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const tokenLifeTime = 1150;

const checkSuccess = (
  data: { success: string; data: any },
  returnData: any
  // returnData: Promise<CustomResponse<TResponseBody<>>
) => {
  return data.success
    ? returnData
    : () => {
        throw new Error("Внутренняя ошибка апи");
      };
};

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => {
        if (err.message === "email or password are incorrect") {
          throw new Error(`Неправильно введен логин или пароль`);
        } else if (err.message === "User already exists") {
          throw new Error(`Такой Email уже зарегистрирован`);
        } else if (err.message === "Incorrect reset token") {
          throw new Error(`Неправильный код из письма`);
        } else if (err.message === "Invalid credentials provided") {
          throw new Error(`Поле пароля не может быть пустым`);
        } else if (err.message === "Failed to fetch") {
          throw new Error(`Данные не смогли загрузиться, обновите страницу`);
        } else {
          throw new Error(
            `Произошла непредвиденная ошибка: ${JSON.stringify(err)}`
          );
        }
      });
};

export const getIngredients = async (): Promise<IIngredient[]> => {
  const res = await fetch(`${BURGER_API_URL}/ingredients`);
  const data = await checkResponse(res);
  return checkSuccess(data, data.data);
};

export const createOrder = async (
  requestOptions: IRequestOptions
): Promise<number> => {
  const res = await fetch(`${BURGER_API_URL}/orders`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data, data.order.number);
};

export const getOrder = async (number: number): Promise<IOrder[]> => {
  const res = await fetch(`${BURGER_API_URL}/orders/${number}`);
  const data = await checkResponse(res);
  return checkSuccess(data, data.orders);
};

export const createUser = async (
  requestOptions: IRequestOptions
): Promise<ICreateUser> => {
  const res = await fetch(`${BURGER_API_URL}/auth/register`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data, data);
};

export const loginUser = async (requestOptions: IRequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/auth/login`, requestOptions);
  const data = await checkResponse(res);
  const success: ILoginUser = checkSuccess(data, data);
  if (success) {
    setCookie("accessToken", success.accessToken, {
      expires: tokenLifeTime,
    });
    setCookie("refreshToken", success.refreshToken);
  }
  return success;
};

export const logoutUser = async (requestOptions: IRequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/auth/logout`, requestOptions);
  const data = await checkResponse(res);
  const success: IMessageData = checkSuccess(data, data);
  if (success) {
    setCookie("accessToken", "", {
      expires: 0,
    });
    setCookie("refreshToken", "", {
      expires: 0,
    });
  }
  return success;
};

export const getOrUpdateUser = async (
  requestOptions: IRequestOptions
): Promise<IUserData> => {
  const res = await fetch(`${BURGER_API_URL}/auth/user`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data, data);
};

export const getNewToken = async (
  requestOptions: IRequestOptions
): Promise<ITokenData> => {
  const res = await fetch(`${BURGER_API_URL}/auth/token`, requestOptions);
  const data = await checkResponse(res);
  const success = checkSuccess(data, data);
  if (success) {
    setCookie("accessToken", success.accessToken, {
      expires: tokenLifeTime,
    });
    setCookie("refreshToken", success.refreshToken);
  }
  return success;
};

export const forgotPassword = async (
  requestOptions: IRequestOptions
): Promise<IMessageData> => {
  const res = await fetch(`${BURGER_API_URL}/password-reset`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data, data);
};

export const resetPassword = async (
  requestOptions: IRequestOptions
): Promise<IMessageData> => {
  const res = await fetch(
    `${BURGER_API_URL}/password-reset/reset`,
    requestOptions
  );
  const data = await checkResponse(res);
  console.log(data);
  return checkSuccess(data, data);
};
