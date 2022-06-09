import { useCallback, useRef } from "react";
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
  const dispatch = useAppDispatch();

  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });
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

  return (
    <>
      {isMobileOrTablet && (
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
      <div className={styles["burger-constructor-container"]}>
        <motion.div
          key="burger-constructor"
          ref={dropTarget}
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
                isMobile={isMobileOrTablet}
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
                      isMobile={isMobileOrTablet}
                    />
                  );
                })}
              </ul>
              <BurgerBunItemMemoized
                topPadding={true}
                top={"bottom"}
                ingredient={bun}
                handleClose={deleteBun}
                isMobile={isMobileOrTablet}
              />

              {!isMobileOrTablet && (
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
                    <Button
                      type="primary"
                      size="large"
                      disabled={!canOrder}
                      onClick={createOrder}
                    >
                      "Оформить заказ"
                    </Button>
                  </div>
                </div>
              )}
              {!canOrder && <ReactTooltip place="top" effect="solid" />}
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
      {isMobileOrTablet && (
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
          >
            Заказать
          </Button>
        </div>
      )}
    </>
  );
}

export default BurgerConstructor;
