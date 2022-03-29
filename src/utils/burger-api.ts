const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export interface Item {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories:number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

export interface Items {
  item: Item[]
}

interface RequestOptions {
  method: string,
  headers: {
    "Content-Type": string,
  },
  body: string,
}

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err) )
}

export const getIngredients = async () => {
  return fetch(`${BURGER_API_URL}/ingredients`)
  .then(checkResponse)
  .then(data => {
    if(data.success) return data.data;
    return Promise.reject(data);
  })
}

export const createOrderApi = async (requestOptions: RequestOptions) => {
  return fetch(`${BURGER_API_URL}/orders`, requestOptions)
  .then(checkResponse)
  .then(data => {
    if(data.success) return data.order.number;
    return Promise.reject(data);
  })
}