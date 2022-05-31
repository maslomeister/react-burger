import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { TotalPrice } from "../../components/total-price/total-price";
import { formatDisplayDate } from "../../utils/utils";
import { getOrderByNumber } from "../../services/reducers/order-details";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { IngredientCircleImage } from "../../components/ingredient-circle-image/ingredient-circle-image";
import {
  generateIngredientsFromIds,
  getTotalPriceOfIngredients,
} from "../../utils/helpers";

import styles from "./order-info-page.module.css";

export function OrderInfoPage() {
  const dispatch = useAppDispatch();

  const params = useParams();

  const { orderData } = useAppSelector((state) => state.orderDetails);

  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (orderData === undefined && params && params.id) {
      dispatch(getOrderByNumber(Number(params.id)));
    }
  }, [dispatch, orderData, params]);

  const allIngredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  useMemo(() => {
    if (!orderData) return;
    setIngredients(
      generateIngredientsFromIds(allIngredients, orderData.ingredients)
    );
  }, [allIngredients, orderData]);

  useMemo(() => {
    if (!ingredients) return;
    setTotalPrice(getTotalPriceOfIngredients(ingredients));
  }, [ingredients]);

  if (!orderData || !ingredients)
    return <LoadingScreen text="Загружаются данные заказа" size="medium" />;

  const ruStatus = () => {
    switch (orderData.status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
    }
  };
  return (
    <div className={`${styles["container"]} mt-30`}>
      <p
        className={`${styles["order-number"]} text text_type_digits-default mb-10`}
      >
        #{orderData.number}
      </p>
      <p className="text text_type_main-medium mb-3">{orderData.name}</p>
      <p
        className={`${
          orderData.status === "done" ? styles["text_success"] : null
        } text text_type_main-default mb-15`}
      >
        {ruStatus()}
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
                className={`${styles["ingredient-price"]} text text_type_digits-small`}
              >
                <TotalPrice
                  price={ingredient.price}
                  double={ingredient.type === "bun" ? true : undefined}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["order-date-price"]}>
        <p>{formatDisplayDate(new Date(orderData.createdAt))}</p>
        <TotalPrice price={totalPrice} />
      </div>
    </div>
  );
}
