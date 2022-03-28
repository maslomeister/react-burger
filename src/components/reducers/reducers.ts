type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]: never;
};

type Either<T, U> = Only<T, U> | Only<U, T>;

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

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

interface PayloadObject {
  _id: string;
  image: string;
  text: string;
  price: number;
}

interface ActionType {
  type: ("ADD_BUN" | "ADD_INGREDIENT" | "REMOVE_INGREDIENT");
  payload: PayloadObject;
}

export const burgerConstructorReducer = (state: InitialStateType, action: ActionType):InitialStateType => {
  switch (action.type) {
    case "ADD_BUN":{
      let newState = {
        ...state,
        bun: {
          _id: action.payload._id,
          image: action.payload.image,
          text: action.payload.text,
          price: action.payload.price,
        },
      }

      const newTotal = newState.bun.price * 2;
      newState.totalPrice += newTotal;
      return newState;
    }
    case "ADD_INGREDIENT": {
      let newState =  {...state, ingredients: [
        ...state.ingredients,
        action.payload
      ]}
      
      newState.totalPrice +=  action.payload.price;
      return newState ; 
    }
    case "REMOVE_INGREDIENT":
      const ingredient = state.ingredients.filter(item => item._id === action.payload._id)
      const filteredIngredients = state.ingredients.filter(item => item._id !== action.payload._id)

      let newState =  {
        ...state, 
        ingredients: filteredIngredients
      }

      let newTotal = state.totalPrice;
      newTotal -= ingredient[0].price;
      
      newState.totalPrice = newTotal;
      return newState ; 
    default:{
      throw new Error(`Wrong type of action: ${action.type}`);
    }
      
  }
}