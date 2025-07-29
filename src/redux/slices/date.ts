import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  selectedDate: string | null;
}

const initialState: DateState = {
  selectedDate: null,
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    clearSelectedDate: (state) => {
      state.selectedDate = null;
    },
  },
});

export const { setSelectedDate, clearSelectedDate } = dateSlice.actions;

export const dateReducer = dateSlice.reducer;
