import { combineReducers } from "@reduxjs/toolkit";

import burgerDetails from "./ingredient-details";
import allIngredients from "./burger-ingredients";
import constructorIngredients from "./burger-constructor";
import orderDetails from "./order-details";

const rootReducer = combineReducers({
  ingredientDetails: burgerDetails,
  burgerIngredients: allIngredients,
  constructorIngredients: constructorIngredients,
  orderDetails: orderDetails,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
