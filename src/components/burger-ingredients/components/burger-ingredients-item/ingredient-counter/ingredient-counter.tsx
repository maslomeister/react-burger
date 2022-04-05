import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../../../services/hooks";

interface Types {
  ingredientId: string;
}

export default function IngredientCounter({ ingredientId }: Types) {
  const counterIndex = useAppSelector((state) =>
    state.constructorIngredients.counters.findIndex(
      (obj) => obj._id === ingredientId
    )
  );

  const getCount = useAppSelector(
    (state) => state.constructorIngredients.counters[counterIndex]?.count
  );

  let count = 0;
  count = getCount != null ? getCount : 0;
  return <>{count !== 0 && <Counter count={count} size="default" />}</>;
}
