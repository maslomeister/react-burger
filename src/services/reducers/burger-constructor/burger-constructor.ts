import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import missingIcon from "../../../assets/images/missing-icon.svg";

export interface SliceState {
  ingredients: IIngredient[];
  bun: IIngredient;
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
  ingredients: IIngredient[],
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
    addIngredient: (
      state: SliceState,
      action: PayloadAction<{ ingredient: IIngredient; uniqueId: string }>
    ) => {
      state.ingredients.push({
        ...action.payload.ingredient,
        uniqueId: action.payload.uniqueId,
      });
    },
    loadIngredients: {
      reducer: (state: SliceState, action: PayloadAction<SliceState>) => {
        return (state = action.payload);
      },
      prepare: (value) => {
        const payload = JSON.parse(value);
        return {
          payload,
        };
      },
    },
    removeIngredient: (
      state: SliceState,
      action: PayloadAction<IIngredient>
    ) => {
      const filteredIngredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
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
    addOrReplaceBun: (state, action: PayloadAction<IIngredient>) => {
      state.bun = action.payload;
    },
    removeBun: (state) => {
      let newState = { ...state, bun: initialState.bun };
      return newState;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  addIngredient,
  loadIngredients,
  removeIngredient,
  moveIngredient,
  addOrReplaceBun,
  removeBun,
  resetState,
} = constructorIngredients.actions;

export default constructorIngredients.reducer;
