import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDrop } from "react-dnd";
import ReactTooltip from "react-tooltip";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerBunItemMemoized } from "./components/burger-bun-item/burger-bun-item";
import { BurgerInnerItemMemoized } from "./components/burger-inner-item/burger-inner-item";
import { OrderDetails } from "../../components/order-details/order-details";
import { TotalPrice } from "../total-price/total-price";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  addIngredient,
  loadIngredients,
  removeIngredient,
  moveIngredient,
  addOrReplaceBun,
  removeBun,
  resetState,
} from "../../services/reducers/burger-constructor";
import { getOrderNumber } from "../../services/reducers/order-details";
import { userAuthorized } from "../../utils/utils";

import styles from "./burger-constructor.module.css";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dropRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [canOrder, setCanOrder] = useState(false);

  let conditonalStyle;

  window.onbeforeunload = () => {
    if (ingredients || bun) {
      localStorage.setItem(
        "constructorIngredients",
        JSON.stringify({ ingredients, bun })
      );
    }
  };

  const { user } = useAppSelector((state) => state.authUser);

  const { ingredients, bun } = useAppSelector(
    (state) => state.constructorIngredients
  );

  useEffect(() => {
    const constructorItems = localStorage.getItem("constructorIngredients");
    if (constructorItems) {
      dispatch(loadIngredients(constructorItems));
    }
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    return (
      (bun.price ? bun.price * 2 : 0) +
      ingredients.reduce((s, v) => s + v.price, 0)
    );
  }, [bun.price, ingredients]);

  const { orderNumber, status, error } = useAppSelector(
    (state) => state.orderDetails
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngredient) {
      ingredient.type === "bun"
        ? dispatch(addOrReplaceBun(ingredient))
        : dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "#8585AD" : "transparent";

  const _removeIngredient = useCallback(
    (ingredient: IIngredient) => () => {
      dispatch(removeIngredient(ingredient));
    },
    [dispatch]
  );

  const _removeBun = useCallback(() => {
    dispatch(removeBun());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bun.price && ingredients.length > 0) {
      setCanOrder(true);
    } else {
      setCanOrder(false);
    }
  }, [bun.price, ingredients.length]);

  const createOrder = () => {
    if (userAuthorized(user)) {
      setShowModal(true);

      dispatch(getOrderNumber({ ingredients, bun }));
      localStorage.removeItem("constructorIngredients");
    } else {
      navigate("/login", {
        state: { from: "/" },
        replace: true,
      });
    }
  };

  function hideModal() {
    setShowModal(false);
    dispatch(resetState());
  }

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ hoverIndex, dragIndex }));
    },
    [dispatch]
  );

  if (ingredients.length > 5) {
    conditonalStyle = "";
  } else {
    conditonalStyle = styles["conditional"];
  }

  return (
    <AnimatePresence>
      {showModal && (
        <OrderDetails
          onClose={hideModal}
          orderId={orderNumber}
          status={status}
          error={error}
        />
      )}
      <motion.div
        key="burger-constructor"
        ref={dropTarget}
        style={{ border: `2px dashed ${borderColor}`, borderRadius: 30 }}
        className={`${styles["burger-constructor"]} mb-14 mt-25`}
      >
        {ingredients.length !== 0 || bun.price !== 0 ? (
          <>
            <div className="burgerComponents">
              <div className={styles["outer_style"]}>
                <BurgerBunItemMemoized
                  bottomPadding={true}
                  top={"top"}
                  ingredient={bun}
                  handleClose={_removeBun}
                />
              </div>

              <ul
                className={styles["inner_style"] + conditonalStyle}
                ref={dropRef}
              >
                {ingredients.map((ingredient, index) => {
                  const newItem = {
                    ...ingredient,
                    index: index,
                  };
                  const lastIndex = index === ingredients!.length - 1;
                  return (
                    <li key={newItem._uniqueId}>
                      <BurgerInnerItemMemoized
                        bottomPadding={!lastIndex}
                        key={newItem._id}
                        index={index}
                        moveCard={moveCard}
                        ingredient={newItem}
                        draggable={true}
                        handleClose={_removeIngredient(newItem)}
                      />
                    </li>
                  );
                })}
              </ul>

              <div className={styles["outer_style"]}>
                <BurgerBunItemMemoized
                  topPadding={true}
                  top={"bottom"}
                  ingredient={bun}
                  handleClose={_removeBun}
                />
              </div>
            </div>

            <div className={`${styles["cart"]} mb-10 mt-10`}>
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
                  Оформить заказ
                </Button>
              </div>
            </div>
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
    </AnimatePresence>
  );
}

export default BurgerConstructor;
