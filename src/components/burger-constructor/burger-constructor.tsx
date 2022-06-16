import React, { useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDrop } from "react-dnd";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";
import ReactTooltip from "react-tooltip";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerBunItemMemoized } from "./components/burger-bun-item/burger-bun-item";
import { BurgerInnerItemMemoized } from "./components/burger-inner-item/burger-inner-item";
import { CloseIconAdaptive } from "../../assets/icons/close-icon";

import { TotalPrice } from "../total-price/total-price";
import { useAppDispatch } from "../../services/hooks";
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  addOrReplaceBun,
  removeBun,
} from "../../services/reducers/burger-constructor/burger-constructor";

import styles from "./burger-constructor.module.css";

interface IProps {
  ingredients: IIngredient[];
  bun: IIngredient;
  totalPrice: number;
  canOrder: boolean;
  orderNumber: number;
  status: string;
  error: string;
  toggleCheckout: () => void;
  createOrder: () => void;
  hideModal: () => void;
  showModal: boolean;
}

let firstClientX: number, clientX: number;

const preventTouch = (e: any) => {
  const minValue = 10; // threshold

  clientX = e.touches[0].clientX - firstClientX;

  // Vertical scrolling does not work when you start swiping horizontally.
  if (Math.abs(clientX) > minValue) {
    e.returnValue = false;

    return false;
  }
};

const touchStart = (e: any) => {
  firstClientX = e.touches[0].clientX;
};

const opts: AddEventListenerOptions & EventListenerOptions = { passive: false };

function BurgerConstructor({
  ingredients,
  bun,
  totalPrice,
  canOrder,
  orderNumber,
  status,
  error,
  createOrder,
  hideModal,
  toggleCheckout,
  showModal,
}: IProps) {
  const noScrollOnRemoveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noScrollOnRemoveRef.current) {
      noScrollOnRemoveRef.current.addEventListener("touchstart", touchStart);
      noScrollOnRemoveRef.current.addEventListener(
        "touchmove",
        preventTouch,
        opts
      );
    }

    return () => {
      if (noScrollOnRemoveRef.current) {
        noScrollOnRemoveRef.current.removeEventListener(
          "touchstart",
          touchStart
        );
        noScrollOnRemoveRef.current.removeEventListener(
          "touchmove",
          preventTouch,
          opts
        );
      }
    };
  }, []);

  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const dropRef = useRef<HTMLUListElement>(null);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngredient) {
      const uniqueId = uuidv4();
      ingredient.type === "bun"
        ? dispatch(addOrReplaceBun(ingredient))
        : dispatch(addIngredient({ ingredient, uniqueId }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "#8585AD" : "transparent";

  const deleteIngredient = useCallback(
    (ingredient: IIngredient) => () => {
      dispatch(removeIngredient(ingredient));
    },
    [dispatch]
  );

  const deleteBun = useCallback(() => {
    dispatch(removeBun());
  }, [dispatch]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ hoverIndex, dragIndex }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isMobile && !canOrder) {
      toggleCheckout();
    }
  }, [canOrder, isMobile, toggleCheckout]);

  return (
    <>
      {isMobile && (
        <div className={styles["mobile-cart__title-container"]}>
          <h1 className="text text_type_main-large">Заказ</h1>
          <CloseIconAdaptive
            width={48}
            height={48}
            onClick={toggleCheckout}
            type="primary"
          />
        </div>
      )}
      <div
        className={styles["burger-constructor-container"]}
        ref={noScrollOnRemoveRef}
      >
        <motion.div
          key="burger-constructor"
          ref={dropTarget}
          data-testid="constructor-drop-target"
          style={{ borderColor: borderColor }}
          className={styles["burger-constructor"]}
        >
          {ingredients.length !== 0 || bun.price !== 0 ? (
            <>
              <BurgerBunItemMemoized
                bottomPadding={true}
                top={"top"}
                ingredient={bun}
                handleClose={deleteBun}
                isMobile={isMobile}
              />

              <ul className={styles["inner_style"]} ref={dropRef}>
                {ingredients.map((ingredient, index) => {
                  const newItem = {
                    ...ingredient,
                    index: index,
                  };
                  const lastIndex = index === ingredients!.length - 1;
                  return (
                    <BurgerInnerItemMemoized
                      bottomPadding={!lastIndex}
                      key={newItem.uniqueId}
                      index={index}
                      moveCard={moveCard}
                      ingredient={newItem}
                      draggable={true}
                      handleClose={deleteIngredient(newItem)}
                      isMobile={isMobile}
                    />
                  );
                })}
              </ul>
              <BurgerBunItemMemoized
                topPadding={true}
                top={"bottom"}
                ingredient={bun}
                handleClose={deleteBun}
                isMobile={isMobile}
              />

              {!isMobile && (
                <div className={styles["cart"]}>
                  <div className="mr-10">
                    <TotalPrice price={totalPrice} size="medium" />
                  </div>
                  <div
                    data-tip={
                      bun.price === 0
                        ? "Добавьте булку в бургер чтобы сделать заказ"
                        : ingredients.length === 0
                        ? "Добавьте начинку в бургер чтобы сделать заказ"
                        : ""
                    }
                  >
                    {!canOrder && <ReactTooltip place="top" effect="solid" />}
                    <Button
                      type="primary"
                      size="large"
                      disabled={!canOrder}
                      onClick={createOrder}
                    >
                      Оформить заказ
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={styles["helper"]}>
              <div
                className={`${styles["helper_shadow"]} text text_type_main-large mb-30 mt-30`}
              >
                Для создания бургера перетащите сюда ингредиент
              </div>
            </div>
          )}
        </motion.div>
      </div>
      {isMobile && (
        <div className={styles["mobile-cart__order-container"]}>
          <TotalPrice price={totalPrice} size="medium" />
          <Button
            type="primary"
            size="medium"
            disabled={!canOrder}
            onClick={() => {
              toggleCheckout();
              createOrder();
            }}
            data-testid="make-order"
          >
            Заказать
          </Button>
        </div>
      )}
    </>
  );
}

export default BurgerConstructor;
