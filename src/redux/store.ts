import { expReducer } from "./slices/exp";
import { userReducer, userSlice } from "./slices/user";
import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/category";

export const { changeFirstName, changeLastName } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userReducer,
    exp: expReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
