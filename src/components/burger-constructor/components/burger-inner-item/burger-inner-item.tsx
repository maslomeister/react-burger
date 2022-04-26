import { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord, Identifier } from "dnd-core";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NewIngredient } from "../../../../utils/api";

import styles from "../burger-item.module.css";

interface BurgerConstructorItemTypes {
  ingredient: NewIngredient;
  draggable: boolean;
  index: number;
  bottomPadding: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleClose: () => void;
}

function BurgerInnerItem({
  ingredient,
  draggable,
  index,
  bottomPadding,
  moveCard,
  handleClose,
}: BurgerConstructorItemTypes) {
  const ref = useRef<HTMLDivElement>(null);
  const _dropRef = useRef<HTMLDivElement>(null);
  const [{ beingDragged }, drag, dragPreview] = useDrag({
    type: "sorting",
    item: ingredient,
    collect: (monitor) => ({
      beingDragged: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<
    NewIngredient,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "sorting",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: NewIngredient, monitor) {
      if (_dropRef === undefined) {
        return;
      }
      if (!_dropRef.current) {
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

      const hoverBoundingRect = _dropRef.current.getBoundingClientRect();

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

  drop(_dropRef);
  drag(ref);
  dragPreview(_dropRef);

  const opacity = beingDragged ? 0 : 1;
  return (
    <div
      className={`ml-4 mr-4 ${bottomPadding ? "mb-4" : ""}`}
      style={{ opacity }}
    >
      <div className={styles["ingredient"]} ref={_dropRef}>
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
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export const BurgerInnerItemMemoized = memo(BurgerInnerItem);
