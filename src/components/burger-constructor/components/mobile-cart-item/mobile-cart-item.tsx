import React from "react";

import { TotalPrice } from "../../../total-price/total-price";
import styles from "./mobile-cart-item.module.css";

interface IProps {
  image: string;
  name: string;
  price: number;
}

export function MobileCartItem({ image, name, price }: IProps) {
  return (
    <div className={styles["mobile-cart-item-inner"]}>
      <img
        className={styles["mobile-cart-image"]}
        src={image}
        alt="ingredient preview"
      />
      <p
        className={`${styles["mobile-cart-name"]} text text_type_main-default`}
      >
        {name}
      </p>
      <TotalPrice price={price} />
    </div>
  );
}
