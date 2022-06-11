import { memo, useMemo } from "react";

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
  const bunName = useMemo(() => {
    switch (top) {
      case "top":
        return " (верх)";
      case "bottom":
        return " (низ)";
    }
  }, [top]);

  const bunType = useMemo(() => {
    switch (top) {
      case "top":
        return "top";
      case "bottom":
        return "bottom";
      default:
        return undefined;
    }
  }, [top]);

  return (
    <div className={styles["ingredient-outer"]}>
      <div
        className={styles["constructor-element-wrapper"]}
        data-test-id={bunType + ingredient._id}
      >
        {isMobile ? (
          <MobileCartItem
            name={ingredient.name + bunName}
            price={ingredient.price}
            image={ingredient.image_mobile}
          />
        ) : (
          <ConstructorElement
            type={bunType}
            text={ingredient.name + bunName}
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
