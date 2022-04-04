import { memo } from "react";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { imageMotion, textMotion } from "./motion-config";
import IngredientCounter from "./ingredient-counter/ingredient-counter";
import { Ingredient } from "../../../../utils/burger-api";

import itemStyles from "./burger-ingredients-item.module.css";

interface BurgerIngredientItemPropTypes {
  ingredient: Ingredient;
  onClick: () => void;
}

function BurgerIngredientItem({
  ingredient,
  onClick,
}: BurgerIngredientItemPropTypes) {
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
      <IngredientCounter ingredientId={ingredient._id} />
    </motion.div>
  );
}

export default memo(BurgerIngredientItem);
