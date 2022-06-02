import { v4 as uuidv4 } from "uuid";

interface IElem {
  name: number;
  [key: string]: number;
}

export function generateIngredientsFromIds(
  allIngredients: Array<IIngredient>,
  receivedIngredients: Array<string>
): Array<IIngredient> {
  return receivedIngredients.map((ingredient) => {
    const foundIngredient = allIngredients.filter(
      (item) => item._id === ingredient
    )[0];

    return { ...foundIngredient, _uniqueId: uuidv4() };
  });
}

export function getTotalPriceOfIngredients(
  ingredients: Array<IIngredient>
): number {
  return ingredients.reduce(
    (acc, obj) => acc + (obj.type === "bun" ? obj.price * 2 : obj.price),
    0
  );
}

export function generateIngredientsWithAmount(
  allIngredients: Array<IIngredient>,
  receivedIngredients: Array<string>
): Array<IIngredientWithAmount> {
  const uniq = receivedIngredients
    .map((name) => {
      return {
        count: 1,
        id: name,
      };
    })
    .reduce<IElem>((result, b) => {
      result[b.id] = (result[b.id] || 0) + b.count;
      return result;
    }, {} as IElem);

  return Object.keys(uniq).map((key) => {
    const foundIngredient = allIngredients.filter(
      (item) => item._id === key
    )[0];

    return {
      ...foundIngredient,
      _uniqueId: uuidv4(),
      amount: foundIngredient.type === "bun" ? uniq[key] * 2 : uniq[key],
    };
  });
}

export function getTotalPriceOfIngredientsWithAmount(
  ingredients: Array<IIngredientWithAmount>
): number {
  return ingredients.reduce((acc, obj) => {
    return acc + obj.price * obj.amount;
  }, 0);
}
