import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import booksReducer from "./booksSlice";
import usersReducer from "./usersSlice";
import issuesReducer from "./issuesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: booksReducer,
    users: usersReducer,
    issues: issuesReducer,
  },
});
