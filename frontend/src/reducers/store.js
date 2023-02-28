import OrderReducer from "./OrderReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    orders: OrderReducer,
  },
});
