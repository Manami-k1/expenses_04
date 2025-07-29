import { expReducer } from "./slices/exp";
import { userReducer, userSlice } from "./slices/user";
import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/category";
import { dateReducer } from "./slices/date";


export const { changeFirstName, changeLastName } = userSlice.actions;

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     exp: expReducer,
//     category: categoryReducer,
//     date: dateReducer
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/api/baseApi'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    exp: expReducer,
    category: categoryReducer,
    date: dateReducer
  },
  middleware: (gdm) => gdm().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;