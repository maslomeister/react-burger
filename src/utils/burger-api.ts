const BURGER_API_URL = "https://norma.nomoreparties.space/api";

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
  };
  body: string;
}

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => {
        throw new Error(`Не пришел ответ от сервера: ${err}`);
      });
};

export const getIngredients = async () => {
  const res = await fetch(`${BURGER_API_URL}/ingredients`);
  const data = await checkResponse(res);
  if (data.success) return data.data;
  throw new Error("Внутрення ошибка апи");
};

export const createOrder = async (requestOptions: RequestOptions) => {
  const res = await fetch(`${BURGER_API_URL}/orders`, requestOptions);
  const data = await checkResponse(res);
  if (data.success) return data.order.number;
  throw new Error("Внутрення ошибка апи");
};