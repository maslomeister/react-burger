import React, { memo } from "react";

import { useAppSelector } from "../../../services/hooks";
import Tabs from "../../../../utils/tabs-data";
import BurgerIngredientItem from "../../components/burger-ingredients-item/burger-ingredients-item";

import styles from "./burger-ingredients-items.module.css";

function BurgerIngredientsItems() {
  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  return (
    <>
      {Tabs.map((tab) => (
        <section key={tab._id} className={`${tab._id}`}>
          <p className="text text_type_main-medium">{tab.name}</p>
          <div className={`${styles["item-container"]} ml-4`}>
            {ingredients.map((ingredient) => (
              <BurgerIngredientItem
                key={ingredient._id}
                ingredient={ingredient}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default memo(BurgerIngredientsItems);
