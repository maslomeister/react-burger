import type { CSSProperties, FC } from "react";
import type { XYCoord } from "react-dnd";
import { useDragLayer } from "react-dnd";

import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MobileCartItem } from "../../../../components/burger-constructor/components/mobile-cart-item/mobile-cart-item";

import styles from "./custom-preview.module.css";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 1002,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export interface CustomDragLayerProps {}

export const CustomPreview: FC<CustomDragLayerProps> = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  function renderItem() {
    switch (itemType) {
      case "sorting":
        return (
          <div className={styles["ingredient"]}>
            <div className={styles["_draggable"] + " noselect"}>
              <DragIcon type="primary" />
            </div>

            <div className={styles["constructor-element-wrapper"]}>
              <MobileCartItem
                image={item.image}
                name={item.name}
                price={item.price}
                opacity={0.6}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
