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
  if (!position) {
    position = 0;
  }

  return (
    <div
      className={`${styles["image-border"]} ${
        styles[`ingredients-${position}-elem`]
      }`}
    >
      <img className={styles["image"]} src={image} alt="ingredient" />
      {amount && (
        <>
          <div className={styles["image-overlay"]} />
          <p className={`${styles["amount"]} text text_type_digits-small`}>
            +{amount}
          </p>
        </>
      )}
    </div>
  );
}
