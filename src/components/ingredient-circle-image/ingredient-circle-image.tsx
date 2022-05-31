import styles from "./ingredient-circle-image.module.css";

interface IIngredient {
  position?: number;
  image: string;
  amount?: number;
}

export function IngredientCircleImage({
  position,
  image,
  amount,
}: IIngredient) {
  let overlay = null;

  if (!position) {
    position = 0;
  }

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
    <div
      className={`${styles["image-border"]} ${
        styles[`ingredients-${position}-elem`]
      }`}
    >
      <img className={styles["image"]} src={image} alt="ingredient" />
      {overlay}
    </div>
  );
}
