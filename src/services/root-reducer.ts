import { combineReducers } from "@reduxjs/toolkit";

import burgerDetails from "./reducers/ingredient-details/ingredient-details";
import allIngredients from "./reducers/burger-ingredients/burger-ingredients";
import constructorIngredients from "./reducers/burger-constructor/burger-constructor";
import orderDetails from "./reducers/order-details/order-details";
import authUser from "./reducers/auth/auth";
import { webSocketApi } from "./rtk/web-socket";

const rootReducer = combineReducers({
  ingredientDetails: burgerDetails,
  burgerIngredients: allIngredients,
  constructorIngredients: constructorIngredients,
  orderDetails: orderDetails,
  authUser: authUser,
  [webSocketApi.reducerPath]: webSocketApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
