import { useState, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDrop } from "react-dnd";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerBunItemMemoized } from "./components/burger-bun-item/burger-bun-item";
import { BurgerInnerItemMemoized } from "./components/burger-inner-item/burger-inner-item";
import { OrderDetails } from "../../components/order-details/order-details";
import { ErrorModal } from "../../components/error-modal/error-modal";
import { TotalPriceMemoized } from "./components/total-price/total-price";
import { Ingredient, NewIngredient } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  addOrReplaceBun,
  resetState,
} from "../../services/burger-constructor";
import { getOrderNumber } from "../../services/order-details";

import styles from "./burger-constructor.module.css";

function BurgerConstructor() {
  const navigate = useNavigate();
  const dropRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const dispatch = useAppDispatch();
  let conditonalStyle;

  const { user } = useAppSelector((state) => state.authUser);

  const { ingredients, bun } = useAppSelector(
    (state) => state.constructorIngredients
  );

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
    drop(ingredient: Ingredient) {
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
    (ingredient: NewIngredient) => () => {
      dispatch(removeIngredient(ingredient));
    },
    [dispatch]
  );

  const createOrder = () => {
    if (user) {
      if (!bun.price) {
        setErrorModal("Нельзя оформить бургер без булки");
        setShowErrorModal(true);
        return;
      }
      if (ingredients.length === 0) {
        setErrorModal("Бургер не может быть пустым");
        setShowErrorModal(true);
        return;
      }
      setShowModal(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: [...ingredients.map(({ _id }) => _id), bun._id],
        }),
      };

      dispatch(getOrderNumber(requestOptions));
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
      {showErrorModal && (
        <ErrorModal
          onClose={() => setShowErrorModal(false)}
          error={errorModal}
        />
      )}
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
                />
              </div>
            </div>

            <div className={`${styles["cart"]} mb-10 mt-10`}>
              <TotalPriceMemoized price={totalPrice} />
              <Button type="primary" size="large" onClick={createOrder}>
                Оформить заказ
              </Button>
            </div>
          </>
        ) : (
          <div className={styles["helper"]}>
            <div
              className={`${styles["helper_shadow"]} text text_type_main-large mb-30 mt-30`}
            >
              Для создания бургера перетащите на этот текст ингредиент слева
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default BurgerConstructor;
