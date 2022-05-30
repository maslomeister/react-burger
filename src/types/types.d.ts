interface IUser {
  email: string;
  name: string;
}

interface ITokenData {
  accessToken: string;
  refreshToken: string;
}

interface IUserData {
  user: IUser;
}

interface IMessageData {
  message: string;
}

interface ICreateUser {
  user: IUser;
}

interface ILoginUser extends ITokenData {
  user: IUser;
}

interface IIngredient {
  _id: string;
  _uniqueId?: string;
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

interface Items {
  item: IIngredient[];
}

interface IOrder {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: "created" | "pending" | "done";
  updatedAt: string;
  _id: string;
}

interface IOrdersData {
  orders: Array<IOrder>;
  total: number;
  totalToday: number;
}

interface IRequestOptions {
  method: string;
  headers: {
    "Content-Type": string;
    authorization?: string;
  };
  body?: string;
}

type TLocationProps = {
  pathname?: string;
  state: {
    from: Location;
    background?: Location;
    id?: string;
    finishOrder?: boolean;
  };
};
