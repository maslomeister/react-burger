import { memo, useMemo, useState, useCallback } from "react";
import SwipeToDelete from "react-swipe-to-delete-ios";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { MobileCartItem } from "../mobile-cart-item/mobile-cart-item";
import { DeleteComponent } from "../delete-component/delete-component";

import styles from "../burger-item.module.css";

interface BurgerConstructorItemTypes {
  ingredient: IIngredient;
  top?: string;
  bottomPadding?: boolean;
  topPadding?: boolean;
  handleClose: () => void;
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
  const [itemHeight, setItemHeight] = useState(0);
  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setItemHeight(node.clientHeight);
    }
  }, []);

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
    <>
      {isMobile ? (
        <SwipeToDelete
          onDelete={handleClose}
          height={itemHeight}
          deleteComponent={<DeleteComponent />}
          transitionDuration={300}
          deleteThreshold={20}
          showDeleteAction={false}
        >
          <div className={styles["ingredient-outer"] + " noselect"}>
            <div
              className={styles["constructor-element-wrapper"]}
              data-testid={bunType + ingredient._id}
            >
              <MobileCartItem
                name={ingredient.name + bunName}
                price={ingredient.price}
                image={ingredient.image_mobile}
                ref={measuredRef}
              />
            </div>
          </div>
        </SwipeToDelete>
      ) : (
        <div className={styles["ingredient-outer"] + " noselect"}>
          <div
            className={styles["constructor-element-wrapper"]}
            data-testid={bunType + ingredient._id}
          >
            <ConstructorElement
              type={bunType}
              text={ingredient.name + bunName}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
}

export const BurgerBunItemMemoized = memo(BurgerBunItem);
