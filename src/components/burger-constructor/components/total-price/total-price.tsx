import { memo } from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./total-price.module.css";

interface TotalPriceType {
  price: number;
}

function TotalPrice({ price }: TotalPriceType) {
  return (
    <div className={`${styles["cart__total"]} mr-10`}>
      <p className="text text_type_digits-medium">{price}</p>
      <div className={`${styles["cart_price"]} ml-2`}>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export const TotalPriceMemoized = memo(TotalPrice);
