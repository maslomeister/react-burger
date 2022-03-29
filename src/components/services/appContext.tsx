import { createContext } from "react";

export interface IngredientType {
  _id: string;
  image: string;
  text: string;
  price: number;
}

export interface PayloadObject {
  _id: string;
  image?: string;
  text?: string;
  price?: number;
}
export interface InitialStateType {
  ingredients: IngredientType[];
  bun: IngredientType;
  totalPrice: number;
}
export interface ActionType {
  type: "ADD_BUN" | "ADD_INGREDIENT" | "REMOVE_INGREDIENT";
  payload: PayloadObject;
}

export const initialState: InitialStateType = {
  ingredients: [],
  bun: {
    _id: "",
    image: "",
    text: "",
    price: 0,
  },
  totalPrice: 0,
};

interface BurgerConstructorContextTypes {
  burgerConstructorState: InitialStateType;
  burgerConstructorDispatcher: React.Dispatch<ActionType>;
}

export const BurgerConstructorContext =
  createContext<BurgerConstructorContextTypes>({
    burgerConstructorState: initialState,
    burgerConstructorDispatcher: () => {},
  });
