import React from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import totalPriceStyles from "./total-price.module.css";

interface TotalPriceType {
  price: number;
}

export default function TotalPrice({ price }: TotalPriceType) {
  return (
    <div className={`${totalPriceStyles["cart__total"]} mr-10`}>
      <p className="text text_type_digits-medium">{price}</p>
      <div className={`${totalPriceStyles["cart_price"]} ml-2`}>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}
