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
  type: ("ADD_BUN" | "ADD_INGREDIENT" | "REMOVE_INGREDIENT");
  payload: any;
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

      let newTotal = newState.bun.price * 2;
      newState.totalPrice += newTotal;
      return newState;
    }
    case "ADD_INGREDIENT": {
      let newState =  {...state, ingredients: [
        ...state.ingredients,
        action.payload.newElem
      ]}
      
      newState.totalPrice +=  action.payload.newElem.price;
      return newState ; 
    }
    case "REMOVE_INGREDIENT":
      let ingredient = state.ingredients.filter(item => item._id === action.payload._id)
      let filteredIngredients = state.ingredients.filter(item => item._id !== action.payload._id)

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