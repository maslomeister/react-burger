import styles from "./ingredient-circle-image.module.css";

interface IIngredient {
  image: string;
  amount?: number;
}

export function IngredientCircleImage({ image, amount }: IIngredient) {
  let overlay = null;

  if (amount) {
    overlay = (
      <>
        <div className={styles["image-overlay"]} />
        <p className={`${styles["amount"]} text text_type_digits-small`}>
          +{amount}
        </p>
      </>
    );
  }

  return (
    <div className={styles["image-border"]}>
      <img className={styles["image"]} src={image} alt="ingredient" />
      {overlay}
    </div>
  );
}
