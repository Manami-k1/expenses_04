import { expReducer } from "./slices/exp";
import { userReducer, userSlice } from "./slices/user";
import { configureStore } from "@reduxjs/toolkit";

export const { changeFirstName, changeLastName } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userReducer,
    exp: expReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
