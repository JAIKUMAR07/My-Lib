import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: booksReducer,
  },
});
