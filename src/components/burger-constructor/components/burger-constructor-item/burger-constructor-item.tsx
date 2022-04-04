import { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord, Identifier } from "dnd-core";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NewIngredient } from "../../../../utils/burger-api";

import constructorItemStyles from "./burger-constructor-item.module.css";

interface BurgerConstructorItemPropTypes {
  ingredient: NewIngredient;
  dropRef?: React.MutableRefObject<any>;
  draggable?: boolean;
  index?: number;
  top?: string;
  bottomPadding?: boolean;
  topPadding?: boolean;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  handleClose?: () => void;
}

function BurgerConstructorItem({
  ingredient,
  draggable,
  top,
  index,
  bottomPadding,
  topPadding,
  dropRef,
  moveCard,
  handleClose,
}: BurgerConstructorItemPropTypes) {
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
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
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
      console.log(hoverClientY, hoverMiddleY);

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
      className={`ml-4 mr-4 ${bottomPadding ? "mb-4" : ""} ${
        topPadding ? "mt-4" : ""
      }`}
      style={{ opacity }}
    >
      <div className={constructorItemStyles["ingredient"]} ref={_dropRef}>
        {draggable && (
          <div
            ref={ref}
            data-handler-id={handlerId}
            className={constructorItemStyles["_draggable"]}
          >
            <DragIcon type="primary" />
          </div>
        )}

        <div className={constructorItemStyles["constructor-element-wrapper"]}>
          <ConstructorElement
            type={
              top === "top" ? "top" : top === "bottom" ? "bottom" : undefined
            }
            isLocked={draggable ? undefined : true}
            text={`${ingredient.name} ${
              top === "top" ? "(верх)" : top === "bottom" ? "(низ)" : ""
            }`}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(BurgerConstructorItem);
