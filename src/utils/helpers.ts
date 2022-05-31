import { v4 as uuidv4 } from "uuid";

export function generateIngredientsFromIds(
  allIngredients: Array<IIngredient>,
  receivedIngredients: Array<string>
): Array<IIngredient> {
  return receivedIngredients.map((ingredient) => {
    const foundIngredient = allIngredients.filter(
      (item) => item._id === ingredient
    )[0];

    const newObject = { ...foundIngredient, _uniqueId: uuidv4() };
    return newObject;
  });
}

export function getTotalPriceOfIngredients(
  ingredients: Array<IIngredient>
): number {
  return ingredients.reduce((acc, obj) => {
    if (obj.type === "bun") {
      return acc + obj.price * 2;
    } else return acc + obj.price;
  }, 0);
}
