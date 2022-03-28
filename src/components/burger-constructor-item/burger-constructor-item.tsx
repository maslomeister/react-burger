import React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import constructorItemStyles from "./burger-constructor-item.module.css";

type Item = {
  _id: string;
  image: string;
  text: string;
  price: number;
};

interface BurgerConstructorItemPropTypes {
  item: Item;
  handleClose: () => void;
}

function BurgerConstructorItem({
  item,
  handleClose,
}: BurgerConstructorItemPropTypes) {
  return (
    <div className={constructorItemStyles["ingredient"]}>
      <div className={constructorItemStyles["_draggable"]}>
        <DragIcon type="primary" />
      </div>

      <div className={constructorItemStyles["constructor-element-wrapper"]}>
        <ConstructorElement
          text={item.text}
          price={item.price}
          thumbnail={item.image}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
export default BurgerConstructorItem;
