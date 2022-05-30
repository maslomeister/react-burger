import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

import { socketMiddleware } from "./middleware/socket-middleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;

export default store;
