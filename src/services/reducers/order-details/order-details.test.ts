import configureMockStore from "redux-mock-store";

import reducer, {
  initialState,
  getOrderNumber,
  getOrderByNumber,
} from "./order-details";

describe("Redux order details store", () => {
  // const mockStore = configureMockStore(initialState)
  it("Should set status to 'getOrderNumber/loading when pending'", () => {
    const action = { type: getOrderNumber.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "getOrderNumber/loading",
    });
  });

  it("Should set status 'getOrderNumber/succeeded' and order number when fulfilled", () => {
    const action = { type: getOrderNumber.fulfilled.type, payload: 1 };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "getOrderNumber/succeeded",
      orderNumber: 1,
    });
  });

  it("Should set status 'getOrderNumber/failed' and error when failed", () => {
    const action = {
      type: getOrderNumber.rejected.type,
      error: { message: "Ошибка" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "getOrderNumber/failed",
      orderNumber: 0,
      error: "Ошибка",
    });
  });

  it("Should set status 'getOrderByNumber/pending'", () => {
    const action = {
      type: getOrderByNumber.pending.type,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "getOrderByNumber/loading",
    });
  });

  it("Should set status 'getOrderByNumber/succeeded'", () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: {
        ingredients: [],
        bun: {},
        accessToken: "",
      },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "getOrderByNumber/succeeded",
    });
  });
});
