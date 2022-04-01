import { memo } from "react";

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
  draggable?: boolean;
  top?: string;
  bottomPadding?: boolean;
  topPadding?: boolean;
  handleClose?: () => void;
}

function BurgerConstructorItem({
  item,
  draggable,
  top,
  bottomPadding,
  topPadding,
  handleClose,
}: BurgerConstructorItemPropTypes) {
  return (
    <div className={`ml-4 mr-4 ${bottomPadding ? "mb-4" : ""} ${topPadding ? "mt-4" : ""}`}>
      <div className={constructorItemStyles["ingredient"]}>
        {draggable && (
          <div className={constructorItemStyles["_draggable"]}>
            <DragIcon type="primary" />
          </div>
        )}

        <div className={constructorItemStyles["constructor-element-wrapper"]}>
          <ConstructorElement
            type={
              top === "top" ? "top" : top === "bottom" ? "bottom" : undefined
            }
            isLocked={draggable ? undefined : true}
            text={`${item.text} ${
              top === "top" ? "(верх)" : top === "bottom" ? "(низ)" : ""
            }`}
            price={item.price}
            thumbnail={item.image}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export default BurgerConstructorItem;
