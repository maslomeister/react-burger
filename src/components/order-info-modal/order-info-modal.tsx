import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { TotalPrice } from "../../components/total-price/total-price";
import { formatDisplayDate } from "../../utils/utils";
import { getOrderByNumber } from "../../services/reducers/order-details";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { IngredientCircleImage } from "../../components/ingredient-circle-image/ingredient-circle-image";

import styles from "./order-info-modal.module.css";

interface IOrderedIngredient {
  type: string;
  _id: string;
  _uniqueId: string;
  name: string;
  image: string;
  price: number;
}

export function OrderInfoModal() {
  const dispatch = useAppDispatch();

  const params = useParams();

  const orderData = useAppSelector((state) => state.orderDetails.orderData);

  const [ingredients, setIngredients] = useState<IOrderedIngredient[]>();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (orderData === undefined && params && params.id) {
      dispatch(getOrderByNumber(Number(params.id)));
    }
  }, [dispatch, orderData, params]);

  const _ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    const allIngredients = orderData?.ingredients.map((ingredient) => {
      const foundIngredient = _ingredients.find((item) => {
        return item._id === ingredient;
      });

      if (foundIngredient) {
        return {
          type: foundIngredient.type,
          _id: ingredient,
          image: foundIngredient.image_mobile,
          name: foundIngredient.name,
          price: foundIngredient.price,
          _uniqueId: uuidv4(),
        };
      }
      return {
        type: "none",
        _id: "none",
        image: "none",
        name: "none",
        price: -1,
        _uniqueId: uuidv4(),
      };
    });
    setIngredients(allIngredients);
  }, [_ingredients, orderData, orderData?.ingredients]);

  useEffect(() => {
    if (ingredients === undefined) return;

    const total = ingredients.reduce((acc, obj) => {
      if (obj.type === "bun") {
        return acc + obj.price * 2;
      } else return acc + obj.price;
    }, 0);

    setTotalPrice(total);
  }, [ingredients]);

  return (
    <>
      {orderData && ingredients ? (
        <div className={`${styles["container"]} ml-10 mr-10 mb-10`}>
          <p className="text text_type_digits-default mt-15">
            #{orderData.number}
          </p>

          <p className="text text_type_main-medium mt-10 mb-3">
            {orderData.name}
          </p>
          <p
            className={`${
              orderData.status === "done" ? styles["text_success"] : null
            } text text_type_main-default mb-15`}
          >
            {orderData.status === "done"
              ? "Выполнен"
              : orderData.status === "pending"
              ? "Готовится"
              : "Создан"}
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
                  <div className={`${styles["ingredient-price"]}`}>
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
      ) : (
        <LoadingScreen text="Загружаются данные заказа" size="medium" />
      )}
    </>
  );
}
