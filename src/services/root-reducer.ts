import { combineReducers } from "@reduxjs/toolkit";

import burgerDetails from "./ingredient-details";
import allIngredients from "./burger-ingredients";
import constructorIngredients from "./burger-constructor";
import orderDetails from "./order-details";
import authUser from "./auth/auth";

const rootReducer = combineReducers({
  ingredientDetails: burgerDetails,
  burgerIngredients: allIngredients,
  constructorIngredients: constructorIngredients,
  orderDetails: orderDetails,
  authUser: authUser,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
