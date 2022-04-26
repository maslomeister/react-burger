import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { addDataToPage } from "../../services/ingredient-details";

import styles from "./ingredient.module.css";

export function Ingredient() {
  let content;
  const dispatch = useAppDispatch();

  const params = useParams();

  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const [ingredientExists, setIngredientExists] = useState(false);

  useEffect(() => {
    const ingredient = ingredients.find((obj) => obj._id === params.id);
    if (ingredient) {
      setIngredientExists(true);
      dispatch(
        addDataToPage({
          modalImage: ingredient.image_large,
          modalName: ingredient.name,
          modalCalories: ingredient.calories,
          modalProteins: ingredient.price,
          modalFat: ingredient.fat,
          modalCarbohydrates: ingredient.carbohydrates,
        })
      );
    }
  }, [dispatch, params.id, ingredients, params]);

  if (ingredientExists) {
    content = <IngredientDetails />;
  } else {
    content = (
      <p className={`${styles["text-shadow"]} text text_type_main-large`}>
        Такого ингредиента не существует
      </p>
    );
  }

  return <div className={styles["container"]}>{content}</div>;
}
