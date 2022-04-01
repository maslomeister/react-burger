import React from "react";
import { motion } from "framer-motion";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { imageMotion, textMotion } from './motion-config';

import itemStyles from "./burger-ingredients-item.module.css";

interface BurgerIngredientItemPropTypes {
  imageSrc: string;
  name: string;
  price: number;
  onClick: () => void;
}

function BurgerIngredientItem({
  onClick,
  imageSrc,
  name,
  price,
}: BurgerIngredientItemPropTypes) {
  return (
    <motion.div
      className={`${itemStyles["item"]} ml-4 mr-5 mb-10 mt-6`}
      onClick={onClick}
      whileHover="hover"
      variants={textMotion}
    >
      <motion.div>
        <motion.img
          className={`${itemStyles["item__image"]} ml-4 mr-5`}
          alt="previewImage"
          src={imageSrc}
          variants={imageMotion}
        />
      </motion.div>
      <div className={`${itemStyles["item_price"]} mb-1 mt-1`}>
        <p className="text text_type_digits-small mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${itemStyles["item_name"]} text text_type_main-small`}>
        {name}
      </p>
      <Counter count={1} size="default" />
    </motion.div>
  );
}

//export default BurgerIngredientItem;
export default React.memo(BurgerIngredientItem);
