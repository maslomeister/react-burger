import { memo } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { NewIngredient } from "../../../../utils/burger-api";

import bunItemStyles from "../burger-item.module.css";

interface BurgerConstructorItemTypes {
  ingredient: NewIngredient;
  top?: string;
  bottomPadding?: boolean;
  topPadding?: boolean;
  handleClose?: () => void;
}

function BurgerBunItem({
  ingredient,
  top,
  bottomPadding,
  topPadding,
}: BurgerConstructorItemTypes) {
  return (
    <div
      className={`ml-4 mr-4 ${bottomPadding ? "mb-4" : ""} ${
        topPadding ? "mt-4" : ""
      }`}
    >
      <div className={bunItemStyles["ingredient"]}>
        <div className={bunItemStyles["constructor-element-wrapper"]}>
          <ConstructorElement
            type={
              top === "top" ? "top" : top === "bottom" ? "bottom" : undefined
            }
            isLocked={true}
            text={`${ingredient.name} ${
              top === "top" ? "(верх)" : top === "bottom" ? "(низ)" : ""
            }`}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(BurgerBunItem);
