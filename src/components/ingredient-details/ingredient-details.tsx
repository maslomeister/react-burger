import Modal from "../../components/modal/modal";

import ingredientDetailsStyles from "./ingredient-details.module.css";

interface IngredientDetailsProps {
  show: boolean;
  onClose: () => void;
  imageSrc: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
}

function IngredientDetails(props: IngredientDetailsProps) {
  return (
    <Modal
      onClose={props.onClose}
      show={props.show}
      title="Детали ингредиента"
      closeIconType="primary"
    >
      <div className={ingredientDetailsStyles["ingredient-details"]}>
        <img alt="previewImage" src={props.imageSrc} />
        <p
          className={`${ingredientDetailsStyles["ingredient-details__text"]} text text_type_main-medium mt-4`}
        >
          {props.name}
        </p>
        <div
          className={`${ingredientDetailsStyles["ingredient-details__nutrition"]} mb-15 mt-8`}
        >
          <div className={ingredientDetailsStyles["nutrition__item"]}>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_main-small text_color_inactive`}
            >
              Калории, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.calories}
            </p>
          </div>
          <div className={ingredientDetailsStyles["nutrition__item"]}>
            <p className="text text_type_main-small text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.proteins}
            </p>
          </div>
          <div className={ingredientDetailsStyles["nutrition__item"]}>
            <p className="text text_type_main-small text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.fat}
            </p>
          </div>
          <div className={ingredientDetailsStyles["nutrition__item"]}>
            <p className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default IngredientDetails;
