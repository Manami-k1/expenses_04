import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";
import { Category, Item } from "@/types";

const initialState: { categories: Category[] } = {
  categories: [],
};
export const fetchCategory = createAsyncThunk(
  "data/fetchCategory",
  async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*");

      if (categoriesError) {
        console.error("Supabase Error:", categoriesError);
        throw new Error(categoriesError.message);
      }

      console.log("Fetched Categories:", categoriesData);
      return { categoriesData };
    } catch (error) {
      console.error("Unexpected Error:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const addCategoryToDB = createAsyncThunk(
  "data/addCategory",
  async (newCategory: Omit<Item, "id">, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([newCategory])
        .select("*")
        .single();

      if (error) {
        console.error("Supabase Error:", error);
        return rejectWithValue(error.message);
      }

      console.log("Added Category:", data);
      return data;
    } catch (error) {
      console.error("Unexpected Error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload); // カテゴリーを追加
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload.categoriesData || [];
    });
  },
});

export const { addCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer; // reducer名を適切に修正
