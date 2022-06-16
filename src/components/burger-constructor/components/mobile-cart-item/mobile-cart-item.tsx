import React, { forwardRef } from "react";

import { TotalPrice } from "../../../total-price/total-price";
import styles from "./mobile-cart-item.module.css";

interface IProps {
  image: string;
  name: string;
  price: number;
}

export const MobileCartItem = forwardRef<HTMLDivElement, IProps>(
  (props, ref) => (
    <div className={styles["mobile-cart-item-inner"] + " noselect"} ref={ref}>
      <img
        className={styles["mobile-cart-image"]}
        src={props.image}
        alt="ingredient preview"
      />
      <p
        className={`${styles["mobile-cart-name"]} text text_type_main-default`}
      >
        {props.name}
      </p>
      <TotalPrice price={props.price} />
    </div>
  )
);
