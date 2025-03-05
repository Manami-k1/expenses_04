import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";
import { getCurrentDate } from "@/hooks/useCurrentDate";
import { getCurrentMonth } from "@/utils/formatDate";
import { updateTotalPrice } from "@/utils/price";
import { ExpsState, Item } from "@/types";

const initialState: ExpsState = {
  items: [],
  totalMonthPrice: [],
  totalDayPrice: [],
};
export const fetchExp = createAsyncThunk("data/fetchData", async () => {
  try {
    const { data: expsData, error: expsError } = await supabase
      .from("exps")
      .select("*");

    if (expsError) {
      console.error("Supabase Error:", expsError);
      throw new Error(expsError.message);
    }

    console.log("Fetched Data:", expsData);
    return { expsData };
  } catch (error) {
    console.error("Unexpected Error:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
});
export const addExpToDB = createAsyncThunk(
  "data/addExp",
  async (newExp: Omit<ExpsState, "id">, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("exps")
        .insert([newExp])
        .select("*")
        .single();

      if (error) {
        console.error("Supabase Error:", error);
        return rejectWithValue(error.message || "Supabase error occurred");
      }

      console.log("Added Exps:", data);
      return data;
    } catch (error) {
      console.error("Unexpected Error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const expSlice = createSlice({
  name: "totalExp",
  initialState,
  reducers: {
    totalMonthExp: (state) => {
      state.totalMonthPrice = updateTotalPrice(
        state.items,
        getCurrentMonth(),
        "month"
      );
    },
    totalDayExp: (state) => {
      state.totalDayPrice = updateTotalPrice(
        state.items,
        getCurrentDate(),
        "day"
      );
    },
    addExp: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      // 月ごとの合計を更新
      expSlice.caseReducers.totalMonthExp(state);
      // 日ごとの合計を更新
      expSlice.caseReducers.totalDayExp(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExp.fulfilled, (state, action) => {
      state.items = action.payload.expsData || [];
      // 月ごとの合計を更新
      expSlice.caseReducers.totalMonthExp(state);
      // 日ごとの合計を更新
      expSlice.caseReducers.totalDayExp(state);
    });
  },
});

export const { totalMonthExp, totalDayExp, addExp } = expSlice.actions;
export const expReducer = expSlice.reducer;
