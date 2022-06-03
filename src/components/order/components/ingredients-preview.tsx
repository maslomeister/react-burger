import React from "react";

import { IngredientCircleImage } from "../../ingredient-circle-image/ingredient-circle-image";

import styles from "./ingredients-preview.module.css";

type Props = {
  ingredients: IIngredient[];
};

export function IngredientsPreview({ ingredients }: Props) {
  const localIngredients = ingredients.slice(0, 6);
  const amountOfHiddenIngredients =
    ingredients.length - localIngredients.length;

  return (
    <div className={styles["ingredients-parent"]}>
      {localIngredients.map((ingredient, i) => {
        return (
          <IngredientCircleImage
            position={i}
            image={ingredient.image}
            amount={i === 6 ? amountOfHiddenIngredients : undefined}
            key={ingredient._uniqueId}
          />
        );
      })}
    </div>
  );
}
