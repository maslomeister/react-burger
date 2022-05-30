import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IToken {
  token?: string;
}

interface ISliceState {
  wsConnected: boolean;
  error: string;
  ordersData?: IOrdersData;
}

const initialState: ISliceState = {
  wsConnected: false,
  error: "",
};

export const ordersWebSocket = createSlice({
  name: "feedPage",
  initialState,
  reducers: {
    wsInit: (_, action: PayloadAction<IToken>) => {},
    wsClose: () => {},
    wsSuccess: (state) => {
      return {
        ...state,
        wsConnected: true,
      };
    },
    wsError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    },
    wsClosed: (state) => {
      return {
        ...state,
        wsConnected: false,
      };
    },
    wsAddMessages: (state, action: PayloadAction<IOrdersData>) => {
      return {
        ...state,
        ordersData: action.payload,
      };
    },
  },
});

export const { wsInit, wsSuccess, wsError, wsClose, wsClosed, wsAddMessages } =
  ordersWebSocket.actions;

export default ordersWebSocket.reducer;
