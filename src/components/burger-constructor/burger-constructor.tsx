import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
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
} from "../../services/reducers/burger-constructor/burger-constructor";
import { getOrderNumber } from "../../services/reducers/order-details";
import { userAuthorized } from "../../utils/utils";

import styles from "./burger-constructor.module.css";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dropRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [canOrder, setCanOrder] = useState(false);

  const { user, tokens } = useAppSelector((state) => state.authUser);

  const { ingredients, bun } = useAppSelector(
    (state) => state.constructorIngredients
  );

  const { orderNumber, status, error } = useAppSelector(
    (state) => state.orderDetails
  );

  const totalPrice = useMemo(() => {
    return (
      (bun.price ? bun.price * 2 : 0) +
      ingredients.reduce((s, v) => s + v.price, 0)
    );
  }, [bun.price, ingredients]);

  let conditionalStyle;

  window.onbeforeunload = () => {
    if (ingredients || bun) {
      localStorage.setItem(
        "constructorIngredients",
        JSON.stringify({ ingredients, bun })
      );
    }
  };

  useEffect(() => {
    const constructorItems = localStorage.getItem("constructorIngredients");
    if (constructorItems) {
      dispatch(loadIngredients(constructorItems));
    }
  }, [dispatch]);

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

      dispatch(
        getOrderNumber({
          ingredients: ingredients,
          bun: bun,
          accessToken: tokens.accessToken,
        })
      );
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
    conditionalStyle = "";
  } else {
    conditionalStyle = styles["conditional"];
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
                  handleClose={deleteBun}
                />
              </div>

              <ul
                className={styles["inner_style"] + conditionalStyle}
                ref={dropRef}
              >
                {ingredients.map((ingredient, index) => {
                  const newItem = {
                    ...ingredient,
                    index: index,
                  };
                  const lastIndex = index === ingredients!.length - 1;
                  return (
                    <li key={newItem.uniqueId}>
                      <BurgerInnerItemMemoized
                        bottomPadding={!lastIndex}
                        key={newItem._id}
                        index={index}
                        moveCard={moveCard}
                        ingredient={newItem}
                        draggable={true}
                        handleClose={deleteIngredient(newItem)}
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
                  handleClose={deleteBun}
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
