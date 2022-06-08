import { memo } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { MobileCartItem } from "../mobile-cart-item/mobile-cart-item";

import styles from "../burger-item.module.css";

interface BurgerConstructorItemTypes {
  ingredient: IIngredient;
  top?: string;
  bottomPadding?: boolean;
  topPadding?: boolean;
  handleClose?: () => void;
  isMobile: boolean;
}

function BurgerBunItem({
  ingredient,
  top,
  bottomPadding,
  topPadding,
  handleClose,
  isMobile,
}: BurgerConstructorItemTypes) {
  return (
    <div
      className={`${styles["ingredient"]} ${isMobile ? "" : "ml-10 mr-4 "} ${
        bottomPadding ? "mb-4" : ""
      } ${topPadding ? "mt-4" : ""}`}
    >
      <div className="ml-4"></div>
      <div className={styles["constructor-element-wrapper"]}>
        {isMobile ? (
          <MobileCartItem
            name={`${ingredient.name} ${
              top === "top" ? "(верх)" : top === "bottom" ? "(низ)" : ""
            }`}
            price={ingredient.price}
            image={ingredient.image_mobile}
          />
        ) : (
          <ConstructorElement
            type={
              top === "top" ? "top" : top === "bottom" ? "bottom" : undefined
            }
            text={`${ingredient.name} ${
              top === "top" ? "(верх)" : top === "bottom" ? "(низ)" : ""
            }`}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export const BurgerBunItemMemoized = memo(BurgerBunItem);
