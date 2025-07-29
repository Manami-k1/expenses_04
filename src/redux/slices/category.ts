import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Item } from "@/types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const initialState: { categories: Category[] } = {
  categories: [],
};
export const fetchCategory = createAsyncThunk(
  "data/fetchCategory",
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const categoriesData = await response.json();
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
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        return rejectWithValue(errorText);
      }

      const data = await response.json();
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

export const deleteCategoryFromDB = createAsyncThunk(
  "data/deleteCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
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
