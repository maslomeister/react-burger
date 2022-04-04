import { memo } from "react";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { imageMotion, textMotion } from "./motion-config";
import { useAppSelector } from "../../../app/hooks";

import itemStyles from "./burger-ingredients-item.module.css";

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface BurgerIngredientItemPropTypes {
  ingredient: Ingredient;
  onClick: () => void;
}

function BurgerIngredientItem({
  ingredient,
  onClick,
}: BurgerIngredientItemPropTypes) {
  const counterIndex = useAppSelector((state) =>
    state.constructorIngredients.counters.findIndex(
      (obj) => obj._id === ingredient._id
    )
  );

  const getCount = useAppSelector(
    (state) => state.constructorIngredients.counters[counterIndex]?.count
  );

  const bun = useAppSelector(
    (state) => state.constructorIngredients.bunCounter
  );

  let count = 0;
  count = getCount != null ? getCount : 0;
  if (bun._id && ingredient._id === bun._id) {
    count = 1;
  } else {
    count = getCount != null ? getCount : 0;
  }

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <motion.div
      className={`${itemStyles["item"]} ml-4 mr-5 mb-10 mt-6`}
      onClick={onClick}
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
