import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorItem from "./components/burger-constructor-item/burger-constructor-item";
import OrderDetails from "../../components/order-details/order-details";
import ErrorModal from "../../components/error-modal/error-modal";
import TotalPrice from "./components/total-price/total-price";
import { Ingredient, NewIngredient } from "../../utils/burger-api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  addOrReplaceBun,
  resetState,
} from "../services/reducers/burger-constructor";
import { getOrderNumber } from "../services/reducers/order-details";

import constructorStyles from "./burger-constructor.module.css";

function BurgerConstructor() {
  const dropRef = useRef(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { ingredients, bun, totalPrice } = useAppSelector(
    (state) => state.constructorIngredients
  );

  const innerIngredients = ingredients.filter((item) => item.type !== "bun");

  const { orderNumber, status, error } = useAppSelector(
    (state) => state.orderDetails
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: Ingredient) {
      const newIngredient: NewIngredient = {
        ...ingredient,
        _uniqueId: uuidv4(),
      };
      if (ingredient.type === "bun") {
        dispatch(addOrReplaceBun(newIngredient));
      } else {
        dispatch(addIngredient(newIngredient));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "lightgreen" : "transparent";

  function _removeIngredient(ingredient: NewIngredient) {
    dispatch(removeIngredient(ingredient));
  }

  function createOrder() {
    if (!bun.price) {
      setErrorModal("Нельзя оформить бургер без булки");
      setShowErrorModal(true);
      return;
    }
    if (innerIngredients.length === 0) {
      setErrorModal("Бургер не может быть пустым");
      setShowErrorModal(true);
      return;
    }
    setShowModal(true);

    const ingredientsIds = [...innerIngredients.map(({ _id }) => _id), bun._id];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsIds }),
    };

    dispatch(getOrderNumber(requestOptions));
  }

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
        style={{ border: `1px solid ${borderColor}` }}
        className={`${constructorStyles["burger-constructor"]} mb-14 mt-25`}
        initial={{ x: "+200%" }}
        exit={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{
          type: "tween",
        }}
      >
        {ingredients.length !== 0 || bun.price !== 0 ? (
          <>
            <div className="burgerComponents">
              <div className={constructorStyles["outer_style"]}>
                <BurgerConstructorItem
                  bottomPadding={true}
                  top={"top"}
                  draggable={false}
                  ingredient={bun}
                />
              </div>

              <ul className={constructorStyles["inner_style"]} ref={dropRef}>
                {innerIngredients.map((ingredient, index) => {
                  const newItem = {
                    ...ingredient,
                    index: index,
                  };
                  const lastIndex = index === innerIngredients!.length - 1;
                  return (
                    <li key={newItem._uniqueId}>
                      <BurgerConstructorItem
                        bottomPadding={!lastIndex}
                        key={newItem._id}
                        index={index}
                        moveCard={moveCard}
                        ingredient={newItem}
                        draggable={true}
                        dropRef={dropRef}
                        handleClose={() => {
                          _removeIngredient(newItem);
                        }}
                      />
                    </li>
                  );
                })}
              </ul>

              <div className={constructorStyles["outer_style"]}>
                <BurgerConstructorItem
                  topPadding={true}
                  top={"bottom"}
                  draggable={false}
                  ingredient={bun}
                />
              </div>
            </div>

            <div className={`${constructorStyles["cart"]} mb-10 mt-10`}>
              <TotalPrice price={totalPrice} />
              <Button type="primary" size="large" onClick={createOrder}>
                Оформить заказ
              </Button>
            </div>
          </>
        ) : (
          <div className={constructorStyles["helper"]}>
            <div
              className={`${constructorStyles["helper_shadow"]} text text_type_main-large mb-30 mt-30`}
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
