import {InitialStateType, PayloadObject } from "../services/appContext";

interface ActionType {
  type: ("ADD_BUN" | "ADD_INGREDIENT" | "REMOVE_INGREDIENT");
  payload: PayloadObject;
}

export const burgerConstructorReducer = (state: InitialStateType, action: ActionType):InitialStateType => {
  switch (action.type) {
    case "ADD_BUN":{
      if(action.payload.price && action.payload.image && action.payload.text){
        const newState = {
          ...state,
          bun: {
            _id: action.payload._id,
            image: action.payload.image,
            text: action.payload.text,
            price: action.payload.price,
          },
          totalPrice: state.totalPrice + action.payload.price *2,
      }
        return newState;
      }else{
        return state;
      }
    }
    case "ADD_INGREDIENT": {
      if(action.payload.price && action.payload.image && action.payload.text){
        const newState =  {
          ...state, 
          ingredients: [
          ...state.ingredients,
          action.payload
          ],
          totalPrice: state.totalPrice + action.payload.price,
        }
        return newState as InitialStateType ; 
      }else{
        return state;
      }
      
    }
    case "REMOVE_INGREDIENT":
      const ingredient = state.ingredients.find(item => item._id === action.payload._id)
      try {
        if(ingredient && ingredient.price){
          const filteredIngredients = state.ingredients.filter(item => item._id !== action.payload._id)

          const newState =  {...state, 
            ingredients: filteredIngredients,
            totalPrice: state.totalPrice - ingredient.price,
          }
          
          return newState ; 
        }

      } catch (err) {
        throw new Error(`Error while removing ingredient: ${err}`);
      }
      return state;
      
    default:{
      throw new Error(`Wrong type of action: ${action.type}`);
    }
      
  }
}