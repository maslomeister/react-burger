import { memo } from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./total-price.module.css";

interface TotalPriceType {
  price: number;
  size: "default" | "medium" | "large";
}

function TotalPrice({ price, size }: TotalPriceType) {
  return (
    <div className={styles["cart__total"]}>
      <p className={`text text_type_digits-${size}`}>{price}</p>
      <div className={`${styles["cart_price"]} ml-2`}>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export const TotalPriceMemoized = memo(TotalPrice);
