import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients, Ingredient } from "../../../utils/burger-api";

interface SliceState {
  ingredients: Ingredient[];
  status: string;
  error: string;
}

const initialState: SliceState = {
  ingredients: [],
  status: "idle",
  error: "",
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await getIngredients();
    return response;
  }
);

export const allIngredients = createSlice({
  name: "allIngredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = state.ingredients.concat(action.payload);
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export default allIngredients.reducer;
