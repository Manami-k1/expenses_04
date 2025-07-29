import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentMonth } from "@/utils/formatDate";
import { updateTotalPrice } from "@/utils/price";
import { ExpsState, Item } from "@/types";
import { getCurrentDateLocal } from "@/hooks/useCurrentDate";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const initialState: ExpsState = {
  items: [],
  totalMonthPrice: [],
  totalDayPrice: [],
};

export const fetchExp = createAsyncThunk(
  "data/fetchData",
  async ({
    year,
    month,
    day,
  }: {
    year?: number;
    month?: number;
    day?: number;
  }) => {
    const params = new URLSearchParams();

    if (year !== undefined) params.append("year", String(year));
    if (month !== undefined) params.append("month", String(month));
    if (day !== undefined) params.append("day", String(day));

    const response = await fetch(`${API_BASE_URL}/api/items?${params.toString()}`);
    if (!response.ok) throw new Error("API接続失敗");
    const expsData = await response.json();
    return { expsData };
  }
);


export const addExpToDB = createAsyncThunk(
  "data/addExp",
  async (newExp: Omit<ExpsState, "id">, { rejectWithValue }) => {

    try {
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        // const response = await fetch("http://localhost:8080/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExp),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        return rejectWithValue(errorText);
      }

      const data = await response.json();
      console.log("Added Exp:", data);
      const now = new Date();

      return data;
    } catch (error) {
      console.error("Unexpected Error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);
export const deleteExpFromDB = createAsyncThunk(
  "data/deleteExp",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        return rejectWithValue(errorText);
      }

      return id; 
    } catch (error) {
      console.error("Unexpected Error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);


const recalculateTotals = (state: ExpsState) => {
  state.totalMonthPrice = updateTotalPrice(state.items, getCurrentMonth(), "month");
  state.totalDayPrice = updateTotalPrice(state.items, getCurrentDateLocal(), "day");
};

// addExp内での使用
// recalculateTotals(state);

// removeExp内での使用
// recalculateTotals(state);


const expSlice = createSlice({
  name: "totalExp",
  initialState,
  reducers: {
    totalMonthExp: (state) => {
      state.totalMonthPrice = updateTotalPrice(state.items, getCurrentMonth(), "month");
    },
    totalDayExp: (state) => {
      state.totalDayPrice = updateTotalPrice(state.items, getCurrentDateLocal(), "day");
    },
    addExp: (state, action: PayloadAction<Item>) => {
      if (action.payload.price <= 0) return;
      state.items.push(action.payload);
      recalculateTotals(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExp.fulfilled, (state, action) => {
        state.items = action.payload.expsData || [];
        recalculateTotals(state);
      })
      .addCase(deleteExpFromDB.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        recalculateTotals(state);
      })
      .addCase(deleteExpFromDB.rejected, (state, action) => {
        console.error("削除失敗:", action.payload);
      });
  },
});

export const { totalMonthExp, totalDayExp, addExp } = expSlice.actions;
export const expReducer = expSlice.reducer;