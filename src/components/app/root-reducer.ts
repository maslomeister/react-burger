import { combineReducers } from "@reduxjs/toolkit";

import burgerDetails from "../services/reducers/ingredient-details";
import allIngredients from "../services/reducers/burger-ingredients";
import constructorIngredients from "../services/reducers/burger-constructor";
import orderDetails from "../services/reducers/order-details";

const rootReducer = combineReducers({
  ingredientDetails: burgerDetails,
  burgerIngredients: allIngredients,
  constructorIngredients: constructorIngredients,
  orderDetails: orderDetails,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
