import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { IngredientCircleImage } from "../ingredient-circle-image/ingredient-circle-image";
import { TotalPrice } from "../total-price/total-price";
import { formatDisplayDate } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { addDataToModal } from "../../services/reducers/order-details";

import styles from "./order.module.css";

interface IOrder {
  number: number;
  date: Date;
  title: string;
  status: "created" | "pending" | "done";
  orderIngredients: string[];
}

interface IOrderedIngredient {
  type: string;
  _id: string;
  _uniqueId: string;
  image: string;
  price: number;
}

export function Order({
  number,
  date,
  title,
  status,
  orderIngredients,
}: IOrder) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation() as TLocationProps;

  const _ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const [ingredients, setIngredients] = useState<IOrderedIngredient[]>();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const allIngredients = orderIngredients.map((ingredient) => {
      const foundIngredient = _ingredients.find((item) => {
        return item._id === ingredient;
      });

      if (foundIngredient) {
        return {
          type: foundIngredient.type,
          _id: ingredient,
          image: foundIngredient.image_mobile,
          price: foundIngredient.price,
          _uniqueId: uuidv4(),
        };
      }
      return {
        type: "none",
        _id: "none",
        image: "none",
        price: -1,
        _uniqueId: uuidv4(),
      };
    });
    setIngredients(allIngredients);
  }, [_ingredients, orderIngredients]);

  useEffect(() => {
    if (ingredients === undefined) return;

    const total = ingredients.reduce((acc, obj) => {
      if (obj.type === "bun") {
        return acc + obj.price * 2;
      } else return acc + obj.price;
    }, 0);

    setTotalPrice(total);
  }, [ingredients]);

  const modalData = useCallback(() => {
    navigate(`${number}`, {
      state: { background: location, id: number },
    });
    dispatch(
      addDataToModal({
        createdAt: date.toString(),
        ingredients: orderIngredients,
        name: title,
        number: number,
        status: status,
        updatedAt: date.toString(),
        _id: "id",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location, navigate]);

  return (
    <div
      className={`${styles["order-container"]} mr-2 mb-4`}
      onClick={modalData}
    >
      <div className={`${styles["order-container_inner"]} mt-6 mb-6 ml-6 mr-6`}>
        <div className={`${styles["order-number-date"]} mb-6`}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {formatDisplayDate(date)}
          </p>
        </div>
        <div className="mb-2">
          <h1 className="text text_type_main-medium">{title}</h1>
        </div>
        <div className="mb-6">
          <h1
            className={`${
              status === "done" ? styles["success"] : null
            } text text_type_main-default`}
          >
            {status === "done"
              ? "Выполнен"
              : status === "pending"
              ? "Готовится"
              : "Создан"}
          </h1>
        </div>
        <div className={styles["ingredients-container"]}>
          <div className={styles["ingredients_parent"]}>
            {ingredients &&
              ingredients.slice(0, 6).map((ingredient, i) => {
                return (
                  <IngredientCircleImage
                    image={ingredient.image}
                    amount={i === 5 ? ingredients.length - 5 : undefined}
                    key={ingredient._uniqueId}
                  />
                );
              })}
          </div>
          <div className={`${styles["total-price"]} pl-6`}>
            <TotalPrice price={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
