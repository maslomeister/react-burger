import { createListenerMiddleware } from "@reduxjs/toolkit";

import {
  wsInit,
  wsSuccess,
  wsError,
  wsClose,
  wsClosed,
  wsAddMessages,
} from "../reducers/orders-web-socket";

const wsUrl = "wss://norma.nomoreparties.space";

export const socketMiddleware = createListenerMiddleware();

let socket: WebSocket;

socketMiddleware.startListening({
  actionCreator: wsInit,
  effect: async (action, listenerApi) => {
    if (action.payload.token) {
      socket = new WebSocket(`${wsUrl}/orders?token=${action.payload.token}`);
    } else {
      socket = new WebSocket(`${wsUrl}/orders/all`);
    }

    if (socket) {
      socket.onopen = () => {
        listenerApi.dispatch(wsSuccess());
      };

      socket.onerror = (event) => {
        const error = JSON.stringify(event);
        listenerApi.dispatch(wsError(error));
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        listenerApi.dispatch(wsAddMessages(restParsedData));
      };

      socket.onclose = () => {
        listenerApi.dispatch(wsClosed());
      };
    }
  },
});

socketMiddleware.startListening({
  actionCreator: wsClose,
  effect: async () => {
    socket.close();
  },
});
