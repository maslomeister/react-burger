import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewIngredient } from "../../../utils/burger-api";
import missingIcon from "../../../assets/images/missing-icon.svg";

interface BunCounter {
  _id: string;
  count: number;
}

interface Counter {
  _id: string;
  count: number;
}

interface SliceState {
  ingredients: NewIngredient[];
  counters: Counter[];
  bun: NewIngredient;
  bunCounter: BunCounter;
  totalPrice: number;
}

interface MoveIngredients {
  hoverIndex: number;
  dragIndex: number;
}

const initialState: SliceState = {
  ingredients: [],
  counters: [],
  bun: {
    _id: "",
    _uniqueId: "",
    name: "Нет булки",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: missingIcon,
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
  bunCounter: {
    _id: "",
    count: 0,
  },
  totalPrice: 0,
};

function arraymove(
  ingredients: NewIngredient[],
  fromIndex: number,
  toIndex: number
) {
  var element = ingredients[fromIndex];
  ingredients.splice(fromIndex, 1);
  ingredients.splice(toIndex, 0, element);
}

export const constructorIngredients = createSlice({
  name: "constructorIngredients",
  initialState,
  //Жесть...
  reducers: {
    addIngredient: (state, action: PayloadAction<NewIngredient>) => {
      state.ingredients.push(action.payload);

      const counterIndex = state.counters.findIndex(
        (obj) => obj._id === action.payload._id
      );

      if (counterIndex !== -1) {
        state.counters[counterIndex].count =
          state.counters[counterIndex].count + 1;
      } else {
        state.counters.push({ _id: action.payload._id, count: 1 });
      }

      const newPrice = state.totalPrice + action.payload.price;
      state.totalPrice = newPrice;
    },
    removeIngredient: (
      state: SliceState,
      action: PayloadAction<NewIngredient>
    ) => {
      const filteredIngredients = state.ingredients.filter(
        (item) => item._uniqueId !== action.payload._uniqueId
      );

      const counterIndex = state.counters.findIndex(
        (obj) => obj._id === action.payload._id
      );

      if (counterIndex !== -1) {
        state.counters[counterIndex].count =
          state.counters[counterIndex].count - 1;
      }

      const newPrice = state.totalPrice - action.payload.price;
      state.ingredients = filteredIngredients;
      state.totalPrice = newPrice;
    },
    moveIngredient: (
      state: SliceState,
      action: PayloadAction<MoveIngredients>
    ) => {
      let newIngredients = [...state.ingredients];
      arraymove(
        newIngredients,
        action.payload.dragIndex,
        action.payload.hoverIndex
      );
      state.ingredients = newIngredients;
    },
    addOrReplaceBun: (state, action: PayloadAction<NewIngredient>) => {
      let oldPrice = 0;
      let newPrice = 0;

      if (state.bunCounter._id === "") {
      } else if (state.bunCounter._id !== action.payload._id) {
        oldPrice = state.bun.price * 2;
      }

      state.bunCounter.count = 1;
      state.bunCounter._id = action.payload._id;

      newPrice = state.totalPrice - oldPrice + action.payload.price * 2;

      state.bun = action.payload;
      state.totalPrice = newPrice;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  addOrReplaceBun,
  resetState,
} = constructorIngredients.actions;

export default constructorIngredients.reducer;
