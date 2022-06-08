import { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord, Identifier } from "dnd-core";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { MobileCartItem } from "../mobile-cart-item/mobile-cart-item";

import styles from "../burger-item.module.css";

interface BurgerConstructorItemTypes {
  ingredient: IIngredient;
  draggable: boolean;
  index: number;
  bottomPadding: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleClose: () => void;
  isMobile: boolean;
}

function BurgerInnerItem({
  ingredient,
  draggable,
  index,
  bottomPadding,
  moveCard,
  handleClose,
  isMobile,
}: BurgerConstructorItemTypes) {
  const ref = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [{ beingDragged }, drag, dragPreview] = useDrag({
    type: "sorting",
    item: ingredient,
    collect: (monitor) => ({
      beingDragged: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<
    IIngredient,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "sorting",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: IIngredient, monitor) {
      if (dropRef === undefined) {
        return;
      }
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (hoverIndex === undefined) {
        return;
      }

      if (dragIndex === undefined) {
        return;
      }

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dropRef.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (moveCard) {
        moveCard(dragIndex, hoverIndex);
      }

      item.index = hoverIndex;
    },
  });

  drop(dropRef);
  drag(ref);
  dragPreview(dropRef);

  const opacity = beingDragged ? 0 : 1;
  return (
    <div
      className={`${styles["ingredient"]} ${bottomPadding ? "mb-4" : ""}`}
      ref={dropRef}
      style={{ opacity }}
    >
      {draggable && (
        <div
          ref={ref}
          data-handler-id={handlerId}
          className={styles["_draggable"]}
        >
          <DragIcon type="primary" />
        </div>
      )}

      <div className={styles["constructor-element-wrapper"]}>
        {isMobile ? (
          <MobileCartItem
            name={ingredient.name}
            image={ingredient.image_mobile}
            price={ingredient.price}
          />
        ) : (
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export const BurgerInnerItemMemoized = memo(BurgerInnerItem);
