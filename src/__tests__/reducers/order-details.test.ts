import { configureStore } from "@reduxjs/toolkit";

import reducer, {
  initialState,
  getOrderNumber,
  getOrderByNumber,
} from "../../services/reducers/order-details/order-details";

const bun = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

const ingredients = [
  {
    _id: "60d3b41abdacab0026a733ce",
    name: "Соус традиционный галактический",
    type: "sauce",
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733ce",
    name: "Соус традиционный галактический",
    type: "sauce",
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    __v: 0,
  },
];

describe("Redux order details reducer", () => {
  let store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initialState,
    });
  });

  afterEach(() => {
    jest.spyOn(global, "fetch").mockClear();
  });

  test("Should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("Should get order number", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({ order: { number: 2222 }, success: true }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(
      getOrderNumber({
        ingredients,
        bun,
        accessToken: "token",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      error: "",
      orderNumber: 2222,
      status: "getOrderNumber/succeeded",
    });
  });

  test("Should fail to get order number", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(
      getOrderNumber({
        ingredients,
        bun,
        accessToken: "token",
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      error: "Rejected",
      orderNumber: 0,
      status: "getOrderNumber/failed",
    });
  });

  test("Should get order info", async () => {
    const orderData = {
      createdAt: Date.now().toString(),
      ingredients: ingredients,
      name: "Бургер",
      number: 25,
      status: "created",
      updatedAt: Date.now().toString(),
      _id: "1111",
    };

    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({ orders: [orderData], success: true }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(getOrderByNumber(25));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      error: "",
      orderNumber: 0,
      orderData,
      status: "getOrderByNumber/succeeded",
    });
  });

  test("Should fail to get order info", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(getOrderByNumber(25));

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      error: "Rejected",
      orderNumber: 0,
      status: "getOrderByNumber/failed",
    });
  });
});
