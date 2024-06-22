import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/Todo/todoSilce.js";

export const store = configureStore({
  reducer: todoReducer,
});
