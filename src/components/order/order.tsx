import { useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IngredientsPreview } from "./components/ingredients-preview";
import { TotalPrice } from "../total-price/total-price";
import { formatDisplayDate } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { addDataToModal } from "../../services/reducers/order-details";
import {
  generateIngredientsFromIds,
  getTotalPriceOfIngredients,
} from "../../utils/helpers";

import styles from "./order.module.css";

export function Order({
  createdAt,
  ingredients,
  name,
  number,
  status,
  updatedAt,
  _id,
}: IOrder) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation() as TLocationProps;

  const allIngredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const [localIngredients, setLocalIngredients] = useState<IIngredient[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useMemo(() => {
    setLocalIngredients(
      generateIngredientsFromIds(allIngredients, ingredients)
    );
  }, [allIngredients, ingredients]);

  useMemo(() => {
    if (!localIngredients) return;
    setTotalPrice(getTotalPriceOfIngredients(localIngredients));
  }, [localIngredients]);

  const ruStatus = () => {
    switch (status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
    }
  };

  const modalData = useCallback(() => {
    navigate(`${number}`, {
      state: { background: location, id: number },
    });
    dispatch(
      addDataToModal({
        createdAt: createdAt,
        ingredients: ingredients,
        name: name,
        number: number,
        status: status,
        updatedAt: updatedAt,
        _id: _id,
      })
    );
  }, [
    _id,
    createdAt,
    dispatch,
    ingredients,
    location,
    name,
    navigate,
    number,
    status,
    updatedAt,
  ]);

  return (
    <div
      className={`${styles["order-container"]} mr-2 mb-4`}
      onClick={modalData}
    >
      <div className={`${styles["order-container_inner"]} mt-6 mb-6 ml-6 mr-6`}>
        <div className={`${styles["order-number-date"]} mb-6`}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {formatDisplayDate(createdAt)}
          </p>
        </div>
        <div className="mb-2">
          <h1 className="text text_type_main-medium">{name}</h1>
        </div>
        <div className="mb-6">
          <h1
            className={`${
              status === "done" ? styles["success"] : null
            } text text_type_main-default`}
          >
            {ruStatus()}
          </h1>
        </div>
        <div className={styles["ingredients-container"]}>
          <IngredientsPreview ingredients={localIngredients} />
          <div className={`${styles["total-price"]} pl-6`}>
            <TotalPrice price={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
