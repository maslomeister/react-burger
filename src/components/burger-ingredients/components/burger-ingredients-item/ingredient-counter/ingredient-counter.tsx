import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

interface Types {
  count: number;
}

export function IngredientCounter({ count }: Types) {
  return <>{count && <Counter count={count} size="default" />}</>;
}
