import { ExpsState, Item } from "@/types";
import { getCurrentMonth } from "@/utils/formatDate";
import { updateTotalPrice } from "@/utils/price";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type Item = {
//   id: number;
//   name: string;
//   price: number;
//   category: number;
//   date: string;
// };

// type ExpsState = {
//   items: Item[];
//   totalMonthPrice: { date: string; total: number }[];
//   totalDayPrice: { date: string; total: number }[];
// };

// const initialState: ExpsState = {
//   items: [
//     { id: 1, name: "商品1", price: 1000, category: 1, date: "2025-02-01" },
//     { id: 2, name: "商品2", price: 2000, category: 1, date: "2025-02-01" },
//     { id: 3, name: "商品2", price: 2000, category: 1, date: "2025-02-01" },
//   ],
//   totalMonthPrice: 0,
//   totalDayPrice: 0,
// };
const initialState: ExpsState = {
  items: [
    { id: 1, name: "商品1", price: 1000, category: 1, date: "2025-02-01" },
    { id: 2, name: "商品2", price: 2000, category: 1, date: "2025-02-01" },
    { id: 3, name: "商品3", price: 2000, category: 1, date: "2025-02-02" },
  ],
  totalMonthPrice: [{ date: "2024-01", total: 3000 }],
  totalDayPrice: [],
};

const expSlice = createSlice({
  name: "totalExp",
  initialState,
  reducers: {
    totalMonthExp: (state) => {
      const date = getCurrentMonth();
      // const totalPrice = state.items.reduce((sum, item) => {
      //   if (item.date.startsWith(date)) {
      //     return sum + item.price;
      //   }
      //   return sum;
      // }, 0);
      state.totalMonthPrice = updateTotalPrice(
        state.items,
        date,
        state.totalMonthPrice
      );

      // state.totalMonthPrice = [
      //   ...state.totalMonthPrice.filter((item) => item.date !== date), // 現在の月の項目を除外
      //   { date, total: totalPrice }, // 新しいエントリを追加（または更新）
      // ];
    },
    totalDayExp: (state) => {
      const date = new Date().toISOString().split("T")[0];
      state.totalDayPrice = updateTotalPrice(
        state.items,
        date,
        state.totalDayPrice
      );
    },

    addExp: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      state.totalMonthPrice = updateTotalPrice(
        state.items,
        getCurrentMonth(),
        state.totalMonthPrice
      );
      state.totalDayPrice = updateTotalPrice(
        state.items,
        new Date().toISOString().split("T")[0],
        state.totalDayPrice
      );
    },
  },
});

export const { totalMonthExp, totalDayExp, addExp } = expSlice.actions;

export const expReducer = expSlice.reducer;
