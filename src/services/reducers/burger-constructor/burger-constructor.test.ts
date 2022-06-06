import reducer, { SliceState, addIngredient } from "./burger-constructor";

import missingIcon from "../../../assets/images/missing-icon.svg";

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

const newIngredient: IIngredient = {
  _id: "60d3b41abdacab0026a733c9",
  name: "Мясо бессмертных моллюсков Protostomia",
  type: "main",
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  __v: 0,
};

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual(initialState);
});

test("Should handle addition of ingredient to empty initial state", () => {
  expect(reducer(initialState, addIngredient(newIngredient))).toEqual({
    ...initialState,
    ingredients: [{ newIngredient }],
  });
});
