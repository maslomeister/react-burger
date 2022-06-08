import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useBeforeunload } from "react-beforeunload";
import { AnimatePresence } from "framer-motion";

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
import { getOrderNumber } from "../../../../services/reducers/order-details";
import { userAuthorized } from "../../../../utils/utils";
import { BurgerConstructorModal } from "../burger-constructor-modal/burger-constructor-modal";

import styles from "./burger-constructor-wrapper.module.css";

export function BurgerConstructorWrapper() {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });

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

  useBeforeunload(() => {
    const emptyStore =
      ingredients === initialState.ingredients && bun === initialState.bun
        ? true
        : false;
    if (!emptyStore) {
      localStorage.setItem(
        "constructorIngredients",
        JSON.stringify({ ingredients, bun })
      );
    }
  });

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
      {isMobileOrTablet ? (
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
          <AnimatePresence>
            {showCheckout && (
              <BurgerConstructorModal>
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
              </BurgerConstructorModal>
            )}
          </AnimatePresence>
        </div>
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
