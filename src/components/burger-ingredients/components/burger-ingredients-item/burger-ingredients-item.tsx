import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";
import memoize from "fast-memoize";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { imageMotion, textMotion } from "./motion-config";
import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import { addDataToModal } from "../../../services/reducers/ingredient-details";
import { Ingredient } from "../../../../utils/burger-api";

import itemStyles from "./burger-ingredients-item.module.css";

interface BurgerIngredientItemPropTypes {
  ingredient: Ingredient;
}

function BurgerIngredientItem({ ingredient }: BurgerIngredientItemPropTypes) {
  const dispatch = useAppDispatch();
  const counterIndex = useAppSelector((state) =>
    state.constructorIngredients.counters.findIndex(
      (obj) => obj._id === ingredient._id
    )
  );

  const getCount = useAppSelector(
    (state) => state.constructorIngredients.counters[counterIndex]?.count
  );

  let count = 0;
  count = getCount != null ? getCount : 0;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const modalData = useMemo(
    () =>
      memoize((ingredient: Ingredient) => () => {
        dispatch(
          addDataToModal({
            modalImage: ingredient.image_large,
            modalName: ingredient.name,
            modalCalories: ingredient.calories,
            modalProteins: ingredient.price,
            modalFat: ingredient.fat,
            modalCarbohydrates: ingredient.carbohydrates,
          })
        );
      }),
    [dispatch]
  );

  return (
    <motion.div
      className={`${itemStyles["item"]} ml-4 mr-5 mb-10 mt-6`}
      onClick={modalData(ingredient)}
      whileHover="hover"
      variants={textMotion}
      ref={dragRef}
    >
      <motion.div>
        <motion.img
          className={`${itemStyles["item__image"]} ml-4 mr-5`}
          alt="previewImage"
          src={ingredient.image_large}
          variants={imageMotion}
        />
      </motion.div>
      <div className={`${itemStyles["item_price"]} mb-1 mt-1`}>
        <p className="text text_type_digits-small mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${itemStyles["item_name"]} text text_type_main-small`}>
        {ingredient.name}
      </p>
      {count !== 0 && <Counter count={count} size="default" />}
    </motion.div>
  );
}

export default memo(BurgerIngredientItem);
