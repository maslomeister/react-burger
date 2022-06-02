import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./total-price.module.css";

interface TotalPriceType {
  price: number;
  size?: "default" | "medium" | "large";
  multiplied?: number;
}

export function TotalPrice({ price, size, multiplied }: TotalPriceType) {
  return (
    <div className={styles["cart__total"]}>
      <p
        className={`${styles["cart-price"]} text text_type_digits-${
          size ? size : "default"
        }`}
      >
        {multiplied ? `${multiplied} x ` : ""}
        {price}
      </p>
      <div
        className={`${styles[`cart__price_${size ? size : "default"}`]} ml-2`}
      >
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}
