import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { imageMotion, textMotion } from "./motion-config";
import { IngredientCounter } from "./ingredient-counter/ingredient-counter";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import {
  addIngredient,
  addOrReplaceBun,
} from "../../../../services/reducers/burger-constructor/burger-constructor";

import styles from "./burger-ingredients-item.module.css";

interface BurgerIngredientItemPropTypes {
  counter: number;
  ingredient: IIngredient;
  onClick: () => void;
}

function BurgerIngredientItem({
  counter,
  ingredient,
  onClick,
}: BurgerIngredientItemPropTypes) {
  const dispatch = useAppDispatch();
  const { bun } = useAppSelector((state) => state.constructorIngredients);
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const shouldAddBunText = useMemo(() => {
    if (ingredient.type === "bun") {
      if (bun._id === ingredient._id) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }, [ingredient, bun]);

  const addIngredientMobile = () => {
    if (ingredient.type === "bun") {
      dispatch(addOrReplaceBun(ingredient));
    } else {
      dispatch(addIngredient({ ingredient, uniqueId: uuidv4() }));
    }
  };

  return (
    <motion.div
      className={`${styles["item"]} mt-6 mb-10`}
      whileHover="hover"
      variants={textMotion}
      ref={isMobileOrTablet ? undefined : dragRef}
    >
      <div className={styles["item__image-container"]}>
        <motion.img
          className={`${styles["item__image"]} ml-4 mr-4`}
          onClick={onClick}
          alt="previewImage"
          src={ingredient.image_large}
          variants={imageMotion}
          data-test-id={ingredient._id}
        />
      </div>
      <div className={`${styles["item_price"]} mb-1 mt-1`}>
        <p className="text text_type_digits-small mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles["item_name"]} text text_type_main-small`}>
        {ingredient.name}
      </p>
      {isMobileOrTablet && shouldAddBunText && (
        <p
          className={`${styles["item-add"]} text text_type_main-small mt-10 noselect`}
          onClick={addIngredientMobile}
        >
          Добавить
        </p>
      )}
      <IngredientCounter count={counter} />
    </motion.div>
  );
}

export const BurgerIngredientItemMemoized = memo(BurgerIngredientItem);
