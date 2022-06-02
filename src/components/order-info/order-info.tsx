import { useMemo } from "react";

import { useAppSelector } from "../../services/hooks";
import { TotalPrice } from "../total-price/total-price";
import { formatDisplayDate } from "../../utils/utils";
import { IngredientCircleImage } from "../ingredient-circle-image/ingredient-circle-image";
import {
  generateIngredientsWithAmount,
  getTotalPriceOfIngredientsWithAmount,
} from "../../utils/helpers";

import styles from "./order-info.module.css";

type Props = {
  orderData: IOrder;
  isModal?: boolean;
};

export function OrderInfo({ orderData, isModal }: Props) {
  const allIngredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const ingredients = useMemo(
    () => generateIngredientsWithAmount(allIngredients, orderData.ingredients),
    [allIngredients, orderData.ingredients]
  );
  const totalPrice = useMemo(
    () => getTotalPriceOfIngredientsWithAmount(ingredients),
    [ingredients]
  );

  const ruStatus = useMemo(() => {
    switch (orderData.status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
    }
  }, [orderData.status]);

  return (
    <>
      <p
        className={`${
          isModal
            ? styles["order-number_left"] + " mt-15 "
            : styles["order-number_center"]
        } text text_type_digits-default mb-10`}
      >
        #{orderData.number}
      </p>
      <p className="text text_type_main-medium mb-3">{orderData.name}</p>
      <p
        className={`${
          orderData.status === "done" ? styles["text_success"] : null
        } text text_type_main-default mb-15`}
      >
        {ruStatus}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles["ingredients-container"]} mb-10`}>
        {ingredients.map((ingredient) => {
          return (
            <div
              className={`${styles["ingredient-container"]} mb-4`}
              key={ingredient._uniqueId}
            >
              <div className="mr-4">
                <IngredientCircleImage image={ingredient.image} />
              </div>
              <p
                className={`${styles["ingredient-title"]} text text_type_main-default`}
              >
                {ingredient.name}
              </p>
              <div
                className={`${styles["ingredient-price"]} text text_type_digits-small mr-4`}
              >
                <TotalPrice
                  price={ingredient.price}
                  multiplied={ingredient.amount}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["order-date-price"]}>
        <p>{formatDisplayDate(orderData.createdAt)}</p>
        <TotalPrice price={totalPrice} />
      </div>
    </>
  );
}
