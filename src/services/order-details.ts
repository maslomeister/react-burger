import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IIngredient, createOrder } from "../utils/api";

interface SliceState {
  orderNumber: number;
  status: string;
  error: string;
}

const initialState: SliceState = {
  orderNumber: 0,
  status: "",
  error: "",
};

export const getOrderNumber = createAsyncThunk(
  "ingredients/getOrderNumber",
  async ({
    ingredients,
    bun,
  }: {
    ingredients: IIngredient[];
    bun: IIngredient;
  }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: [...ingredients.map(({ _id }) => _id), bun._id],
      }),
    };

    const response = await createOrder(requestOptions);
    return response;
  }
);

export const orderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrderNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderNumber = action.payload;
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.orderNumber = 0;
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export default orderDetails.reducer;
