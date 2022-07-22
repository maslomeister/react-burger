import React, { memo, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { TotalPrice } from "../../../../components/total-price/total-price";
import { OrderDetails } from "../../../../components/order-details/order-details";
import BurgerConstructor from "../../../../components/burger-constructor/burger-constructor";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import {
  initialState,
  loadDataFromLocalStorage,
  resetState,
} from "../../../../services/reducers/burger-constructor/burger-constructor";
import { getOrderNumber } from "../../../../services/reducers/order-details/order-details";
import { userAuthorized } from "../../../../utils/utils";

import styles from "./burger-constructor-wrapper.module.css";

function BurgerConstructorWrapper() {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [canOrder, setCanOrder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

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

  useEffect(() => {
    const locallyStoredState = localStorage.getItem("constructorIngredients");
    const emptyStore =
      ingredients === initialState.ingredients && bun === initialState.bun
        ? true
        : false;
    if (emptyStore && locallyStoredState) {
      dispatch(loadDataFromLocalStorage(JSON.parse(locallyStoredState)));
    }
  }, [bun, dispatch, ingredients]);

  useEffect(() => {
    const emptyStore =
      ingredients === initialState.ingredients && bun === initialState.bun
        ? true
        : false;

    if (emptyStore) return;

    localStorage.setItem(
      "constructorIngredients",
      JSON.stringify({ ingredients, bun })
    );
  }, [bun, ingredients]);

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

  function toggleCheckout() {
    setShowCheckout(!showCheckout);
  }

  return (
    <>
      {showModal && (
        <OrderDetails
          onClose={hideModal}
          orderId={orderNumber}
          status={status}
          error={error}
        />
      )}

      {isMobile ? (
        <>
          <div className={styles["mobile-checkout"]}>
            <TotalPrice price={totalPrice} size="medium" />
            <Button
              type="primary"
              size="medium"
              disabled={!canOrder}
              onClick={toggleCheckout}
            >
              Заказ
            </Button>
          </div>
          <AnimatePresence>
            {showCheckout && (
              <motion.div
                className={styles["mobile-cart"]}
                key="mobile-cart-popup"
                initial={{ y: "+100%" }}
                animate={{ y: "0", transition: { duration: 0.25 } }}
                exit={{ y: "+100%", transition: { duration: 0.15 } }}
                transition={{ type: "ease-in-out" }}
              >
                <BurgerConstructor
                  ingredients={ingredients}
                  bun={bun}
                  totalPrice={totalPrice}
                  canOrder={canOrder}
                  orderNumber={orderNumber}
                  status={status}
                  error={error}
                  toggleCheckout={() => {
                    toggleCheckout();
                  }}
                  createOrder={createOrder}
                  hideModal={hideModal}
                  showModal={showModal}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <BurgerConstructor
          ingredients={ingredients}
          bun={bun}
          totalPrice={totalPrice}
          canOrder={canOrder}
          orderNumber={orderNumber}
          status={status}
          error={error}
          toggleCheckout={toggleCheckout}
          createOrder={createOrder}
          hideModal={hideModal}
          showModal={showModal}
        />
      )}
    </>
  );
}

export const BurgerConstructorWrapperMemoized = memo(BurgerConstructorWrapper);
