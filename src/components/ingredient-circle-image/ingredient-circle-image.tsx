import React from "react";

import styles from "./ingredient-circle-image.module.css";

interface IIngredient {
  image: string;
  amount?: number;
}

export function IngredientCircleImage({ image, amount }: IIngredient) {
  return (
    <>
      {amount ? (
        <div className={styles["image-border"]}>
          <img className={styles["image"]} src={image} alt="ingredient" />
          <div className={styles["image-overlay"]} />
          <p className={`${styles["amount"]} text text_type_digits-small`}>
            +{amount}
          </p>
        </div>
      ) : (
        <div className={styles["image-border"]}>
          <img className={styles["image"]} src={image} alt="ingredient" />
        </div>
      )}
    </>
  );
}
