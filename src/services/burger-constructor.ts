import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { NewIngredient, Ingredient } from "../utils/burger-api";

import missingIcon from "../assets/images/missing-icon.svg";

interface SliceState {
  ingredients: NewIngredient[];
  bun: Ingredient;
}

interface MoveIngredients {
  hoverIndex: number;
  dragIndex: number;
}

const initialState: SliceState = {
  ingredients: [],
  bun: {
    _id: "",
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
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      const newIngredient: NewIngredient = {
        ...action.payload,
        _uniqueId: uuidv4(),
      };
      state.ingredients.push(newIngredient);
    },
    removeIngredient: (
      state: SliceState,
      action: PayloadAction<NewIngredient>
    ) => {
      const filteredIngredients = state.ingredients.filter(
        (item) => item._uniqueId !== action.payload._uniqueId
      );
      state.ingredients = filteredIngredients;
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
    addOrReplaceBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload;
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
