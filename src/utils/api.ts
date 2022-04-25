const BURGER_API_URL = "https://norma.nomoreparties.space/api";

//account name maslomeister@gmail.com
//pass 4568jdfshkje

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface NewIngredient {
  _id: string;
  _uniqueId: string;
  index?: number;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface Items {
  item: Ingredient[];
}

export interface RequestOptions {
  method: string;
  headers: {
    "Content-Type": string;
    authorization?: string;
  };
  body?: string;
}

export type LocationProps = {
  state: {
    from: Location;
  };
};

const checksuccess = (
  data: { success: string; data: any },
  returnData: any
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
        } else {
          throw new Error(
            `Произошла непредвиденная ошибка: ${JSON.stringify(err)}`
          );
        }
      });
};

export const getIngredients = async () => {
  const res = await fetch(`${BURGER_API_URL}/ingredients`);
  const data = await checkResponse(res);
  return checksuccess(data, data.data);
};

export const createOrder = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/orders`, requestOptions);
  const data = await checkResponse(res);
  return checksuccess(data, data.order.number);
};

export const createUser = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/auth/register`, requestOptions);
  const data = await checkResponse(res);
  return checksuccess(data, data);
};

export const loginUser = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/auth/login`, requestOptions);
  const data = await checkResponse(res);
  return checksuccess(data, data);
};

export const getUser = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/auth/user`, requestOptions);
  const data = await checkResponse(res);
  return checksuccess(data, data);
};

export const getNewToken = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/auth/token`, requestOptions);
  const data = await checkResponse(res);
  return checksuccess(data, data);
};

export const logoutUser = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/logout`, requestOptions);
  const data = await checkResponse(res);
  return checksuccess(data, data);
};

export const forgotPassword = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/password-reset`, requestOptions);
  const data = await checkResponse(res);
  return checksuccess(data, data);
};

export const resetPassword = async (requestOptions: RequestOptions) => {
  const res = await fetch(
    `${BURGER_API_URL}/password-reset/reset`,
    requestOptions
  );
  const data = await checkResponse(res);
  return checksuccess(data, data);
};