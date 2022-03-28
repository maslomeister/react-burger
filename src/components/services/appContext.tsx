import { createContext } from "react";

interface IngredientType {
  _id: string;
  image: string;
  text: string;
  price: number;
}
interface InitialStateType {
  ingredients: IngredientType[];
  bun: IngredientType;
  totalPrice: number;
}

interface ActionType {
  type: string;
  payload: any;
}

const initialState: InitialStateType = {
  ingredients: [],
  bun: {} as IngredientType,
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
