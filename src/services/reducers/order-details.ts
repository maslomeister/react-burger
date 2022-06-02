import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { createOrder, getOrder } from "../../utils/api";
import { getCookie } from "../../utils/utils";

interface SliceState {
  orderNumber: number;
  orderData?: IOrder;
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
    const accessToken = getCookie("accessToken");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({
        ingredients: [bun._id, ...ingredients.map(({ _id }) => _id)],
      }),
    };

    const response = await createOrder(requestOptions);
    return response;
  }
);

export const getOrderByNumber = createAsyncThunk(
  "ingredients/getOrderByNumber",
  async (number: number) => {
    const response = await getOrder(number);
    return response;
  }
);

export const orderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addDataToModal: (state, action: PayloadAction<IOrder>) => {
      return { ...state, orderData: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderNumber.pending, (state) => {
        state.status = "getOrderNumber/loading";
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.status = "getOrderNumber/succeeded";
        state.orderNumber = action.payload;
      })
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.orderNumber = 0;
        state.status = "getOrderNumber/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.status = "getOrderByNumber/loading";
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.status = "getOrderByNumber/succeeded";
        state.orderData = action.payload[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderNumber = 0;
        state.status = "getOrderByNumber/failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { addDataToModal } = orderDetails.actions;

export default orderDetails.reducer;
