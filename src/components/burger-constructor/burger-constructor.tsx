import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import OrderDetails from "../../components/order-details/order-details";
import TotalPrice from "./components/total-price";
import { BurgerConstructorContext } from "../../components/services/appContext";

import constructorStyles from "./burger-constructor.module.css";

const createOrderUrl = "https://norma.nomoreparties.space/api/orders";

function BurgerConstructor() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orderState, setOrderState] = useState({
    isLoading: false,
    hasError: false,
    error: "",
    orderId: 0,
  });
  const { burgerConstructorState, burgerConstructorDispatcher } = useContext(
    BurgerConstructorContext
  );

  function removeIngredient(id: string) {
    burgerConstructorDispatcher({
      type: "REMOVE_INGREDIENT",
      payload: {
        _id: id,
      },
    });
  }

  function createOrder() {
    setShowModal(true);
    setOrderState({ ...orderState, isLoading: true });

    let ingredientsIds = burgerConstructorState.ingredients.map(
      ({ _id }) => _id
    );

    ingredientsIds.push(burgerConstructorState.bun._id);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsIds }),
    };

    fetch(createOrderUrl, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderState({
            ...orderState,
            isLoading: false,
            orderId: data.order.number,
          });
        } else {
          setOrderState({ ...orderState, isLoading: false, hasError: true });
        }
      })
      .catch((e) => {
        setOrderState({
          ...orderState,
          isLoading: false,
          hasError: true,
          error: e,
        });
      });
  }

  return (
    <AnimatePresence>
      <OrderDetails
        onClose={() => setShowModal(false)}
        show={showModal}
        isLoading={orderState.isLoading}
        orderId={orderState.orderId}
        hasError={orderState.hasError}
        error={orderState.error}
      />

      {burgerConstructorState.ingredients && (
        <motion.div
          key="burger-constructor"
          className={`${constructorStyles["burger-constructor"]} mb-14 mt-25`}
          initial={{ x: "+200%" }}
          exit={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{
            type: "tween",
            delay: 0.3,
          }}
        >
          <div className={constructorStyles["outer_style"]}>
            <div className="ml-4 mr-4 mb-4">
              <div className={constructorStyles["constructor-element-wrapper"]}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${burgerConstructorState.bun.text} (вверх)`}
                  price={burgerConstructorState.bun.price}
                  thumbnail={burgerConstructorState.bun.image}
                />
              </div>
            </div>
          </div>

          <div className={constructorStyles["inner_style"]}>
            {burgerConstructorState.ingredients.map((ingredient, index) => {
              const lastIndex =
                index === burgerConstructorState.ingredients!.length - 1;
              const item = {
                _id: ingredient._id,
                image: ingredient.image,
                text: ingredient.text,
                price: ingredient.price,
              };
              return (
                <div
                  className={`ml-4 mr-4 ${lastIndex ? "" : "mb-4"}`}
                  key={ingredient._id}
                >
                  <BurgerConstructorItem
                    item={item}
                    handleClose={() => {
                      removeIngredient(ingredient._id);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className={constructorStyles["outer_style"]}>
            <div className="ml-4 mr-4 mt-4">
              <div className={constructorStyles["constructor-element-wrapper"]}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${burgerConstructorState.bun.text} (низ)`}
                  price={burgerConstructorState.bun.price}
                  thumbnail={burgerConstructorState.bun.image}
                />
              </div>
            </div>
          </div>

          <div className={`${constructorStyles["cart"]} mt-10`}>
            <TotalPrice price={burgerConstructorState.totalPrice} />
            <Button type="primary" size="large" onClick={createOrder}>
              Оформить заказ
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BurgerConstructor;
