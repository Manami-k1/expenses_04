import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const USER_SLICE_NAME = "user";

type UserState = {
  id: string;
  firstName: string;
  lastName: string;
};

const initialState: UserState = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    changeFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    changeLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
  },
});

export const { changeFirstName, changeLastName } = userSlice.actions;
export const userReducer = userSlice.reducer;
